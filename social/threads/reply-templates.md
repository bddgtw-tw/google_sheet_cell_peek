# Reply templates

## Positive feedback

謝謝測試！這個專案目前就是想先透過實際使用者回饋，確認哪些功能最有價值。

## Bug report request

謝謝回報。方便提供 Chrome 版本、發生問題的操作步驟，以及外掛錯誤畫面嗎？請不要貼出私人試算表內容。

## Feature request

這個需求很有意思，我先記下來。等收集幾個使用情境後，再判斷要不要放進下一版。

## Permission concern

你提到的疑慮很合理。`debugger` 權限是因為 Google Sheets 的表格主要由 Canvas 繪製，普通 content script 無法可靠取得目前選取的儲存格。外掛沒有後端，也不會上傳試算表內容。
