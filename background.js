chrome.tabs.onCreated.addListener(function (tab) {

    // Only redirect if this is a blank new tab (not opened by clicking a link).
    if (tab.url === 'chrome://newtab/' || tab.url === '') {
  
      // Show your website. This might highlight the omnibox,
      // but it's not guaranteed.
      chrome.tabs.update(tab.id, {url:'https://minhld99.github.io/custom-newtab'});
    }
});