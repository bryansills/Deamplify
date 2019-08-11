var getActiveTab = function() {
  return browser.tabs
    .query({active: true, currentWindow: true})
    .then((tabs) => tabs[0]);
}

// if there is a canonical URL mapping, show the page action
// otherwise hide it
function setPageActionState(tab) {
  var canonicalUrl = canonicalUrlMapping[tab.url]

  if (!!canonicalUrl) {
    browser.pageAction.show(tab.id);
  } else {
    browser.pageAction.hide(tab.id);
  }
}

var canonicalUrlMapping = {}
browser.runtime.onMessage.addListener(function(message) {
  canonicalUrlMapping[message.currentUrl] = message.canonicalUrl;
});

// Set page action state for the currently active tab, whenever the user navigates.
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!changeInfo.url) {
    return;
  }

  getActiveTab().then((tab) => {
    if (tabId == tab.id) {
      setPageActionState(tab);
    }
  });
});

// Set page action state for the currently active tab, whenever a new tab becomes active.
browser.tabs.onActivated.addListener((activeInfo) => {
  getActiveTab().then(tab => {
    if (activeInfo.tabId === tab.id) {
      setPageActionState(tab);
    }
  });
});

// Navigate when the page action is clicked
browser.pageAction.onClicked.addListener(() => {
  getActiveTab().then((tab) => {
    var canonicalUrl = canonicalUrlMapping[tab.url];
    canonicalUrl && browser.tabs.update({url: canonicalUrl});
  })
});
