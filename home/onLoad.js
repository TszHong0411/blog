/**
 * 讀取配置示例文件
 * 修改此文件來實現持久化
 * YL.init(data) 中的data必須是ylui接受的數據格式
 * 開發者可以自行決定從靜態文件讀取（如basic.json）還是從遠程服務器拉取（如ajax請求）
 */

YL.onLoad(function () {
  // 讀取url中load參數，如localhost/ylui/index.html?load=basic
  var load = Yuri2.parseURL().params.load;
  var file;
  // 當load === 'ylui-storage'時，嘗試加載瀏覽器緩存
  if (load === YL.static.localStorageName && localStorage.getItem(YL.static.localStorageName)) {
    YL.init();
    return;
  } else if (load === YL.static.localStorageName) {
    file = 'basic';
  }
  // 從json文件讀取
  file = file || load || 'basic';
  var save = /^\w+$/.test(file) ? '/home/saves/' + file + '.json' : file;
  Yuri2.loadContentFromUrl(save, 'GET', function (err, text) {
    if (!err) {
      var data = JSON.parse(text);
      YL.init(data);
    } else {
      alert('YLUI讀取配置錯誤，初始化失敗');
    }
  });
});
