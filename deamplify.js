var canonicalLink = document && document.head && Array.from(document.head.getElementsByTagName("link")).find(item => item.rel === "canonical");

if (canonicalLink) {
  var currentUrl = window.location.href;
  var canonicalUrl = canonicalLink.href;

  if (currentUrl !== canonicalUrl) {
    browser.runtime.sendMessage({
      currentUrl,
      canonicalUrl
    });
  }
}
