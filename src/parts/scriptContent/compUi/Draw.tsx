/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState, useRef, useContext, useCallback, useEffect } from 'react';
// import { browser } from 'webextension-polyfill-ts';
import { ResolvablePromise } from '@excalidraw/excalidraw/types/utils';
import { ImportedDataState } from '@excalidraw/excalidraw/types/data/types';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import Excalidraw from '@excalidraw/excalidraw';
import { AppState, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { useCallbackRefState } from '../compFct/drawHooks';
import CollabWrapper, { CollabAPI, CollabContext, CollabContextConsumer } from '../compFct/drawCollabWrapper';
import { getCollaborationLinkData, generateCollaborationLinkData, generateEncryptionKey } from '../compFct/drawData';
// import initialData from './initialData';

const initializeScene = async (opts: { collabAPI: CollabAPI }): Promise<ImportedDataState | null> => {
  const roomLinkData = getCollaborationLinkData(window.location.href);
  if (roomLinkData) {
    return opts.collabAPI.initializeSocketClient(roomLinkData);
  }
  return null;
};

const Draw: FC = () => {
  const [viewModeEnabled, setViewModeEnabled] = useState(false);
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  const [gridModeEnabled, setGridModeEnabled] = useState(false);
  const [user, setUser] = useState({ displayName: 'Yann' });

  const [excalidrawAPI, excalidrawRefCallback] = useCallbackRefState<ExcalidrawImperativeAPI>();
  const collabAPI = useContext(CollabContext)?.api;
  const initialStatePromiseRef = useRef<{ promise: ResolvablePromise<ImportedDataState | null> }>({ promise: null! });

  useEffect(() => {
    if (!collabAPI || !excalidrawAPI) {
      return;
    }

    initializeScene({ collabAPI }).then((scene) => {
      initialStatePromiseRef.current.promise.resolve(scene);
    });
  }, [collabAPI, excalidrawAPI]);

  const onChange = (elements: readonly ExcalidrawElement[], appState: AppState) => {
    if (collabAPI?.isCollaborating) {
      collabAPI.broadcastElements(elements);
    }
  };

  const renderTopRightUI = useCallback(() => {
    return (
      <>
        <label>
          <input type="checkbox" checked={viewModeEnabled} onChange={() => setViewModeEnabled(!viewModeEnabled)} />
          View mode
        </label>
        <label>
          <input type="checkbox" checked={zenModeEnabled} onChange={() => setZenModeEnabled(!zenModeEnabled)} />
          Zen mode
        </label>
        <label>
          <input type="checkbox" checked={gridModeEnabled} onChange={() => setGridModeEnabled(!gridModeEnabled)} />
          Grid mode
        </label>
      </>
    );
  }, [viewModeEnabled, zenModeEnabled, gridModeEnabled]);

  const initiateCollab = async () => {
    // let roomLinkData = getCollaborationLinkData(window.location.href);
    const roomId = 'cd05ad852e5a91e94280';
    const roomKey = 'wEGdgXmrgfu1o11i5s_ZXw';
    let roomLinkData = { roomId, roomKey };
    if (!roomLinkData) {
      roomLinkData = await generateCollaborationLinkData();
      console.log('new room credential', roomLinkData);
    }
    collabAPI?.initializeSocketClient(roomLinkData);
  };

  return (
    <div className="excalidraw-wrapper">
      {excalidrawAPI && <CollabWrapper excalidrawAPI={excalidrawAPI} user={user} />}
      {Excalidraw && (
        <Excalidraw
          ref={excalidrawRefCallback}
          isCollaborating={collabAPI?.isCollaborating()}
          initialData={initialStatePromiseRef.current.promise}
          onChange={onChange}
          onPointerUpdate={collabAPI?.onPointerUpdate}
          onCollabButtonClick={async () => initiateCollab()}
          viewModeEnabled={viewModeEnabled}
          zenModeEnabled={zenModeEnabled}
          gridModeEnabled={gridModeEnabled}
          renderFooter={renderTopRightUI}
          /* renderTopRightUI */
          UIOptions={{
            canvasActions: {
              changeViewBackgroundColor: false,
              clearCanvas: true,
              export: false,
              loadScene: true,
              saveToActiveFile: true,
              theme: true,
              saveAsImage: true,
            },
          }}
        />
      )}
    </div>
  );
};

export default Draw;
