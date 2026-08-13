(() => {
  function install() {
    const controls = document.querySelector('#sheet-cell-peek-controls');
    const content = document.querySelector('#sheet-cell-peek-content');
    const label = document.querySelector('#sheet-cell-peek-size-label');
    if (!controls || !content || !label || controls.dataset.fontFix === '1') return;
    controls.dataset.fontFix = '1';
    const buttons = controls.querySelectorAll('button');
    const minus = buttons[0];
    const plus = buttons[1];
    const setSize = (size) => {
      const safe = Math.max(10, Math.min(28, size));
      content.style.setProperty('font-size', `${safe}px`, 'important');
      label.textContent = `${safe}px`;
      chrome.storage.local.set({ fontSize: safe });
    };
    const change = (delta) => {
      const current = parseInt(getComputedStyle(content).fontSize, 10) || 12;
      setSize(current + delta);
    };
    minus.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      change(-1);
    }, true);
    plus.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      change(1);
    }, true);
  }

  new MutationObserver(install).observe(document.documentElement, { childList: true, subtree: true });
  install();
})();
