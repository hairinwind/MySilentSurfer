function injectHelloWorld() {
  console.log('Hello World');
}

// Run the injection function when the content script loads
injectHelloWorld();

function removeAds() {
  // List of common ad-related class names and IDs
  const adSelectors = [
    '[class*="ad-"]',
    '[class*="ads-"]',
    '[class*="advert"]',
    '[id*="ad-"]',
    '[id*="ads-"]',
    '[id*="advert"]',
    '.ad',
    '.ads',
    '.adsbygoogle',
    '#ad',
    '#ads',
    'ins.adsbygoogle',
    'iframe[src*="ads"]',
    'iframe[id*="ads"]',
    'iframe[class*="ads"]',
    'div[aria-label*="advertisement"]',
    '.google_ads',
    '[data-aaad="true"]',
    '[id*="google_ads_iframe"]',
    '[id*="google_ads"]',
    'div[data-aa-adunit]',
    'div[class*="advertisement"]'
  ];

  // Combine all selectors
  const combinedSelector = adSelectors.join(', ');

  // Find and remove ad elements
  const adElements = document.querySelectorAll(combinedSelector);
  adElements.forEach(el => el.remove());

  // Remove all iframes
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach(iframe => iframe.remove());

  // Find and remove divs containing "Advertisements" text
  const allDivs = document.querySelectorAll('div');
  allDivs.forEach(div => {
    if (div.innerText.includes('Advertisements')) {
      div.remove();
    }
  });

  console.log(`Removed ${adElements.length} potential ad elements and ${iframes.length} iframes`);
}

// Run the ad removal function when the content script loads
removeAds();

// Optional: Run the function again after a short delay to catch any dynamically loaded ads
setTimeout(removeAds, 2000);

// Optional: Set up a MutationObserver to watch for dynamically added ad elements
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      removeAds();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
