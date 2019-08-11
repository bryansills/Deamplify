var canonicalLink = document && document.head && Array.from(document.head.getElementsByTagName("link")).find(item => item.rel === "canonical");

if (canonicalLink) {
  browser.runtime.sendMessage({
    currentUrl: window.location.href,
    canonicalUrl: canonicalLink.href
  });
}
