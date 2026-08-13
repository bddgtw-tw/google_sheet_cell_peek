# Follow-up thread replies

## Reply 1: the workflow

使用方式很簡單：

1. 點擊 Google Sheets 儲存格
2. 保留藍色選取框
3. 約 0.3 秒後出現完整內容
4. 可以拖曳視窗、Copy、Edit 或 Save

## Reply 2: why this exists

Google Sheets 的長文字常常會把欄寬或列高撐開，結果整張表變得很難看，也很難快速掃描。

這個小工具的想法就是：保留原本表格版面，需要時再把內容叫出來。

## Reply 3: current status

這不是正式商業產品，目前是個人分享的 Experimental MVP。

我想先確認：這是不是只有我自己的痛點，還是真的也有人需要。

## Reply 4: privacy

外掛只在 Google Sheets 頁面運作，不使用後端、不放廣告，也不會把試算表內容上傳到外部伺服器。

因為 Google Sheets 主要使用 Canvas 繪製表格，所以需要 `debugger` 權限來辨識目前選取的儲存格。

## Reply 5: invitation

如果你願意試用，歡迎回報：

- 你使用的 Chrome 版本
- 哪種儲存格內容最需要預覽
- 哪個操作最容易出問題
- 你希望下一個功能是什麼
