import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createUIStore } from "redux-webext";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Overlay from "./overlay/Overlay";

const mountNode = document.createElement("pygma");

const afterBodyReady = () => {
  document.body.append(mountNode);
};

if (document.querySelector("pygma")) {
  document.querySelector("pygma").remove();
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
