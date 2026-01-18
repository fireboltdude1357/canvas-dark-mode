// Canvas Dark Mode Popup Script

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('darkModeToggle');
  const status = document.getElementById('status');

  // Load saved preference
  chrome.storage.sync.get(['darkModeEnabled'], function(result) {
    // Default to enabled
    toggle.checked = result.darkModeEnabled !== false;
  });

  // Handle toggle changes
  toggle.addEventListener('change', function() {
    const isEnabled = toggle.checked;

    // Save preference
    chrome.storage.sync.set({ darkModeEnabled: isEnabled }, function() {
      // Show status message
      status.classList.add('show');
      setTimeout(() => status.classList.remove('show'), 3000);
    });

    // Try to update active Canvas tabs immediately
    chrome.tabs.query({ url: '*://*.instructure.com/*' }, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.sendMessage(tab.id, {
          action: 'toggleDarkMode',
          enabled: isEnabled
        }).catch(() => {
          // Tab might not have content script loaded yet
        });
      });
    });
  });
});
