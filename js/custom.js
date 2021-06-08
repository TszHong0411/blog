// Clock JS
fetch('https://wttr.in/' + returnCitySN["cip"] + '?format="%l+\\+%c+\\+%t+\\+%h"').then(res => res.text()).then(
  data => {
    var res_text = data.replace(/"/g, '').replace(/\+/g, '').replace(/,/g, '\\').replace(/ /g, '').replace(/°C/g, '');
    res_list = res_text.split('\\');
    var clock_box = document.getElementById('hexo_electric_clock');
    clock_box_html = `  
  <div class="clock-row">
<span id="card-clock-clockdate" class="card-clock-clockdate"></span>
<span class="card-clock-weather">${res_list[2]} ${res_list[3]} °C</span>
<span class="card-clock-humidity">💧 ${res_list[4]}</span>
</div>
  <div class="clock-row"><span id="card-clock-time" class="card-clock-time"></span></div>
  
  <div class="clock-row">
  <span class="card-clock-ip">${returnCitySN["cip"]}</span>
<span class="card-clock-location">${res_list[0]}</span>
  <span id="card-clock-dackorlight" class="card-clock-dackorlight"></span>
</div>
`;
    var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var card_clock_loading_dom = document.getElementById('card-clock-loading');
    if (document.getElementById('card-clock-loading')) {
      card_clock_loading_dom.innerHTML = ''
    }
    if (document.getElementById('hexo_electric_clock')) {
      clock_box.innerHTML = clock_box_html
    }
  
    function updateTime() {
      var cd = new Date();
      var card_clock_time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
      var card_clock_date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth() + 1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
      var card_clock_dackorlight = cd.getHours();
      var card_clock_dackorlight_str;
      if (card_clock_dackorlight > 12) {
        card_clock_dackorlight -= 12;
        card_clock_dackorlight_str = " PM";
      } else {
        card_clock_dackorlight_str = " AM";
      }
      if (document.getElementById('card-clock-time')) {
        var card_clock_time_dom = document.getElementById('card-clock-time');
        var card_clock_date_dom = document.getElementById('card-clock-clockdate');
        var card_clock_dackorlight_dom = document.getElementById('card-clock-dackorlight');
        card_clock_time_dom.innerHTML = card_clock_time;
        card_clock_date_dom.innerHTML = card_clock_date;
        card_clock_dackorlight_dom.innerHTML = card_clock_dackorlight_str
      }
    }

    function zeroPadding(num, digit) {
      var zero = '';
      for (var i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    }


    var timerID = setInterval(updateTime, 1000);
    updateTime();


  }
)


var gitcalendar = new Vue({
  el: '#gitcalendar',
  data: {
    simplemode: true,
    user: 'TszHong0411',
    fixed: 'fixed',
    px: 'px',
    x: '',
    y: '',
    span1: '',
    span2: '',
    month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthchange: [],
    oneyearbeforeday: '',
    thisday: '',
    amonthago: '',
    aweekago: '',
    weekdatacore: 0,
    datacore: 0,
    total: 0,
    datadate: '',
    data: [],
    positionplusdata: [],
    firstweek: [],
    lastweek: [],
    beforeweek: [],
    thisweekdatacore: 0,
    mounthbeforeday: 0,
    mounthfirstindex: 0,
    crispedges: 'crispedges',
    thisdayindex: 0,
    amonthagoindex: 0,
    amonthagoweek: [],
    firstdate: [],
    first2date: [],
    montharrbefore: [],
    monthindex: 0,
    color: ['#ebedf0', '#f1f8ff', '#dbedff', '#c8e1ff', '#79b8ff', '#2188ff', '#0366d6', '#005cc5', '#044289', '#032f62', '#05264c']
  },
  methods: {
    selectStyle(data, event) {
      document.querySelector('.angle-wrapper').style.display = 'block'
      this.span1 = data.date;
      this.span2 = data.count;
      this.x = event.clientX - 100;
      this.y = event.clientY - 60
    },
    outStyle() {
      document.querySelector('.angle-wrapper').style.display = 'none'
    },
    thiscolor(x) {
      if (x === 0) {
        let i = parseInt(x / 2);
        return this.color[0]
      } else if (x < 2) {
        return this.color[1]
      } else if (x < 20) {
        let i = parseInt(x / 2);
        return this.color[i]
      } else {
        return this.color[9]
      }
    },
  }
});
var apiurl = 'calendar.tszhong.top' ? 'https://calendar.tszhong.top/api?' : 'https://githubapi.ryanchristian.dev/user/'
var githubapiurl = apiurl + gitcalendar.user;
//canvas繪圖
function responsiveChart() {
  let c = document.getElementById("gitcanvas");
  if (c) {
    let cmessage = document.getElementById("gitmessage");
    let ctx = c.getContext("2d");
    c.width = document.getElementById("gitcalendarcanvasbox").offsetWidth;
    let linemaxwitdh = 0.96 * c.width / gitcalendar.data.length;
    c.height = 9 * linemaxwitdh;
    let lineminwitdh = 0.8 * linemaxwitdh;
    let setposition = {
      x: 0.02 * c.width,
      y: 0.025 * c.width
    };
    for (let week in gitcalendar.data) {
      weekdata = gitcalendar.data[week];
      for (let day in weekdata) {
        let dataitem = {
          date: "",
          count: "",
          x: 0,
          y: 0
        };
        gitcalendar.positionplusdata.push(dataitem);
        ctx.fillStyle = gitcalendar.thiscolor(weekdata[day].count);
        setposition.y = Math.round(setposition.y * 100) / 100;
        dataitem.date = weekdata[day].date;
        dataitem.count = weekdata[day].count;
        dataitem.x = setposition.x;
        dataitem.y = setposition.y;
        ctx.fillRect(setposition.x, setposition.y, lineminwitdh, lineminwitdh);
        setposition.y = setposition.y + linemaxwitdh
      };
      setposition.y = 0.025 * c.width;
      setposition.x = setposition.x + linemaxwitdh
    };
    ctx.font = "600  Arial";
    ctx.fillStyle = '#aaa';
    ctx.fillText("日", 0, 1.9 * linemaxwitdh);
    ctx.fillText("二", 0, 3.9 * linemaxwitdh);
    ctx.fillText("四", 0, 5.9 * linemaxwitdh);
    ctx.fillText("六", 0, 7.9 * linemaxwitdh);
    let monthindexlist = c.width / 24;
    for (let index in gitcalendar.monthchange) {
      ctx.fillText(gitcalendar.monthchange[index], monthindexlist, 0.7 * linemaxwitdh);
      monthindexlist = monthindexlist + c.width / 12
    };
    cmessage.onmousemove = function (event) {
      document.querySelector('.angle-wrapper').style.display = 'none'
    };
    c.onmousemove = function (event) {
      document.querySelector('.angle-wrapper').style.display = 'none'
      getMousePos(c, event);
    };

    function getMousePos(canvas, event) {
      var rect = canvas.getBoundingClientRect();
      var x = event.clientX - rect.left * (canvas.width / rect.width);
      var y = event.clientY - rect.top * (canvas.height / rect.height);
      //console.log("x:"+x+",y:"+y);
      for (let item of gitcalendar.positionplusdata) {
        let lenthx = x - item.x;
        let lenthy = y - item.y;
        //console.log(lenthx,lenthy);
        if (0 < lenthx && lenthx < lineminwitdh) {
          if (0 < lenthy && lenthy < lineminwitdh) {
            //console.log(item.date,item.count)
            document.querySelector('.angle-wrapper').style.display = 'block'
            gitcalendar.span1 = item.date;
            gitcalendar.span2 = item.count;
            gitcalendar.x = event.clientX - 100;
            gitcalendar.y = event.clientY - 60
          }
        }
        //if(0< x - item.x <lineminwitdh&&0< y - item.y <lineminwitdh){
        //console.log(item.count,item.date);
        //}
      }
    }
  }
}
//數據統計算法
function addlastmonth() {
  if (gitcalendar.thisdayindex === 0) {
    thisweekcore(52);
    thisweekcore(51);
    thisweekcore(50);
    thisweekcore(49);
    thisweekcore(48);
    gitcalendar.thisweekdatacore += gitcalendar.firstdate[6].count;
    gitcalendar.amonthago = gitcalendar.firstdate[6].date
  } else {
    thisweekcore(52);
    thisweekcore(51);
    thisweekcore(50);
    thisweekcore(49);
    thisweek2core();
    gitcalendar.amonthago = gitcalendar.first2date[gitcalendar.thisdayindex - 1].date
  }
};

function thisweek2core() {
  for (let i = gitcalendar.thisdayindex - 1; i < gitcalendar.first2date.length; i++) {
    gitcalendar.thisweekdatacore += gitcalendar.first2date[i].count
  }
};

function thisweekcore(index) {
  for (let item of gitcalendar.data[index]) {
    gitcalendar.thisweekdatacore += item.count
  }
};

function addlastweek() {
  for (let item of gitcalendar.lastweek) {
    gitcalendar.weekdatacore += item.count
  }
};

function addbeforeweek() {
  for (let i = gitcalendar.thisdayindex; i < gitcalendar.beforeweek.length; i++) {
    gitcalendar.weekdatacore += gitcalendar.beforeweek[i].count
  }
};

function addweek(data) {
  if (gitcalendar.thisdayindex === 6) {
    gitcalendar.aweekago = gitcalendar.lastweek[0].date;
    addlastweek()
  } else {
    lastweek = data.contributions[51];
    gitcalendar.aweekago = lastweek[gitcalendar.thisdayindex + 1].date;
    addlastweek();
    addbeforeweek()
  }
}

fetch(githubapiurl)
  .then(data => data.json())
  .then(data => {
    gitcalendar.data = data.contributions;
    gitcalendar.total = data.total;
    gitcalendar.first2date = gitcalendar.data[48];
    gitcalendar.firstdate = gitcalendar.data[47];
    gitcalendar.firstweek = data.contributions[0];
    gitcalendar.lastweek = data.contributions[52];
    gitcalendar.beforeweek = data.contributions[51];
    gitcalendar.thisdayindex = gitcalendar.lastweek.length - 1;
    gitcalendar.thisday = gitcalendar.lastweek[gitcalendar.thisdayindex].date;
    gitcalendar.oneyearbeforeday = gitcalendar.firstweek[0].date;
    gitcalendar.monthindex = gitcalendar.thisday.substring(5, 7) * 1;
    gitcalendar.montharrbefore = gitcalendar.month.splice(gitcalendar.monthindex, 12 - gitcalendar.monthindex);
    gitcalendar.monthchange = gitcalendar.montharrbefore.concat(gitcalendar.month);
    addweek(data);
    addlastmonth();
    responsiveChart();
  })
  .catch(function (error) {
    console.log(error);
  });

//手機版更換為svg繪制
if (document.getElementById("gitcalendarcanvasbox") && gitcalendarcanvasbox.offsetWidth < 500) {
  gitcalendar.simplemode = false
}

//當改變窗口大小時重新繪制canvas
window.onresize = function () {
  if (gitcalendar.simplemode) responsiveChart()
}

//解決滾動滑輪時出現的標簽顯示
window.onscroll = function () {
  if (document.querySelector('.angle-wrapper')) {
    document.querySelector('.angle-wrapper').style.display = 'none'
  }
};

// 修復 nav 問題
if (window.matchMedia("(max-width: 817px)").matches) {
  document.querySelector("#nav").classList.add("hide-menu")
};

/**
 * Calendar - displays a calendar of the current month. Dates appear links if there are posts for that day.
 */
 (function ($) {

  var aCalendar = function (language, options, object) {
    var now = new Date();
    var nDay = now.getDate();
    var nMonth = now.getMonth();
    var nYear = now.getFullYear();
    var dDay = nDay;
    var dMonth = nMonth;
    var dYear = nYear;
    var instance = object;
    var allPosts = null;
    var months = null;
    /* Current month's posts */
    var current = {
      posts: [],
      prev: null,
      next: null
    };
    var currentLanguage = 'en';

    initLanguage(language);

    var settings = $.extend({}, $.fn.aCalendar.defaults, typeof calLanguages === 'undefined' ? {} : calLanguages[currentLanguage], options);

    if (settings.root[0] !== '/') {
      settings.root = '/' + settings.root;
    }

    if (settings.root[settings.root.length - 1] !== '/') {
      settings.root += '/';
    }

    /**
     * Initial language.
     */
    function initLanguage(key) {
      if (key && typeof calLanguages !== 'undefined' && calLanguages[key]) {
        currentLanguage = key;
      }
    }

    /**
     * Click handler for next month arrow button.
     */
    function nextMonth() {
      if (dMonth < 11) {
        dMonth++;
      } else {
        dMonth = 0;
        dYear++;
      }

      draw();
    };

    /**
     * Click handler for previous month arrow button.
     */
    function previousMonth() {
      if (dMonth > 0) {
        dMonth--;
      } else {
        dMonth = 11;
        dYear--;
      }

      draw();
    };

    /**
     * Click handler for navigating to a month if there are posts.
     */
    function toPostsMonth(date) {
      if (date) {
        dYear = date.getFullYear();
        dMonth = date.getMonth();
        draw();
      }
    }

    /**
     * Load current month's posts.
     */
    function loadPosts() {
      if (settings.single) {
        loadAllPosts();
      } else {
        loadPostsByMonth();
      }
    }

    /**
     * Load all month's posts.
     */
    function loadAllPosts() {
      if (settings.url != null && settings.url != '') {
        if (allPosts === null) {
          $.ajax({
            url: settings.url,
            async: false,
            success: function (data) {
              allPosts = data;
              initMonths(Object.keys(allPosts));
            }
          });
        }

        if (allPosts !== null) {
          if (parse()) {
            current.posts = allPosts[dYear + '-' + (dMonth + 1)];
          }
        }
      }
    }

    /**
     * Load posts by the month.
     */
    function loadPostsByMonth() {
      if (months === null) {
        $.ajax({
          url: settings.root + 'list.json',
          async: false,
          success: function (data) {
            initMonths(data);
          }
        });
      }

      if (parse()) {
        $.ajax({
          url: settings.root + dYear + '-' + (dMonth + 1) + '.json',
          async: false,
          success: function (data) {
            current.posts = data;
          }
        });
      }
    }

    /**
     * Initial months array.
     */
    function initMonths(array) {
      months = array.map(function (item) {
        var ym = item.split('-');
        return new Date(Date.UTC(+ym[0], +ym[1] - 1));
      });
    }

    /**
     * Parse posts month array, and set current.next and current.prev.
     *
     * @return if there are posts in this month, return true. ortherwise return false.
     */
    function parse() {
      var time = Date.UTC(dYear, dMonth);

      if (months === null || months.length === 0) {
        return false;
      }

      //If no posts in the current month, and before (or after) the current month yet not published articles, then the response to click previous month's (or next month's) event don't need to parse months array
      if (current.posts.length === 0 && (current.prev === null && current.next !== null && current.next.getTime() > time || current.next === null && current.prev !== null && current.prev.getTime() < time)) {
        return false;
      }

      current.posts = [];

      for (var i = 0; i < months.length; i++) {
        var cTime = months[i].getTime();
        if (time === cTime) {
          current.prev = i === 0 ? null : months[i - 1];
          current.next = i === months.length - 1 ? null : months[i + 1];
          return true;
        } else if (time < cTime) {
          current.prev = i === 0 ? null : months[i - 1];
          current.next = months[i];
          break;
        } else {
          current.prev = months[i];
          current.next = null;
        }
      }

      return false;
    }

    /**
     * Format date object.
     */
    function simpleDateFormat(date, fmt) {
      var o = {
        'LMM+': settings.months[date.getMonth()],
        'MM+': date.getMonth() + 1
      };

      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      }

      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (k === 'LMM+') ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
      }

      return fmt;
    }

    /**
     * Draw calendar.
     *
     */
    function draw() {
      loadPosts();
      var dWeekDayOfMonthStart = new Date(dYear, dMonth, 1).getDay() - settings.weekOffset;
      if (dWeekDayOfMonthStart <= 0) {
        dWeekDayOfMonthStart = 6 - ((dWeekDayOfMonthStart + 1) * -1);
      }

      var dLastDayOfMonth = new Date(dYear, dMonth + 1, 0).getDate();
      var dLastDayOfPreviousMonth = new Date(dYear, dMonth, 0).getDate() - dWeekDayOfMonthStart + 1;

      var cHead = $('<div/>').addClass('cal-head');
      var cNext = $('<div/>');
      var cPrevious = $('<div/>');
      var cTitle = $('<div/>').addClass('cal-title');
      cPrevious.html(settings.headArrows.previous);
      cNext.html(settings.headArrows.next);
      curDate = new Date(Date.UTC(dYear, dMonth));
      if (current.posts.length === 0) {
        cTitle.html(simpleDateFormat(curDate, settings.titleFormat));
      } else {
        cTitleLink = $('<a/>').attr('href', simpleDateFormat(curDate, settings.titleLinkFormat))
          .attr('title', simpleDateFormat(curDate, settings.postsMonthTip))
          .html(simpleDateFormat(curDate, settings.titleFormat));
        cTitle.html(cTitleLink);
      }

      cPrevious.on('click', previousMonth);
      cNext.on('click', nextMonth);

      cHead.append(cPrevious);
      cHead.append(cTitle);
      cHead.append(cNext);

      var cBody = $('<table/>').addClass('cal');

      var dayOfWeek = settings.weekOffset;
      var cWeekHead = $('<thead/>');
      var cWeekHeadRow = $('<tr/>');
      for (var i = 0; i < 7; i++) {
        if (dayOfWeek > 6) {
          dayOfWeek = 0;
        }

        var cWeekDay = $('<th/>').attr('scope', 'col').attr('title', settings.dayOfWeek[dayOfWeek]);
        cWeekDay.html(settings.dayOfWeekShort[dayOfWeek]);
        cWeekHeadRow.append(cWeekDay);
        dayOfWeek++;
      }

      cWeekHead.append(cWeekHeadRow);
      cBody.append(cWeekHead);

      var cFoot = $('<tfoot/>');
      var cFootRow = $('<tr/>');
      var cPrevPosts = $('<td/>').attr('colspan', 3);
      var cPad = $('<td/>').html('&nbsp;');
      var cNextPosts = $('<td/>').attr('colspan', 3);
      if (current.prev) {
        cPrevPosts.html(settings.footArrows.previous + settings.months[current.prev.getMonth()])
          .addClass('cal-foot')
          .attr('title', simpleDateFormat(current.prev, settings.postsMonthTip));
      }

      if (current.next) {
        cNextPosts.html(settings.months[current.next.getMonth()] + settings.footArrows.next)
          .addClass('cal-foot')
          .attr('title', simpleDateFormat(current.next, settings.postsMonthTip));
      }

      cPrevPosts.on('click', function () {
        toPostsMonth(current.prev);
      });

      cNextPosts.on('click', function () {
        toPostsMonth(current.next);
      });

      cFootRow.append(cPrevPosts);
      cFootRow.append(cPad);
      cFootRow.append(cNextPosts);
      cFoot.append(cFootRow);

      var cMainPad = $('<tbody/>');
      var day = 1;
      var dayOfNextMonth = 1;
      for (var i = 0; i < 6; i++) {
        var cWeek = $('<tr/>');
        for (var j = 0; j < 7; j++) {
          var cDay = $('<td/>');
          if (i * 7 + j < dWeekDayOfMonthStart) {
            cDay.addClass('cal-gray');
            cDay.html(dLastDayOfPreviousMonth++);
          } else if (day <= dLastDayOfMonth) {
            if (day == dDay && nMonth == dMonth && nYear == dYear) {
              cDay.addClass('cal-today');
            }

            var count = {
              num: 0,
              keys: []
            };
            for (var k = 0; k < current.posts.length; k++) {
              var d = new Date(Date.parse(current.posts[k].date));
              if (d.getDate() == day) {
                count.keys[count.num++] = k;
              }
            }

            if (count.num !== 0) {
              var index = count.keys[0];
              var cLink = $('<a>').attr('href', current.posts[index].link).attr('title', current.posts[index].title).html(day++);
              cDay.append(cLink);
            } else {
              cDay.html(day++);
            }
          } else {
            cDay.addClass('cal-gray');
            cDay.html(dayOfNextMonth++);
          }

          cWeek.append(cDay);
        }

        cMainPad.append(cWeek);
      }

      cBody.append(cWeekHead);
      cBody.append(cFoot);
      cBody.append(cMainPad);

      $(instance).html(cHead);
      $(instance).append(cBody);
    }

    return draw();
  };

  $.fn.aCalendar = function (Lang, oInit) {
    return this.each(function () {
      return aCalendar(Lang, oInit, $(this));
    });
  };

  // plugin defaults
  $.fn.aCalendar.defaults = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dayOfWeekShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    postsMonthTip: 'Posts published in LMM yyyy',
    titleFormat: 'yyyy LMM',
    titleLinkFormat: '/archives/yyyy/MM/',
    headArrows: {
      previous: '<span class="cal-prev"></span>',
      next: '<span class="cal-next"></span>'
    },
    footArrows: {
      previous: '« ',
      next: ' »'
    },
    weekOffset: 0,
    single: true,
    root: '/calendar/',
    url: '/calendar.json'
  };

}(jQuery));

$(document).ready(function () {
  $('#calendar').aCalendar('zh-TW');
});

var calLanguages = {
  'zh-TW': { //Traditional Chinese (繁體中文)
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    dayOfWeekShort: [
      '日', '一', '二', '三', '四', '五', '六'
    ],
    dayOfWeek: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  },
};
