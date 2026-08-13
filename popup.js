const enabled = document.getElementById('enabled');
const status = document.getElementById('status');

chrome.storage.local.get({ enabled: true }, (settings) => {
  enabled.checked = settings.enabled;
  updateStatus(settings.enabled);
});

enabled.addEventListener('change', () => {
  chrome.storage.local.set({ enabled: enabled.checked });
  updateStatus(enabled.checked);
});

function updateStatus(value) {
  status.textContent = value ? 'Cell preview is enabled' : 'Cell preview is disabled';
}
