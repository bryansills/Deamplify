function setDeamplifyState() {
  console.log("inside method");
  var canonicalLink = document && document.head && Array.from(document.head.getElementsByTagName("link")).find(item => item.rel === "canonical");
  console.log({canonicalLink});

  if (canonicalLink) {
    browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
      browser.pageAction.show(tabs[0].id);
    })

    browser.pageAction.onClicked.addListener(() => {
      browser.tabs.update({url: canonicalLink.rel});
    });
  }
};

setDeamplifyState();
