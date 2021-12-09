/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { ExportedDataState } from '@excalidraw/excalidraw/types/data/types';
import { ExcalidrawElement, NonDeletedExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState, UserIdleState } from '@excalidraw/excalidraw/types/types';
import { APP_STATE_STORAGE_CONF } from './drawConstants';

const byteToHex = (byte: number): string => `0${byte.toString(16)}`.slice(-2);

export type EncryptedData = {
  data: ArrayBuffer;
  iv: Uint8Array;
};

export const SOCKET_SERVER = 'http://localhost:4000';
export const ENCRYPTION_KEY_BITS = 128;
export const IV_LENGTH_BYTES = 12; // 96 bits

export const createIV = () => {
  const arr = new Uint8Array(IV_LENGTH_BYTES);
  return window.crypto.getRandomValues(arr);
};

export const generateEncryptionKey = async <T extends 'string' | 'cryptoKey' = 'string'>(
  returnAs?: T,
): Promise<T extends 'cryptoKey' ? CryptoKey : string> => {
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: ENCRYPTION_KEY_BITS,
    },
    true, // extractable
    ['encrypt', 'decrypt'],
  );
  return (returnAs === 'cryptoKey' ? key : (await window.crypto.subtle.exportKey('jwk', key)).k) as T extends 'cryptoKey' ? CryptoKey : string;
};

export const getCryptoKey = (key: string, usage: KeyUsage) =>
  window.crypto.subtle.importKey(
    'jwk',
    {
      alg: 'A128GCM',
      ext: true,
      k: key,
      key_ops: ['encrypt', 'decrypt'],
      kty: 'oct',
    },
    {
      name: 'AES-GCM',
      length: ENCRYPTION_KEY_BITS,
    },
    false, // extractable
    [usage],
  );

export const encryptData = async (
  key: string | CryptoKey,
  data: Uint8Array | ArrayBuffer | Blob | File | string,
): Promise<{ encryptedBuffer: ArrayBuffer; iv: Uint8Array }> => {
  const importedKey = typeof key === 'string' ? await getCryptoKey(key, 'encrypt') : key;
  const iv = createIV();
  const buffer: ArrayBuffer | Uint8Array =
    typeof data === 'string'
      ? new TextEncoder().encode(data)
      : data instanceof Uint8Array
      ? data
      : data instanceof Blob
      ? await data.arrayBuffer()
      : data;

  // We use symmetric encryption. AES-GCM is the recommended algorithm and
  // includes checks that the ciphertext has not been modified by an attacker.
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    importedKey,
    buffer as ArrayBuffer | Uint8Array,
  );

  return { encryptedBuffer, iv };
};

export type SocketUpdateData = SocketUpdateDataSource[keyof SocketUpdateDataSource] & {
  _brand: 'socketUpdateData';
};

export type SocketUpdateDataSource = {
  SCENE_INIT: {
    type: 'SCENE_INIT';
    payload: {
      elements: readonly ExcalidrawElement[];
    };
  };
  SCENE_UPDATE: {
    type: 'SCENE_UPDATE';
    payload: {
      elements: readonly ExcalidrawElement[];
    };
  };
  MOUSE_LOCATION: {
    type: 'MOUSE_LOCATION';
    payload: {
      socketId: string;
      pointer: { x: number; y: number };
      button: 'down' | 'up';
      selectedElementIds: AppState['selectedElementIds'];
      username: string;
    };
  };
  IDLE_STATUS: {
    type: 'IDLE_STATUS';
    payload: {
      socketId: string;
      userState: UserIdleState;
      username: string;
    };
  };
};

export const getCollaborationLinkData = (link: string) => {
  const { hash } = new URL(link);
  const match = hash.match(/^#room=([a-zA-Z0-9_-]+),([a-zA-Z0-9_-]+)$/);
  if (match && match[2].length !== 22) {
    console.log('Encryption key must be of 22 characters. Live collaboration is disabled');
    return null;
  }
  return match ? { roomId: match[1], roomKey: match[2] } : null;
};

const generateRandomID = async () => {
  const arr = new Uint8Array(10);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, byteToHex).join('');
};

export const generateCollaborationLinkData = async () => {
  const roomId = await generateRandomID();
  const roomKey = await generateEncryptionKey();

  if (!roomKey) {
    throw new Error("Couldn't generate room key");
  }

  return { roomId, roomKey };
};

export const getCollaborationLink = (data: { roomId: string; roomKey: string }) => {
  return `${window.location.origin}${window.location.pathname}#room=${data.roomId},${data.roomKey}`;
};

export type SocketUpdateDataIncoming =
  | SocketUpdateDataSource[keyof SocketUpdateDataSource]
  | {
      type: 'INVALID_RESPONSE';
    };

export const decryptData = async (iv: Uint8Array, encrypted: Uint8Array | ArrayBuffer, privateKey: string): Promise<ArrayBuffer> => {
  const key = await getCryptoKey(privateKey, 'decrypt');
  return window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    encrypted,
  );
};

const _clearAppStateForStorage = <ExportType extends 'export' | 'browser'>(appState: Partial<AppState>, exportType: ExportType) => {
  type ExportableKeys = {
    [K in keyof typeof APP_STATE_STORAGE_CONF]: typeof APP_STATE_STORAGE_CONF[K][ExportType] extends true ? K : never;
  }[keyof typeof APP_STATE_STORAGE_CONF];
  const stateForExport = {} as { [K in ExportableKeys]?: typeof appState[K] };
  for (const key of Object.keys(appState) as (keyof typeof appState)[]) {
    const propConfig = APP_STATE_STORAGE_CONF[key];
    if (propConfig?.[exportType]) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore see https://github.com/microsoft/TypeScript/issues/31445
      stateForExport[key] = appState[key];
    }
  }
  return stateForExport;
};

export const cleanAppStateForExport = (appState: Partial<AppState>) => {
  return _clearAppStateForStorage(appState, 'export');
};

export const isLinearElementType = (elementType: ExcalidrawElement['type']): boolean => {
  return (
    elementType === 'arrow' || elementType === 'line' // || elementType === "freedraw"
  );
};

export const getNonDeletedElements = (elements: readonly ExcalidrawElement[]) =>
  elements.filter((element) => !element.isDeleted) as readonly NonDeletedExcalidrawElement[];

const _clearElements = (elements: readonly ExcalidrawElement[]): ExcalidrawElement[] =>
  getNonDeletedElements(elements).map((element) => (isLinearElementType(element.type) ? { ...element, lastCommittedPoint: null } : element));

export const clearElementsForExport = (elements: readonly ExcalidrawElement[]) => _clearElements(elements);

export const serializeAsJSON = (elements: readonly ExcalidrawElement[], appState: Partial<AppState>): string => {
  const data: ExportedDataState = {
    type: 'excalidraw',
    version: 2,
    source: window.location.origin,
    elements: clearElementsForExport(elements),
    appState: cleanAppStateForExport(appState),
  };

  return JSON.stringify(data, null, 2);
};

export const clearElementsForLocalStorage = (elements: readonly ExcalidrawElement[]) => _clearElements(elements);
