/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line import/order
import ReactDOM from 'react-dom';
import { browser } from 'webextension-polyfill-ts';
import { Provider } from 'react-redux';
import { createUIStore } from 'redux-webext';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Overlay from './compUi/Overlay';

/* ---------------- EXPERIMENT  */
const port = browser.runtime.connect(browser.runtime.id);

port.postMessage({ greeting: 'hello from content script' });
// eslint-disable-next-line func-names
port.onMessage.addListener(function (message: { greeting: string }) {
  console.log(message.greeting);
});
/* -------------END EXPERIMENT  */

library.add(fas);

const mountNode = document.createElement('pygma');

const afterBodyReady = () => {
  document.body.append(mountNode);
};

const pygma = document.querySelector('pygma');
if (pygma) {
  pygma.remove();
}

if (document.body) {
  afterBodyReady();
} else {
  const bodyObserver = new MutationObserver((recordList, observer) => {
    // Wait` document.body `Get the definition.
    if (!document.body) return;

    afterBodyReady();
    observer.disconnect();
  });
  bodyObserver.observe(document.documentElement, { childList: true });
}

async function initOverlay() {
  const store = await createUIStore();
  ReactDOM.render(
    <Provider store={store}>
      <Overlay />
    </Provider>,
    mountNode,
  );
}

initOverlay();
