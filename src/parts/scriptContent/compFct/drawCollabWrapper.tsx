/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/no-unused-state */
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { PureComponent } from 'react';
import throttle from 'lodash.throttle';

import { Collaborator, ExcalidrawImperativeAPI, Gesture } from '@excalidraw/excalidraw/types/types';
import { getElementMap, getSceneVersion, isInvisiblySmallElement } from '@excalidraw/excalidraw';
import { ImportedDataState } from '@excalidraw/excalidraw/types/data/types';
import { createInverseContext } from './drawCreateInverseContext';
import Portal from './drawPortal';
import { ACTIVE_THRESHOLD, EVENT, IDLE_THRESHOLD, APP_NAME, INITIAL_SCENE_UPDATE_TIMEOUT, SCENE, SYNC_FULL_SCENE_INTERVAL_MS } from './drawConstants';
import { decryptData, generateCollaborationLinkData, getCollaborationLink, SocketUpdateDataSource, SOCKET_SERVER } from './drawData';

import { resolvablePromise } from './drawUtils';
import { UserIdleState } from './drawTypes';
import { browser } from 'webextension-polyfill-ts';

interface CollabState {
  errorMessage: string;
  userState: UserIdleState;
}

type CollabInstance = InstanceType<typeof CollabWrapper>;

export interface CollabAPI {
  isCollaborating: () => boolean;
  initializeSocketClient: CollabInstance['initializeSocketClient'];
  broadcastElements: CollabInstance['broadcastElements'];
  onPointerUpdate: CollabInstance['onPointerUpdate'];
}

type ReconciledElements = readonly ExcalidrawElement[] & {
  _brand: 'reconciledElements';
};

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

interface Props {
  excalidrawAPI: ExcalidrawImperativeAPI;
  user: {
    displayName?: string;
  };
}

const {
  Context: CollabContext,
  Consumer: CollabContextConsumer,
  Provider: CollabContextProvider,
} = createInverseContext<{ api: CollabAPI | null }>({ api: null });

export { CollabContext, CollabContextConsumer };

class CollabWrapper extends PureComponent<Props, CollabState> {
  portal: Portal;

  excalidrawAPI: Props['excalidrawAPI'];

  isCollaborating = false;

  activeIntervalId: number | null;

  idleTimeoutId: number | null;

  private socketInitializationTimer?: number;

  private lastBroadcastedOrReceivedSceneVersion = -1;

  private collaborators = new Map<string, Collaborator>();

  private contextValue: CollabAPI | null = null;

  queueBroadcastAllElements = throttle(() => {
    this.portal.broadcastScene(SCENE.UPDATE, this.getSyncableElements(this.excalidrawAPI.getSceneElementsIncludingDeleted()), true);
    const currentVersion = this.getLastBroadcastedOrReceivedSceneVersion();
    const newVersion = Math.max(currentVersion, getSceneVersion(this.getSceneElementsIncludingDeleted()));
    this.setLastBroadcastedOrReceivedSceneVersion(newVersion);
  }, SYNC_FULL_SCENE_INTERVAL_MS);

  constructor(props: Props) {
    super(props);
    this.state = {
      errorMessage: '',
      userState: UserIdleState.ACTIVE,
    };

    this.portal = new Portal(this);
    this.excalidrawAPI = props.excalidrawAPI;
    this.activeIntervalId = null;
    this.idleTimeoutId = null;
  }

  componentDidMount() {
    window.addEventListener(EVENT.UNLOAD, this.onUnload);
  }

  componentWillUnmount() {
    window.removeEventListener(EVENT.UNLOAD, this.onUnload);
  }

  private handleRemoteSceneUpdate = (elements: ReconciledElements, { init = false }: { init?: boolean } = {}) => {
    this.excalidrawAPI.updateScene({
      elements,
      commitToHistory: !!init,
    });

    // We haven't yet implemented multiplayer undo functionality, so we clear the undo stack
    // when we receive any messages from another peer. This UX can be pretty rough -- if you
    // undo, a user makes a change, and then try to redo, your element(s) will be lost. However,
    // right now we think this is the right tradeoff.
    this.excalidrawAPI.history.clear();
  };

