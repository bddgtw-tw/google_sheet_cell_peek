const attachedTabs = new Set();

async function ensureAttached(tabId) {
  if (attachedTabs.has(tabId)) return;
  const targets = await chrome.debugger.getTargets();
  const existing = targets.find((target) => target.tabId === tabId && target.attached);
  if (!existing) {
    await chrome.debugger.attach({ tabId }, '1.3');
  }
  attachedTabs.add(tabId);
}

async function replaceCellText(tabId, message) {
  await chrome.debugger.sendCommand({ tabId }, 'Input.dispatchMouseEvent', {
    type: 'mousePressed', x: message.x, y: message.y, button: 'left', clickCount: 2
  });
  await chrome.debugger.sendCommand({ tabId }, 'Input.dispatchMouseEvent', {
    type: 'mouseReleased', x: message.x, y: message.y, button: 'left', clickCount: 2
  });
  await chrome.debugger.sendCommand({ tabId }, 'Input.dispatchKeyEvent', {
    type: 'keyDown', key: 'A', code: 'KeyA', modifiers: 2
  });
  await chrome.debugger.sendCommand({ tabId }, 'Input.dispatchKeyEvent', {
    type: 'keyUp', key: 'A', code: 'KeyA', modifiers: 2
  });
  await chrome.debugger.sendCommand({ tabId }, 'Input.dispatchKeyEvent', {
    type: 'keyUp', key: 'Control', code: 'ControlLeft', modifiers: 0
  });
  await chrome.debugger.sendCommand({ tabId }, 'Input.insertText', { text: message.text });
  await chrome.debugger.sendCommand({ tabId }, 'Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter' });
  await chrome.debugger.sendCommand({ tabId }, 'Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter' });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!['SHEET_CELL_PEEK_CLICK', 'SHEET_CELL_PEEK_EDIT'].includes(message?.type) || !sender.tab?.id) return;
  const tabId = sender.tab.id;
  (async () => {
    try {
      await ensureAttached(tabId);
      if (message.type === 'SHEET_CELL_PEEK_EDIT') {
        await replaceCellText(tabId, message);
        sendResponse({ ok: true });
        return;
      }
      await chrome.debugger.sendCommand({ tabId }, 'Input.dispatchMouseEvent', {
        type: 'mousePressed',
        x: message.x,
        y: message.y,
        button: 'left',
        clickCount: 1
      });
      await chrome.debugger.sendCommand({ tabId }, 'Input.dispatchMouseEvent', {
        type: 'mouseReleased',
        x: message.x,
        y: message.y,
        button: 'left',
        clickCount: 1
      });
      sendResponse({ ok: true });
    } catch (error) {
      attachedTabs.delete(tabId);
      sendResponse({ ok: false, error: String(error?.message || error) });
    }
  })();
  return true;
});

chrome.debugger.onDetach.addListener((source) => {
  if (source.tabId) attachedTabs.delete(source.tabId);
});

chrome.tabs.onRemoved.addListener((tabId) => attachedTabs.delete(tabId));
