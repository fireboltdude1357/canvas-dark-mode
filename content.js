// Canvas Dark Mode Content Script
// Dark mode is applied by default via CSS. This script handles toggling OFF.

(function() {
  'use strict';

  // Check stored preference and disable dark mode if user turned it off
  function initDarkMode() {
    chrome.storage.sync.get(['darkModeEnabled'], function(result) {
      // Dark mode is ON by default (CSS applies immediately)
      // Only add light-mode class if explicitly disabled
      if (result.darkModeEnabled === false) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }

      // Enable smooth transitions after initial load
      setTimeout(() => {
        document.body.classList.add('canvas-transitions-enabled');
      }, 100);
    });
  }

  function enableDarkMode() {
    document.documentElement.classList.remove('canvas-light-mode');
  }

  function disableDarkMode() {
    document.documentElement.classList.add('canvas-light-mode');
  }

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'toggleDarkMode') {
      if (request.enabled) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
      sendResponse({ success: true });
    }
    return true;
  });

  // Initialize as soon as possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkMode);
  } else {
    initDarkMode();
  }
})();