  private onVisibilityChange = () => {
    if (document.hidden) {
      if (this.idleTimeoutId) {
        window.clearTimeout(this.idleTimeoutId);
        this.idleTimeoutId = null;
      }
      if (this.activeIntervalId) {
        window.clearInterval(this.activeIntervalId);
        this.activeIntervalId = null;
      }
      this.onIdleStateChange(UserIdleState.AWAY);
    } else {
      this.idleTimeoutId = window.setTimeout(this.reportIdle, IDLE_THRESHOLD);
      this.activeIntervalId = window.setInterval(this.reportActive, ACTIVE_THRESHOLD);
      this.onIdleStateChange(UserIdleState.ACTIVE);
    }
  };

  private onPointerMove = () => {
    if (this.idleTimeoutId) {
      window.clearTimeout(this.idleTimeoutId);
      this.idleTimeoutId = null;
    }
    this.idleTimeoutId = window.setTimeout(this.reportIdle, IDLE_THRESHOLD);
    if (!this.activeIntervalId) {
      this.activeIntervalId = window.setInterval(this.reportActive, ACTIVE_THRESHOLD);
    }
  };

  onIdleStateChange = (userState: UserIdleState) => {
    this.setState({ userState });
    this.portal.broadcastIdleChange(userState);
  };

  getSyncableElements = (elements: readonly ExcalidrawElement[]) => elements.filter((el) => el.isDeleted || !isInvisiblySmallElement(el));

  public setLastBroadcastedOrReceivedSceneVersion = (version: number) => {
    this.lastBroadcastedOrReceivedSceneVersion = version;
  };

  public getLastBroadcastedOrReceivedSceneVersion = () => {
    return this.lastBroadcastedOrReceivedSceneVersion;
  };

  public getSceneElementsIncludingDeleted = () => {
    return this.excalidrawAPI.getSceneElementsIncludingDeleted();
  };

