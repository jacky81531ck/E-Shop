- 新增 Navbar 並調整所有按鍵功能 (html+css+js)
- 新增 Carousel 並設定樣式 (html+css)
- 調整 Footer (css)
- 調整 Item (html+css+js)
- 重新設計 Insert 介面 (html+css)
- 合併 Index.html & Insert.html 已達成搜尋和新增切換功能 (html+css+js)
- 新增分頁與其運算設計 (css+js)
- 修正原始碼最後分頁無法active問題 (js)
> 原因是showItems()迴圈除非產品數剛好整除，否則會一直抵達不了 i>end，因為newItem()會一直去抓東西可是抓不到。showItems()沒有結束的狀況下，不會進行click()裡面的newPage()。
所以showItems()迴圈應多加一個判斷回傳值是否為空，為空就跳出，才能使最後一頁就active。
- 新增分頁顯示 (html+css+js)
- 新增 Index 初始的分頁顯示 (html+js)
- 移動 pageNum 計算以增加運算效率 (js)