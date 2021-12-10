import { browser } from 'webextension-polyfill-ts';

const scriptList = ['/static/js/overlay.js'];
const injectScriptsTo = (tabId) => {
  scriptList.forEach((script) => {
    browser.tabs.executeScript(tabId, {
      file: script,
      runAt: 'document_start',
      // If the script injection fails (without the tab permission and so on) and is not checked in the callback` runtime.lastError `，
      // It's a mistake. There is no other complicated logic in this example. You don't need to record the tab of successful injection. You can fool it like this.
    });
  });
};

// Masking receiving end does not exist error.
browser.runtime.onConnect.addListener(() => {});

const onError = (error) => {
  // eslint-disable-next-line no-console
  console.log(`Error: ${error}`);
};

// Gets all open tabs.
const querying = browser.tabs.query({});
querying.then((tabList) => {
  tabList.forEach((tab) => {
    console.log('tab', tab.title);
    injectScriptsTo(tab.id);
  });
}, onError);

browser.webNavigation.onCommitted.addListener(({ tabId, frameId }) => {
  // Filter out non main window events.
  if (frameId !== 0) return;
  injectScriptsTo(tabId);
});

/* 
const filesInDirectory = dir => new Promise (resolve =>
    dir.createReader ().readEntries (entries =>
        Promise.all (entries.filter (e => e.name[0] !== '.').map (e =>
            e.isDirectory
                ? filesInDirectory (e)
                // eslint-disable-next-line @typescript-eslint/no-shadow
                : new Promise (resolve => e.file (resolve))
        ))
        .then (files => [].concat (...files))
        .then (resolve)
    )
);

const timestampForFilesInDirectory = dir =>
filesInDirectory (dir).then (files =>
    files.map (f => f.name + f.lastModifiedDate).join ());
    
    const watchChanges = (dir, lastTimestamp) => {
        timestampForFilesInDirectory (dir).then (timestamp => {
            if (!lastTimestamp || (lastTimestamp === timestamp)) {
                setTimeout (() => watchChanges (dir, timestamp), 1000); // retry after 1s
            } else {
                browser.runtime.reload();
            }
        });
    };

    const onReloaded = (tabs) => {
        if (tabs[0].TAB_ID_NONE) {
          browser.tabs.reload(tabs[0]);
        }
    };
     
    const onError = (error) => {
        // eslint-disable-next-line no-console
        console.log(`Error: ${error}`);
    };
    
    const gotSelf = (info) => {
        if (info.installType === 'development') {
            browser.runtime.getPackageDirectoryEntry (dir => watchChanges (dir));
            const querying = browser.tabs.query({active: true, lastFocusedWindow: true });
            querying.then(onReloaded, onError);
        }
      };
      
    const gettingSelf = browser.management.getSelf();
    gettingSelf.then(gotSelf);
 */
