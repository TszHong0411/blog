wow = new WOW({
    boxClass: 'wow',
    // 當用戶滾動時顯示隱藏框的類名稱
    animateClass: 'animate__animated',
    // 觸發 CSS 動畫的類名稱（動畫庫默認為"animate.css"庫）
    offset: 0,
    // 定義瀏覽器視口底部與隱藏框頂部之間的距離。
    // 當用戶滾動並到達此距離時，將顯示隱藏的框。
    mobile: false,
    // 在移動設備上打開/關閉wow.js。
    // 經測試此項配置無效。
    live: true
    // 在頁面上檢查新的 wow.js元素。
  })
  wow.init();