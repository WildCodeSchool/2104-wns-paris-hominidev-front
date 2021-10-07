import { browser } from 'webextension-polyfill-ts';

browser.devtools.panels.create(
    "Foobar",
    "/logo192.png",
    "/option.html"
  );

