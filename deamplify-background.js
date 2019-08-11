var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
// gettingActiveTab.then((tabs) => {
//   restartAlarm(tabs[0].id);
// });

var canonicalUrls = {}
function onNewCanonicalUrl(message) {
  console.log({message});
};
browser.runtime.onMessage.addListener(onNewCanonicalUrl)

// /*
// Restart alarm for the currently active tab, whenever the user navigates.
// */
// browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (!changeInfo.url) {
//     return;
//   }
//   var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
//   console.log({"t": "onUpdated",tabId, changeInfo, tab});
//   gettingActiveTab.then((tabs) => {
//     if (tabId == tabs[0].id) {
//       restartAlarm(tabId);
//       setDeamplifyState(tabId);
//     }
//   });
// });

// /*
// Restart alarm for the currently active tab, whenever a new tab becomes active.
// */
// browser.tabs.onActivated.addListener((activeInfo) => {
//   restartAlarm(activeInfo.tabId);
//   setDeamplifyState(activeInfo.tabId);
//   console.log({"t": "onActivated", activeInfo});
// });

// /*
// restartAlarm: clear all alarms,
// then set a new alarm for the given tab.
// */
// function restartAlarm(tabId) {
//   browser.pageAction.hide(tabId);
//   browser.alarms.clearAll();
//   var gettingTab = browser.tabs.get(tabId);
//   gettingTab.then((tab) => {
//     if (tab.url != CATGIFS) {
//       browser.alarms.create("", {delayInMinutes: DELAY});
//     }
//   });
// }

// /*
// On alarm, show the page action.
// */
// browser.alarms.onAlarm.addListener((alarm) => {
//   var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
//   gettingActiveTab.then((tabs) => {
//     browser.pageAction.show(tabs[0].id);
//   });
// });

browser.pageAction.onClicked.addListener(() => {
  gettingActiveTab.then((tab) => {
    var canonicalUrl = canonicalUrls[tab.url];
    canonicalUrl && browser.tabs.update({url: canonicalUrl});
  })
});