  onPointerUpdate = (payload: {
    pointer: SocketUpdateDataSource['MOUSE_LOCATION']['payload']['pointer'];
    button: SocketUpdateDataSource['MOUSE_LOCATION']['payload']['button'];
    pointersMap: Gesture['pointers'];
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    payload.pointersMap.size < 2 && this.portal.socket && this.portal.broadcastMouseLocation(payload);
  };

  setCollaborators(sockets: string[]) {
    this.setState((state) => {
      const collaborators: InstanceType<typeof CollabWrapper>['collaborators'] = new Map();
      for (const socketId of sockets) {
        if (this.collaborators.has(socketId)) {
          collaborators.set(socketId, this.collaborators.get(socketId)!);
        } else {
          collaborators.set(socketId, {});
        }
      }
      this.collaborators = collaborators;
      this.excalidrawAPI.updateScene({ collaborators });
    });
  }

  private initializeSocketClient = async (existingRoomLinkData: null | { roomId: string; roomKey: string }): Promise<ImportedDataState | null> => {
/*     if (this.portal.socket) {
      console.log('coucou', this.portal.socket);
      return null;
    } */
    let roomId;
    let roomKey;

    if (existingRoomLinkData) {
      ({ roomId, roomKey } = existingRoomLinkData);
    } else {
      ({ roomId, roomKey } = await generateCollaborationLinkData());
      window.history.pushState({}, APP_NAME, getCollaborationLink({ roomId, roomKey }));
    }
    const scenePromise = resolvablePromise<ImportedDataState | null>();

    this.isCollaborating = true;
    this.portal.open(browser.runtime.id, roomId, roomKey);
    if (existingRoomLinkData) {
      this.excalidrawAPI.resetScene();
    } else {
      const elements = this.excalidrawAPI.getSceneElements();
      // remove deleted elements from elements array & history to ensure we don't
      // expose potentially sensitive user data in case user manually deletes
      // existing elements (or clears scene), which would otherwise be persisted
      // to database even if deleted before creating the room.
      this.excalidrawAPI.history.clear();
      this.excalidrawAPI.updateScene({
        elements,
        commitToHistory: true,
      });
    }

    // fallback in case you're not alone in the room but still don't receive
    // initial SCENE_UPDATE message
    this.socketInitializationTimer = window.setTimeout(() => {
      this.initializeSocket();
      scenePromise.resolve(null);
    }, INITIAL_SCENE_UPDATE_TIMEOUT);
    
    // All socket listeners are moving to Portal
    this.portal.socket!.onMessage.addListener( (message: {
      type: string,
      payload: {
        type:string,
        url:string,
        payload:{}
      } }) => {
        console.log('test', message)
        if (message.type === 'client-broadcast') {
          async (encryptedData: ArrayBuffer, iv: Uint8Array) => {
            if (!this.portal.roomKey) {
              return;
            }
            const decryptedData = await this.decryptPayload(iv, encryptedData, this.portal.roomKey);
            console.log('encryptedData', encryptedData);
            // eslint-disable-next-line default-case
            switch (decryptedData.type) {
              case 'INVALID_RESPONSE':
                return;
              case SCENE.INIT: {
                if (!this.portal.socketInitialized) {
                  this.initializeSocket();
                  const remoteElements = decryptedData.payload.elements;
                  const reconciledElements = this.reconcileElements(remoteElements);
                  this.handleRemoteSceneUpdate(reconciledElements, {
                    init: true,
                  });
                  // noop if already resolved via init from firebase
                  scenePromise.resolve({
                    elements: reconciledElements,
                    scrollToContent: true,
                  });
                }
                break;
              }
              case SCENE.UPDATE:
                this.handleRemoteSceneUpdate(this.reconcileElements(decryptedData.payload.elements));
                break;
              case 'MOUSE_LOCATION': {
                const { pointer, button, username, selectedElementIds } = decryptedData.payload;
                const socketId: SocketUpdateDataSource['MOUSE_LOCATION']['payload']['socketId'] =
                  decryptedData.payload.socketId ||
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore legacy, see #2094 (#2097)
                  decryptedData.payload.socketID;
      
                const collaborators = new Map(this.collaborators);
                const user = collaborators.get(socketId) || {}!;
                user.pointer = pointer;
                user.button = button;
                user.selectedElementIds = selectedElementIds;
                user.username = username;
                collaborators.set(socketId, user);
                this.excalidrawAPI.updateScene({
                  collaborators,
                });
                break;
              }
              case 'IDLE_STATUS': {
                const { userState, socketId, username } = decryptedData.payload;
                const collaborators = new Map(this.collaborators);
                const user = collaborators.get(socketId) || {}!;
                user.userState = userState;
                user.username = username;
                this.excalidrawAPI.updateScene({
                  collaborators,
                });
                break;
              }
            }
          }
        }
      });
 

    this.portal.socket!.onMessage.addListener( (message: {
      type: string,
      payload: {
        type:string,
        url:string,
        payload:{}
      } }) => {
        if (message.type === 'first-in-room') {
          this.initializeSocket();
        scenePromise.resolve(null);
        }
      });

    this.initializeIdleDetector();


    return scenePromise;
  };

  private decryptPayload = async (iv: Uint8Array, encryptedData: ArrayBuffer, decryptionKey: string) => {
    try {
      const decrypted = await decryptData(iv, encryptedData, decryptionKey);

      const decodedData = new TextDecoder('utf-8').decode(new Uint8Array(decrypted));
      return JSON.parse(decodedData);
    } catch (error) {
      console.error('decrypt Failed\n', error);
      return {
        type: 'INVALID_RESPONSE',
      };
    }
  };

  getContextValue = (): CollabAPI => {
    if (!this.contextValue) {
      this.contextValue = {} as CollabAPI;
    }

    this.contextValue.isCollaborating = () => this.isCollaborating;
    this.contextValue.onPointerUpdate = this.onPointerUpdate;
    this.contextValue.initializeSocketClient = this.initializeSocketClient;
    this.contextValue.broadcastElements = this.broadcastElements;

    return this.contextValue;
  };

  private onUnload = () => {
    this.destroySocketClient({ isUnload: true });
  };

  broadcastElements = (elements: readonly ExcalidrawElement[]) => {
    if (getSceneVersion(elements) > this.getLastBroadcastedOrReceivedSceneVersion()) {
      this.portal.broadcastScene(SCENE.UPDATE, this.getSyncableElements(elements), false);
      this.lastBroadcastedOrReceivedSceneVersion = getSceneVersion(elements);
      this.queueBroadcastAllElements();
    }
  };

  private destroySocketClient = (opts?: { isUnload: boolean }) => {
    if (!opts?.isUnload) {
      this.collaborators = new Map();
      this.excalidrawAPI.updateScene({
        collaborators: this.collaborators,
      });

      // window.webexInstance.clearShareUrl();
      this.isCollaborating = false;
    }
    this.portal.close();
  };

  private initializeSocket = () => {
    this.portal.socketInitialized = true;
    clearTimeout(this.socketInitializationTimer!);
  };

  private initializeIdleDetector = () => {
    document.addEventListener(EVENT.POINTER_MOVE, this.onPointerMove);
    document.addEventListener(EVENT.VISIBILITY_CHANGE, this.onVisibilityChange);
  };

  private reportIdle = () => {
    this.onIdleStateChange(UserIdleState.IDLE);
    if (this.activeIntervalId) {
      window.clearInterval(this.activeIntervalId);
      this.activeIntervalId = null;
    }
  };

  private reportActive = () => {
    this.onIdleStateChange(UserIdleState.ACTIVE);
  };

  private reconcileElements = (elements: readonly ExcalidrawElement[]): ReconciledElements => {
    const currentElements = this.getSceneElementsIncludingDeleted();
    // create a map of ids so we don't have to iterate
    // over the array more than once.
    const localElementMap = getElementMap(currentElements);

    const appState = this.excalidrawAPI.getAppState();

    // Reconcile
    const newElements: readonly ExcalidrawElement[] = elements
      .reduce((elements, element) => {
        // if the remote element references one that's currently
        // edited on local, skip it (it'll be added in the next step)
        if (
          element.id === appState.editingElement?.id ||
          element.id === appState.resizingElement?.id ||
          element.id === appState.draggingElement?.id
        ) {
          return elements;
        }

        if (localElementMap.hasOwnProperty(element.id) && localElementMap[element.id].version > element.version) {
          elements.push(localElementMap[element.id]);
          delete localElementMap[element.id];
        } else if (
          localElementMap.hasOwnProperty(element.id) &&
          localElementMap[element.id].version === element.version &&
          localElementMap[element.id].versionNonce !== element.versionNonce
        ) {
          // resolve conflicting edits deterministically by taking the one with the lowest versionNonce
          if (localElementMap[element.id].versionNonce < element.versionNonce) {
            elements.push(localElementMap[element.id]);
          } else {
            // it should be highly unlikely that the two versionNonces are the same. if we are
            // really worried about this, we can replace the versionNonce with the socket id.
            elements.push(element);
          }
          delete localElementMap[element.id];
        } else {
          elements.push(element);
          delete localElementMap[element.id];
        }

        return elements;
      }, [] as Mutable<typeof elements>)
      // add local elements that weren't deleted or on remote
      .concat(...Object.values(localElementMap));

    // Avoid broadcasting to the rest of the collaborators the scene
    // we just received!
    // Note: this needs to be set before updating the scene as it
    // synchronously calls render.
    this.setLastBroadcastedOrReceivedSceneVersion(getSceneVersion(newElements));

    return newElements as ReconciledElements;
  };

  closePortal = () => {
    window.history.pushState({}, APP_NAME, window.location.origin);
    this.destroySocketClient();
  };

  render() {
    return (
      <>
        <CollabContextProvider
          value={{
            api: this.getContextValue(),
          }}
        />
      </>
    );
  }
}

export default CollabWrapper;
