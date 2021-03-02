YL.static = {
  /** “關於”信息 */
  softwareName: 'TszHong 的主頁', //網站名。請在此處填寫您自己的網站名，如王小明的博客。
  version: "1.0.0", // 網站版本號
  iconBtnStart: 'html5', //主圖標
  author: 'TszHong',//作者
  contactInformation: 'lainelson411@gmail.com',//聯系方式
  officialWebsite: 'https://tszhong0411.vercel.app',//軟件官網
  copyrightDetail: 'Lai Tsz Hong',//版權詳細信息
  otherStatements: '',//其他信息（可留空）

  /**————————————————————————————————————————————————————————————————————————————————————————————*/
  /** YLUI基礎設置 */
  lang: 'en', //語言
  localStorageName: "ylui-storage", //ls存儲名
  lockedApps: ['yl-system', 'yl-color-picker', 'ylui-fa', 'yl-browser', 'yl-server'], // 鎖定的應用（不允許被腳本修改）
  trustedApps: ['yl-server'], // 受信任的應用（可以使用敏感API）
  debug: true,//啟用更多調試信息
  beforeOnloadEnable: true,//啟用關閉前詢問（打包app時請關閉防止出錯）
  WarningPerformanceInIE: true,//在IE下提示體驗不佳信息
  languages: {}, //推薦留空，自動從文件加載
  changeable: true,//存檔數據是否可被普通用戶修改
  dataCenter: true,//是否展示數據管理中心

  /**————————————————————————————————————————————————————————————————————————————————————————————*/
  /** YLUI注冊信息 */
  authorization: '社區版',//授權類型
  serialNumber: null,//序列號

};
