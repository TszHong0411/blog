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



/**
 * Calendar - displays a calendar of the current month. Dates appear links if there are posts for that day.
 */

 (function($) {

      var aCalendar = function(language, options, object) {
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
                success: function(data) {
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
              success: function(data) {
                initMonths(data);
              }
            });
          }
    
          if (parse()) {
            $.ajax({
              url: settings.root + dYear + '-' + (dMonth + 1) + '.json',
              async: false,
              success: function(data) {
                current.posts = data;
              }
            });
          }
        }
    
        /**
         * Initial months array.
         */
        function initMonths(array) {
          months = array.map(function(item) {
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
    
          cPrevPosts.on('click', function() {
            toPostsMonth(current.prev);
          });
    
          cNextPosts.on('click', function() {
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
    
      $.fn.aCalendar = function(Lang, oInit) {
        return this.each(function() {
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
        headArrows: {previous: '<span class="cal-prev"></span>', next: '<span class="cal-next"></span>'},
        footArrows: {previous: '« ', next: ' »'},
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
  ar: { // Arabic
    months: [
      'كانون الثاني', 'شباط', 'آذار', 'نيسان', 'مايو', 'حزيران', 'تموز', 'آب', 'أيلول', 'تشرين الأول', 'تشرين الثاني', 'كانون الأول'
    ],
    dayOfWeekShort: [
      'ن', 'ث', 'ع', 'خ', 'ج', 'س', 'ح'
    ],
    dayOfWeek: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد']
  },
  ro: { // Romanian
    months: [
      'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
    ],
    dayOfWeekShort: [
      'Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ'
    ],
    dayOfWeek: ['Duminică', 'Luni', 'Marţi', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă']
  },
  id: { // Indonesian
    months: [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ],
    dayOfWeekShort: [
      'Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'
    ],
    dayOfWeek: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  },
  is: { // Icelandic
    months: [
      'Janúar', 'Febrúar', 'Mars', 'Apríl', 'Maí', 'Júní', 'Júlí', 'Ágúst', 'September', 'Október', 'Nóvember', 'Desember'
    ],
    dayOfWeekShort: [
      'Sun', 'Mán', 'Þrið', 'Mið', 'Fim', 'Fös', 'Lau'
    ],
    dayOfWeek: ['Sunnudagur', 'Mánudagur', 'Þriðjudagur', 'Miðvikudagur', 'Fimmtudagur', 'Föstudagur', 'Laugardagur']
  },
  bg: { // Bulgarian
    months: [
      'Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'
    ],
    dayOfWeekShort: [
      'Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'
    ],
    dayOfWeek: ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота']
  },
  fa: { // Persian/Farsi
    months: [
      'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ],
    dayOfWeekShort: [
      'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'
    ],
    dayOfWeek: ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه', 'یک‌شنبه']
  },
  ru: { // Russian
    months: [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ],
    dayOfWeekShort: [
      'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'
    ],
    dayOfWeek: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
  },
  uk: { // Ukrainian
    months: [
      'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
    ],
    dayOfWeekShort: [
      'Ндл', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'
    ],
    dayOfWeek: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота']
  },
  en: { // English
    months: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],
    dayOfWeekShort: [
      'S', 'M', 'T', 'W', 'T', 'F', 'S'
    ],
    dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    postsMonthTip: 'Posts published in LMM yyyy',
    titleFormat: 'LMM yyyy'
  },
  el: { // Ελληνικά
    months: [
      'Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'
    ],
    dayOfWeekShort: [
      'Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ'
    ],
    dayOfWeek: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο']
  },
  de: { // German
    months: [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ],
    dayOfWeekShort: [
      'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'
    ],
    dayOfWeek: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
  },
  nl: { // Dutch
    months: [
      'januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'
    ],
    dayOfWeekShort: [
      'zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'
    ],
    dayOfWeek: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag']
  },
  tr: { // Turkish
    months: [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ],
    dayOfWeekShort: [
      'Paz', 'Pts', 'Sal', 'Çar', 'Per', 'Cum', 'Cts'
    ],
    dayOfWeek: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
  },
  fr: { //French
    months: [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ],
    dayOfWeekShort: [
      'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'
    ],
    dayOfWeek: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
  },
  es: { // Spanish
    months: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    dayOfWeekShort: [
      'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'
    ],
    dayOfWeek: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  },
  th: { // Thai
    months: [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ],
    dayOfWeekShort: [
      'อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'
    ],
    dayOfWeek: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์', 'อาทิตย์']
  },
  pl: { // Polish
    months: [
      'styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'
    ],
    dayOfWeekShort: [
      'nd', 'pn', 'wt', 'śr', 'cz', 'pt', 'sb'
    ],
    dayOfWeek: ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota']
  },
  pt: { // Portuguese
    months: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    dayOfWeekShort: [
      'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'
    ],
    dayOfWeek: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  },
  ch: { // Simplified Chinese
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    dayOfWeekShort: [
      '日', '一', '二', '三', '四', '五', '六'
    ]
  },
  se: { // Swedish
    months: [
      'Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'
    ],
    dayOfWeekShort: [
      'Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'
    ]
  },
  kr: { // Korean
    months: [
      '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'
    ],
    dayOfWeekShort: [
      '일', '월', '화', '수', '목', '금', '토'
    ],
    dayOfWeek: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  },
  it: { // Italian
    months: [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ],
    dayOfWeekShort: [
      'Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'
    ],
    dayOfWeek: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
  },
  da: { // Dansk
    months: [
      'January', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'July', 'August', 'September', 'Oktober', 'November', 'December'
    ],
    dayOfWeekShort: [
      'Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'
    ],
    dayOfWeek: ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag']
  },
  no: { // Norwegian
    months: [
      'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
    ],
    dayOfWeekShort: [
      'Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'
    ],
    dayOfWeek: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
  },
  ja: { // Japanese
    months: [
      '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'
    ],
    dayOfWeekShort: [
      '日', '月', '火', '水', '木', '金', '土'
    ],
    dayOfWeek: ['日曜', '月曜', '火曜', '水曜', '木曜', '金曜', '土曜']
  },
  vi: { // Vietnamese
    months: [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ],
    dayOfWeekShort: [
      'CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'
    ],
    dayOfWeek: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
  },
  sl: { // Slovenščina
    months: [
      'Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij', 'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December'
    ],
    dayOfWeekShort: [
      'Ned', 'Pon', 'Tor', 'Sre', 'Čet', 'Pet', 'Sob'
    ],
    dayOfWeek: ['Nedelja', 'Ponedeljek', 'Torek', 'Sreda', 'Četrtek', 'Petek', 'Sobota']
  },
  cs: { // Čeština
    months: [
      'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
    ],
    dayOfWeekShort: [
      'Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'
    ]
  },
  hu: { // Hungarian
    months: [
      'Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
    ],
    dayOfWeekShort: [
      'Va', 'Hé', 'Ke', 'Sze', 'Cs', 'Pé', 'Szo'
    ],
    dayOfWeek: ['vasárnap', 'hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat']
  },
  az: { //Azerbaijanian (Azeri)
    months: [
      'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
    ],
    dayOfWeekShort: [
      'B', 'Be', 'Ça', 'Ç', 'Ca', 'C', 'Ş'
    ],
    dayOfWeek: ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə']
  },
  bs: { //Bosanski
    months: [
      'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
    ],
    dayOfWeekShort: [
      'Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'
    ],
    dayOfWeek: ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota']
  },
  ca: { //Català
    months: [
      'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'
    ],
    dayOfWeekShort: [
      'Dg', 'Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds'
    ],
    dayOfWeek: ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte']
  },
  'en-GB': { //English (British)
    months: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],
    dayOfWeekShort: [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ],
    dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  et: { //'Eesti'
    months: [
      'Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni', 'Juuli', 'August', 'September', 'Oktoober', 'November', 'Detsember'
    ],
    dayOfWeekShort: [
      'P', 'E', 'T', 'K', 'N', 'R', 'L'
    ],
    dayOfWeek: ['Pühapäev', 'Esmaspäev', 'Teisipäev', 'Kolmapäev', 'Neljapäev', 'Reede', 'Laupäev']
  },
  eu: { //Euskara
    months: [
      'Urtarrila', 'Otsaila', 'Martxoa', 'Apirila', 'Maiatza', 'Ekaina', 'Uztaila', 'Abuztua', 'Iraila', 'Urria', 'Azaroa', 'Abendua'
    ],
    dayOfWeekShort: [
      'Ig.', 'Al.', 'Ar.', 'Az.', 'Og.', 'Or.', 'La.'
    ],
    dayOfWeek: ['Igandea', 'Astelehena', 'Asteartea', 'Asteazkena', 'Osteguna', 'Ostirala', 'Larunbata']
  },
  fi: { //Finnish (Suomi)
    months: [
      'Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'
    ],
    dayOfWeekShort: [
      'Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'
    ],
    dayOfWeek: ['sunnuntai', 'maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai']
  },
  gl: { //Galego
    months: [
      'Xan', 'Feb', 'Maz', 'Abr', 'Mai', 'Xun', 'Xul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'
    ],
    dayOfWeekShort: [
      'Dom', 'Lun', 'Mar', 'Mer', 'Xov', 'Ven', 'Sab'
    ],
    dayOfWeek: ['Domingo', 'Luns', 'Martes', 'Mércores', 'Xoves', 'Venres', 'Sábado']
  },
  hr: { //Hrvatski
    months: [
      'Siječanj', 'Veljača', 'Ožujak', 'Travanj', 'Svibanj', 'Lipanj', 'Srpanj', 'Kolovoz', 'Rujan', 'Listopad', 'Studeni', 'Prosinac'
    ],
    dayOfWeekShort: [
      'Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'
    ],
    dayOfWeek: ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subotagg']
  },
  ko: { //Korean (한국어)
    months: [
      '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'
    ],
    dayOfWeekShort: [
      '일', '월', '화', '수', '목', '금', '토'
    ],
    dayOfWeek: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  },
  lt: { //Lithuanian (lietuvių)
    months: [
      'Sausio', 'Vasario', 'Kovo', 'Balandžio', 'Gegužės', 'Birželio', 'Liepos', 'Rugpjūčio', 'Rugsėjo', 'Spalio', 'Lapkričio', 'Gruodžio'
    ],
    dayOfWeekShort: [
      'Sek', 'Pir', 'Ant', 'Tre', 'Ket', 'Pen', 'Šeš'
    ],
    dayOfWeek: ['Sekmadienis', 'Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis']
  },
  lv: { //Latvian (Latviešu)
    months: [
      'Janvāris', 'Februāris', 'Marts', 'Aprīlis ', 'Maijs', 'Jūnijs', 'Jūlijs', 'Augusts', 'Septembris', 'Oktobris', 'Novembris', 'Decembris'
    ],
    dayOfWeekShort: [
      'Sv', 'Pr', 'Ot', 'Tr', 'Ct', 'Pk', 'St'
    ],
    dayOfWeek: ['Svētdiena', 'Pirmdiena', 'Otrdiena', 'Trešdiena', 'Ceturtdiena', 'Piektdiena', 'Sestdiena']
  },
  mk: { //Macedonian (Македонски)
    months: [
      'јануари', 'февруари', 'март', 'април', 'мај', 'јуни', 'јули', 'август', 'септември', 'октомври', 'ноември', 'декември'
    ],
    dayOfWeekShort: [
      'нед', 'пон', 'вто', 'сре', 'чет', 'пет', 'саб'
    ],
    dayOfWeek: ['Недела', 'Понеделник', 'Вторник', 'Среда', 'Четврток', 'Петок', 'Сабота']
  },
  mn: { //Mongolian (Монгол)
    months: [
      '1-р сар', '2-р сар', '3-р сар', '4-р сар', '5-р сар', '6-р сар', '7-р сар', '8-р сар', '9-р сар', '10-р сар', '11-р сар', '12-р сар'
    ],
    dayOfWeekShort: [
      'Дав', 'Мяг', 'Лха', 'Пүр', 'Бсн', 'Бям', 'Ням'
    ],
    dayOfWeek: ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба', 'Ням']
  },
  'pt-BR': { //Português(Brasil)
    months: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    dayOfWeekShort: [
      'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'
    ],
    dayOfWeek: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  },
  sk: { //Slovenčina
    months: [
      'Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December'
    ],
    dayOfWeekShort: [
      'Ne', 'Po', 'Ut', 'St', 'Št', 'Pi', 'So'
    ],
    dayOfWeek: ['Nedeľa', 'Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota']
  },
  sq: { //Albanian (Shqip)
    months: [
      'Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor', 'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'
    ],
    dayOfWeekShort: [
      'Die', 'Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Shtu'
    ],
    dayOfWeek: ['E Diel', 'E Hënë', 'E Martē', 'E Mërkurë', 'E Enjte', 'E Premte', 'E Shtunë']
  },
  'sr-YU': { //Serbian (Srpski)
    months: [
      'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
    ],
    dayOfWeekShort: [
      'Ned', 'Pon', 'Uto', 'Sre', 'čet', 'Pet', 'Sub'
    ],
    dayOfWeek: ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota']
  },
  sr: { //Serbian Cyrillic (Српски)
    months: [
      'јануар', 'фебруар', 'март', 'април', 'мај', 'јун', 'јул', 'август', 'септембар', 'октобар', 'новембар', 'децембар'
    ],
    dayOfWeekShort: [
      'нед', 'пон', 'уто', 'сре', 'чет', 'пет', 'суб'
    ],
    dayOfWeek: ['Недеља', 'Понедељак', 'Уторак', 'Среда', 'Четвртак', 'Петак', 'Субота']
  },
  sv: { //Svenska
    months: [
      'Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'
    ],
    dayOfWeekShort: [
      'Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'
    ],
    dayOfWeek: ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag']
  },
  'zh-TW': { //Traditional Chinese (繁體中文)
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    dayOfWeekShort: [
      '日', '一', '二', '三', '四', '五', '六'
    ],
    dayOfWeek: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  },
  'zh-CN': { //Simplified Chinese (简体中文)
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    dayOfWeekShort: [
      '日', '一', '二', '三', '四', '五', '六'
    ],
    dayOfWeek: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    postsMonthTip: '查看yyyy年MM月的文章',
    titleFormat: 'yyyy年MM月'
  },
  he: { //Hebrew (עברית)
    months: [
      'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
    ],
    dayOfWeekShort: [
      'א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'
    ],
    dayOfWeek: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת', 'ראשון']
  },
  hy: { // Armenian
    months: [
      'Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր'
    ],
    dayOfWeekShort: [
      'Կի', 'Երկ', 'Երք', 'Չոր', 'Հնգ', 'Ուրբ', 'Շբթ'
    ],
    dayOfWeek: ['Կիրակի', 'Երկուշաբթի', 'Երեքշաբթի', 'Չորեքշաբթի', 'Հինգշաբթի', 'Ուրբաթ', 'Շաբաթ']
  },
  kg: { // Kyrgyz
    months: [
      'Үчтүн айы', 'Бирдин айы', 'Жалган Куран', 'Чын Куран', 'Бугу', 'Кулжа', 'Теке', 'Баш Оона', 'Аяк Оона', 'Тогуздун айы', 'Жетинин айы', 'Бештин айы'
    ],
    dayOfWeekShort: [
      'Жек', 'Дүй', 'Шей', 'Шар', 'Бей', 'Жум', 'Ише'
    ],
    dayOfWeek: [
      'Жекшемб', 'Дүйшөмб', 'Шейшемб', 'Шаршемб', 'Бейшемби', 'Жума', 'Ишенб'
    ]
  },
  rm: { // Romansh
    months: [
      'Schaner', 'Favrer', 'Mars', 'Avrigl', 'Matg', 'Zercladur', 'Fanadur', 'Avust', 'Settember', 'October', 'November', 'December'
    ],
    dayOfWeekShort: [
      'Du', 'Gli', 'Ma', 'Me', 'Gie', 'Ve', 'So'
    ],
    dayOfWeek: [
      'Dumengia', 'Glindesdi', 'Mardi', 'Mesemna', 'Gievgia', 'Venderdi', 'Sonda'
    ]
  },
  ka: { // Georgian
    months: [
      'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
    ],
    dayOfWeekShort: [
      'კვ', 'ორშ', 'სამშ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'
    ],
    dayOfWeek: ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი']
  },
};

// Clock JS
var mykey = {
  weather: 'efc89c3ffc8066e43ec72767c8d15d79' //改為你從OpenWeather獲取的API密鑰
};
var locationurl = 'https://extreme-ip-lookup.com/json/';
var cityname = '';
var weatherurl = '';
var userip = '';
var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

fetch(locationurl)
  .then(data => data.json())
  .then(data => {
    //console.log(data);
    cityname = data.city;
    if (typeof data.city == "undefined") {
      cityname = data.region;
    };
    if (typeof data.region == "undefined") {
      cityname = data.country;
    };
    userip = data.query;
    weatherurl = 'https://api.openweathermap.org/data/2.5/weather/?q=' + cityname + '&units=metric&appid=' + mykey.weather;
    getweatherdata();
  })
  .catch(function(error) {
    console.log(error);
  });

function getweatherdata() {
  fetch(weatherurl)
    .then(data => data.json())
    .then(data => {
      //console.log(data);
      clock.weatherimg = 'https://cdn.jsdelivr.net/gh/tszhong0411/image/' + data.weather[0].icon + '.png';
      clock.temperature = data.main.temp + "*C";
      clock.humidity = data.main.humidity + "%";
      clock.ip = userip;
      clock.humidityimg = 'https://cdn.jsdelivr.net/gh/tszhong0411/image/hu.png';
      clock.city = data.name;
      var timerID = setInterval(updateTime, 1000);
      updateTime();
      clock.clockshow = true;

      function updateTime() {
        var cd = new Date();
        clock.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
        clock.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth() + 1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
        var hamorpm = cd.getHours();
        var str;
        if (hamorpm > 12) {
          hamorpm -= 12;
          str = " PM";
        } else {
          str = " AM";
        }
        clock.daylight = str
      };

      function zeroPadding(num, digit) {
        var zero = '';
        for (var i = 0; i < digit; i++) {
          zero += '0';
        }
        return (zero + num).slice(-digit);
      };
      updateTime();
    })
    .catch(function(error) {
      console.log(error);
    });
};
var clock = new Vue({
  el: '#clock',
  data: {
    ip: '',
    time: '',
    weatherimg: '',
    temperature: '',
    humidityimg: '',
    humidity: '',
    usaqi: '',
    city: '',
    date: '',
    daylight: '',
    clockshow: 'false'
  },
});