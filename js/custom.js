//  Print TszHong's Blog
console.log("%cTszHong's Blog", "color:red;font-family:system-ui;font-size:50px;-webkit-text-stroke: 1px black;font-weight:bold");

// Interesting browser title
var OriginTitile = document.title,
      st;
document.addEventListener("visibilitychange", function () {
      document.hidden ? (document.title = "(ꐦ ಠ皿ಠ ) 壞蛋去哪裡", clearTimeout(st)) : (document.title = "(≧▽≦) 回來了", st = setTimeout(function () {
            document.title = OriginTitile
      }, 3e3))
});