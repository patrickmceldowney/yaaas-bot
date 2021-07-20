import browser from 'webextension-polyfill';

browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    alert('Lana: “Four R’s, my friend: Reduce, Reuse, Recycle, Rihanna.”');
  }
});
