import { io, Socket } from 'socket.io-client';

import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import CollabWrapper from './drawCollabWrapper';
import { encryptData, SocketUpdateData, SocketUpdateDataSource } from './drawData';
import { BROADCAST, SCENE } from './drawConstants';
import { UserIdleState } from './drawTypes';
import { browser, Runtime } from 'webextension-polyfill-ts';

class Portal {
  collab: CollabWrapper;

  socket: Runtime.Port | null = null;

  socketInitialized = false; // we don't want the socket to emit any updates until it is fully initialized

  roomId: string | null = null;

  roomKey: string | null = null;

  broadcastedElementVersions: Map<string, number> = new Map();

  constructor(collab: CollabWrapper) {
    this.collab = collab;
  }

  open(socket: string, id: string, key: string): void {
    this.socket = browser.runtime.connect();
    this.roomId = id;
    this.roomKey = key;

    // Initialize socket listeners   
    this.socket.onMessage.addListener( (message: { type: string, tab: string, url: string, group: string, data: {type:string, url:string, payload:{}} }) => {
      console.log('test',message)
      switch(message.type) {
        case 'init-room':
          this.socket!.postMessage({type:'join-room', tab:'', url:'', group:'', data:['join-room', this.roomId]});
          break;

        case 'new-user':
          this.broadcastScene(SCENE.INIT, this.collab.getSyncableElements(this.collab.getSceneElementsIncludingDeleted()), /* syncAll */ true);
          break;

     /*    case 'room-user-change':
          const Clients: string[] = message.data.clients;
          this.collab.setCollaborators(Clients);
          break; */
      }
    });
  }

  close(): void {
    if (!this.socket) {
      return;
    }
    this.socket = null;
    this.roomId = null;
    this.roomKey = null;
    this.socketInitialized = false;
    this.broadcastedElementVersions = new Map();
  }

  isOpen(): boolean {
    return !!(this.socketInitialized && this.socket && this.roomId && this.roomKey);
  }

  // eslint-disable-next-line no-underscore-dangle
  async _broadcastSocketData(data: SocketUpdateData, volatile = false): Promise<void> {
    if (this.isOpen()) {
      const json = JSON.stringify(data);
      const encoded = new TextEncoder().encode(json);
      let { encryptedBuffer, iv } = await encryptData(this.roomKey!, encoded);

            //this.socket?.emit(volatile ? BROADCAST.SERVER_VOLATILE : BROADCAST.SERVER, this.roomId, encryptedBuffer, iv);

      this.socket?.postMessage({
        type:'DRAW',
        id: this.roomId,
        data: [
          volatile ? BROADCAST.SERVER_VOLATILE : BROADCAST.SERVER,
          this.roomId, 
          json, 
         /*  encryptedBuffer, 
          iv */
        ]
      });
    }
  }

  broadcastScene = async (sceneType: SCENE.INIT | SCENE.UPDATE, syncableElements: ExcalidrawElement[], syncAll: boolean): Promise<void> => {
    if (sceneType === SCENE.INIT && !syncAll) {
      throw new Error('syncAll must be true when sending SCENE.INIT');
    }

    let SyncableElements = syncableElements;

    if (!syncAll) {
      // sync out only the elements we think we need to to save bandwidth.
      // periodically we'll resync the whole thing to make sure no one diverges
      // due to a dropped message (server goes down etc).
      SyncableElements = syncableElements.filter(
        (syncableElement) =>
          !this.broadcastedElementVersions.has(syncableElement.id) ||
          syncableElement.version > this.broadcastedElementVersions.get(syncableElement.id)!,
      );
    }

    const data: SocketUpdateDataSource[typeof sceneType] = {
      type: sceneType,
      payload: {
        elements: SyncableElements,
      },
    };

    // eslint-disable-next-line no-restricted-syntax
    for (const syncableElement of SyncableElements) {
      this.broadcastedElementVersions.set(syncableElement.id, syncableElement.version);
    }

    // eslint-disable-next-line no-underscore-dangle
    const broadcastPromise = this._broadcastSocketData(data as SocketUpdateData);

    if (!(syncAll && this.collab.isCollaborating)) {
      await broadcastPromise;
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  broadcastIdleChange = (userState: UserIdleState): unknown | null => {
    if (this.socket?.id) {
      const data: SocketUpdateDataSource['IDLE_STATUS'] = {
        type: 'IDLE_STATUS',
        payload: {
          socketId: this.socket.id,
          userState,
          username: this.collab.props.user.displayName || '',
        },
      };
      // eslint-disable-next-line no-underscore-dangle
      return this._broadcastSocketData(
        data as SocketUpdateData,
        true, // volatile
      );
    }
    return null;
  };

  broadcastMouseLocation = (payload: {
    pointer: SocketUpdateDataSource['MOUSE_LOCATION']['payload']['pointer'];
    button: SocketUpdateDataSource['MOUSE_LOCATION']['payload']['button'];
  }): unknown | null => {
    if (this.socket?.id) {
      const data: SocketUpdateDataSource['MOUSE_LOCATION'] = {
        type: 'MOUSE_LOCATION',
        payload: {
          socketId: this.socket.id,
          pointer: payload.pointer,
          button: payload.button || 'up',
          selectedElementIds: this.collab.excalidrawAPI.getAppState().selectedElementIds,
          username: this.collab.props.user.displayName || '',
        },
      };
      // eslint-disable-next-line no-underscore-dangle
      return this._broadcastSocketData(
        data as SocketUpdateData,
        true, // volatile
      );
    }
    return null;
  };
}

export default Portal;
