"use strict";console.log("%cTszHong's Blog","color:red;font-family:system-ui;font-size:50px;-webkit-text-stroke: 1px black;font-weight:bold");var st,OriginTitile=document.title;document.addEventListener("visibilitychange",function(){document.hidden?(document.title="(ꐦ ಠ皿ಠ ) 壞蛋去哪裡",clearTimeout(st)):(document.title="(≧▽≦) 回來了",st=setTimeout(function(){document.title=OriginTitile},3e3))}),function(w){function t(e,a,t){var r=new Date,n=r.getDate(),v=r.getMonth(),T=r.getFullYear(),D=n,J=v,A=T,j=t,o=null,i=null,F={posts:[],prev:null,next:null},t="en";(e=e)&&void 0!==calLanguages&&calLanguages[e]&&(t=e);var z=w.extend({},w.fn.aCalendar.defaults,void 0===calLanguages?{}:calLanguages[t],a);function P(){J<11?J++:(J=0,A++),d()}function L(){0<J?J--:(J=11,A--),d()}function N(e){e&&(A=e.getFullYear(),J=e.getMonth(),d())}function x(){z.single?null!=z.url&&""!=z.url&&(null===o&&w.ajax({url:z.url,async:!1,success:function(e){o=e,s(Object.keys(o))}}),null!==o&&u()&&(F.posts=o[A+"-"+(J+1)])):function(){null===i&&w.ajax({url:z.root+"list.json",async:!1,success:function(e){s(e)}});u()&&w.ajax({url:z.root+A+"-"+(J+1)+".json",async:!1,success:function(e){F.posts=e}})}()}function s(e){i=e.map(function(e){e=e.split("-");return new Date(Date.UTC(+e[0],+e[1]-1))})}function u(){var e=Date.UTC(A,J);if(null!==i&&0!==i.length&&(0!==F.posts.length||!(null===F.prev&&null!==F.next&&F.next.getTime()>e||null===F.next&&null!==F.prev&&F.prev.getTime()<e))){F.posts=[];for(var a=0;a<i.length;a++){var t=i[a].getTime();if(e===t)return F.prev=0===a?null:i[a-1],F.next=a===i.length-1?null:i[a+1],1;if(e<t){F.prev=0===a?null:i[a-1],F.next=i[a];break}F.prev=i[a],F.next=null}}}function C(e,a){var t,r={"LMM+":z.months[e.getMonth()],"MM+":e.getMonth()+1};for(t in/(y+)/.test(a)&&(a=a.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),r)new RegExp("("+t+")").test(a)&&(a=a.replace(RegExp.$1,"LMM+"===t?r[t]:("00"+r[t]).substr((""+r[t]).length)));return a}function d(){x();var e=new Date(A,J,1).getDay()-z.weekOffset;e<=0&&(e=6- -1*(e+1));var a=new Date(A,J+1,0).getDate(),t=new Date(A,J,0).getDate()-e+1,r=w("<div/>").addClass("cal-head"),n=w("<div/>"),o=w("<div/>"),i=w("<div/>").addClass("cal-title");o.html(z.headArrows.previous),n.html(z.headArrows.next),curDate=new Date(Date.UTC(A,J)),0===F.posts.length?i.html(C(curDate,z.titleFormat)):(cTitleLink=w("<a/>").attr("href",C(curDate,z.titleLinkFormat)).attr("title",C(curDate,z.postsMonthTip)).html(C(curDate,z.titleFormat)),i.html(cTitleLink)),o.on("click",L),n.on("click",P),r.append(o),r.append(i),r.append(n);for(var s=w("<table/>").addClass("cal"),u=z.weekOffset,d=w("<thead/>"),l=w("<tr/>"),m=0;m<7;m++){6<u&&(u=0);var h=w("<th/>").attr("scope","col").attr("title",z.dayOfWeek[u]);h.html(z.dayOfWeekShort[u]),l.append(h),u++}d.append(l),s.append(d);var k=w("<tfoot/>"),y=w("<tr/>"),o=w("<td/>").attr("colspan",3),i=w("<td/>").html("&nbsp;"),n=w("<td/>").attr("colspan",3);F.prev&&o.html(z.footArrows.previous+z.months[F.prev.getMonth()]).addClass("cal-foot").attr("title",C(F.prev,z.postsMonthTip)),F.next&&n.html(z.months[F.next.getMonth()]+z.footArrows.next).addClass("cal-foot").attr("title",C(F.next,z.postsMonthTip)),o.on("click",function(){N(F.prev)}),n.on("click",function(){N(F.next)}),y.append(o),y.append(i),y.append(n),k.append(y);for(var b=w("<tbody/>"),S=1,f=1,m=0;m<6;m++){for(var p=w("<tr/>"),g=0;g<7;g++){var O=w("<td/>");if(7*m+g<e)O.addClass("cal-gray"),O.html(t++);else if(S<=a){S==D&&v==J&&T==A&&O.addClass("cal-today");for(var c,M={num:0,keys:[]},W=0;W<F.posts.length;W++)new Date(Date.parse(F.posts[W].date)).getDate()==S&&(M.keys[M.num++]=W);0!==M.num?(c=M.keys[0],c=w("<a>").attr("href",F.posts[c].link).attr("title",F.posts[c].title).html(S++),O.append(c)):O.html(S++)}else O.addClass("cal-gray"),O.html(f++);p.append(O)}b.append(p)}s.append(d),s.append(k),s.append(b),w(j).html(r),w(j).append(s)}return"/"!==z.root[0]&&(z.root="/"+z.root),"/"!==z.root[z.root.length-1]&&(z.root+="/"),d()}w.fn.aCalendar=function(e,a){return this.each(function(){return t(e,a,w(this))})},w.fn.aCalendar.defaults={months:["January","February","March","April","May","June","July","August","September","October","November","December"],dayOfWeekShort:["S","M","T","W","T","F","S"],dayOfWeek:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],postsMonthTip:"Posts published in LMM yyyy",titleFormat:"yyyy LMM",titleLinkFormat:"/archives/yyyy/MM/",headArrows:{previous:'<span class="cal-prev"></span>',next:'<span class="cal-next"></span>'},footArrows:{previous:"« ",next:" »"},weekOffset:0,single:!0,root:"/calendar/",url:"/calendar.json"}}(jQuery),$(document).ready(function(){$("#calendar").aCalendar("zh-TW")});var calLanguages={ar:{months:["كانون الثاني","شباط","آذار","نيسان","مايو","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول"],dayOfWeekShort:["ن","ث","ع","خ","ج","س","ح"],dayOfWeek:["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت","الأحد"]},ro:{months:["Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie","Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie"],dayOfWeekShort:["Du","Lu","Ma","Mi","Jo","Vi","Sâ"],dayOfWeek:["Duminică","Luni","Marţi","Miercuri","Joi","Vineri","Sâmbătă"]},id:{months:["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],dayOfWeekShort:["Min","Sen","Sel","Rab","Kam","Jum","Sab"],dayOfWeek:["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"]},is:{months:["Janúar","Febrúar","Mars","Apríl","Maí","Júní","Júlí","Ágúst","September","Október","Nóvember","Desember"],dayOfWeekShort:["Sun","Mán","Þrið","Mið","Fim","Fös","Lau"],dayOfWeek:["Sunnudagur","Mánudagur","Þriðjudagur","Miðvikudagur","Fimmtudagur","Föstudagur","Laugardagur"]},bg:{months:["Януари","Февруари","Март","Април","Май","Юни","Юли","Август","Септември","Октомври","Ноември","Декември"],dayOfWeekShort:["Нд","Пн","Вт","Ср","Чт","Пт","Сб"],dayOfWeek:["Неделя","Понеделник","Вторник","Сряда","Четвъртък","Петък","Събота"]},fa:{months:["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"],dayOfWeekShort:["یکشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],dayOfWeek:["یک‌شنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنج‌شنبه","جمعه","شنبه","یک‌شنبه"]},ru:{months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],dayOfWeekShort:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],dayOfWeek:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"]},uk:{months:["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"],dayOfWeekShort:["Ндл","Пнд","Втр","Срд","Чтв","Птн","Сбт"],dayOfWeek:["Неділя","Понеділок","Вівторок","Середа","Четвер","П'ятниця","Субота"]},en:{months:["January","February","March","April","May","June","July","August","September","October","November","December"],dayOfWeekShort:["S","M","T","W","T","F","S"],dayOfWeek:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],postsMonthTip:"Posts published in LMM yyyy",titleFormat:"LMM yyyy"},el:{months:["Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μάιος","Ιούνιος","Ιούλιος","Αύγουστος","Σεπτέμβριος","Οκτώβριος","Νοέμβριος","Δεκέμβριος"],dayOfWeekShort:["Κυρ","Δευ","Τρι","Τετ","Πεμ","Παρ","Σαβ"],dayOfWeek:["Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο"]},de:{months:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],dayOfWeekShort:["So","Mo","Di","Mi","Do","Fr","Sa"],dayOfWeek:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"]},nl:{months:["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],dayOfWeekShort:["zo","ma","di","wo","do","vr","za"],dayOfWeek:["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"]},tr:{months:["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],dayOfWeekShort:["Paz","Pts","Sal","Çar","Per","Cum","Cts"],dayOfWeek:["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"]},fr:{months:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],dayOfWeekShort:["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],dayOfWeek:["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"]},es:{months:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],dayOfWeekShort:["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],dayOfWeek:["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]},th:{months:["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],dayOfWeekShort:["อา.","จ.","อ.","พ.","พฤ.","ศ.","ส."],dayOfWeek:["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัส","ศุกร์","เสาร์","อาทิตย์"]},pl:{months:["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień"],dayOfWeekShort:["nd","pn","wt","śr","cz","pt","sb"],dayOfWeek:["niedziela","poniedziałek","wtorek","środa","czwartek","piątek","sobota"]},pt:{months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],dayOfWeekShort:["Dom","Seg","Ter","Qua","Qui","Sex","Sab"],dayOfWeek:["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"]},ch:{months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],dayOfWeekShort:["日","一","二","三","四","五","六"]},se:{months:["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],dayOfWeekShort:["Sön","Mån","Tis","Ons","Tor","Fre","Lör"]},kr:{months:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayOfWeekShort:["일","월","화","수","목","금","토"],dayOfWeek:["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]},it:{months:["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],dayOfWeekShort:["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],dayOfWeek:["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"]},da:{months:["January","Februar","Marts","April","Maj","Juni","July","August","September","Oktober","November","December"],dayOfWeekShort:["Søn","Man","Tir","Ons","Tor","Fre","Lør"],dayOfWeek:["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"]},no:{months:["Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember"],dayOfWeekShort:["Søn","Man","Tir","Ons","Tor","Fre","Lør"],dayOfWeek:["Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag"]},ja:{months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],dayOfWeekShort:["日","月","火","水","木","金","土"],dayOfWeek:["日曜","月曜","火曜","水曜","木曜","金曜","土曜"]},vi:{months:["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"],dayOfWeekShort:["CN","T2","T3","T4","T5","T6","T7"],dayOfWeek:["Chủ nhật","Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy"]},sl:{months:["Januar","Februar","Marec","April","Maj","Junij","Julij","Avgust","September","Oktober","November","December"],dayOfWeekShort:["Ned","Pon","Tor","Sre","Čet","Pet","Sob"],dayOfWeek:["Nedelja","Ponedeljek","Torek","Sreda","Četrtek","Petek","Sobota"]},cs:{months:["Leden","Únor","Březen","Duben","Květen","Červen","Červenec","Srpen","Září","Říjen","Listopad","Prosinec"],dayOfWeekShort:["Ne","Po","Út","St","Čt","Pá","So"]},hu:{months:["Január","Február","Március","Április","Május","Június","Július","Augusztus","Szeptember","Október","November","December"],dayOfWeekShort:["Va","Hé","Ke","Sze","Cs","Pé","Szo"],dayOfWeek:["vasárnap","hétfő","kedd","szerda","csütörtök","péntek","szombat"]},az:{months:["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avqust","Sentyabr","Oktyabr","Noyabr","Dekabr"],dayOfWeekShort:["B","Be","Ça","Ç","Ca","C","Ş"],dayOfWeek:["Bazar","Bazar ertəsi","Çərşənbə axşamı","Çərşənbə","Cümə axşamı","Cümə","Şənbə"]},bs:{months:["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Oktobar","Novembar","Decembar"],dayOfWeekShort:["Ned","Pon","Uto","Sri","Čet","Pet","Sub"],dayOfWeek:["Nedjelja","Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak","Subota"]},ca:{months:["Gener","Febrer","Març","Abril","Maig","Juny","Juliol","Agost","Setembre","Octubre","Novembre","Desembre"],dayOfWeekShort:["Dg","Dl","Dt","Dc","Dj","Dv","Ds"],dayOfWeek:["Diumenge","Dilluns","Dimarts","Dimecres","Dijous","Divendres","Dissabte"]},"en-GB":{months:["January","February","March","April","May","June","July","August","September","October","November","December"],dayOfWeekShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayOfWeek:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},et:{months:["Jaanuar","Veebruar","Märts","Aprill","Mai","Juuni","Juuli","August","September","Oktoober","November","Detsember"],dayOfWeekShort:["P","E","T","K","N","R","L"],dayOfWeek:["Pühapäev","Esmaspäev","Teisipäev","Kolmapäev","Neljapäev","Reede","Laupäev"]},eu:{months:["Urtarrila","Otsaila","Martxoa","Apirila","Maiatza","Ekaina","Uztaila","Abuztua","Iraila","Urria","Azaroa","Abendua"],dayOfWeekShort:["Ig.","Al.","Ar.","Az.","Og.","Or.","La."],dayOfWeek:["Igandea","Astelehena","Asteartea","Asteazkena","Osteguna","Ostirala","Larunbata"]},fi:{months:["Tammikuu","Helmikuu","Maaliskuu","Huhtikuu","Toukokuu","Kesäkuu","Heinäkuu","Elokuu","Syyskuu","Lokakuu","Marraskuu","Joulukuu"],dayOfWeekShort:["Su","Ma","Ti","Ke","To","Pe","La"],dayOfWeek:["sunnuntai","maanantai","tiistai","keskiviikko","torstai","perjantai","lauantai"]},gl:{months:["Xan","Feb","Maz","Abr","Mai","Xun","Xul","Ago","Set","Out","Nov","Dec"],dayOfWeekShort:["Dom","Lun","Mar","Mer","Xov","Ven","Sab"],dayOfWeek:["Domingo","Luns","Martes","Mércores","Xoves","Venres","Sábado"]},hr:{months:["Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad","Studeni","Prosinac"],dayOfWeekShort:["Ned","Pon","Uto","Sri","Čet","Pet","Sub"],dayOfWeek:["Nedjelja","Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak","Subotagg"]},ko:{months:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayOfWeekShort:["일","월","화","수","목","금","토"],dayOfWeek:["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]},lt:{months:["Sausio","Vasario","Kovo","Balandžio","Gegužės","Birželio","Liepos","Rugpjūčio","Rugsėjo","Spalio","Lapkričio","Gruodžio"],dayOfWeekShort:["Sek","Pir","Ant","Tre","Ket","Pen","Šeš"],dayOfWeek:["Sekmadienis","Pirmadienis","Antradienis","Trečiadienis","Ketvirtadienis","Penktadienis","Šeštadienis"]},lv:{months:["Janvāris","Februāris","Marts","Aprīlis ","Maijs","Jūnijs","Jūlijs","Augusts","Septembris","Oktobris","Novembris","Decembris"],dayOfWeekShort:["Sv","Pr","Ot","Tr","Ct","Pk","St"],dayOfWeek:["Svētdiena","Pirmdiena","Otrdiena","Trešdiena","Ceturtdiena","Piektdiena","Sestdiena"]},mk:{months:["јануари","февруари","март","април","мај","јуни","јули","август","септември","октомври","ноември","декември"],dayOfWeekShort:["нед","пон","вто","сре","чет","пет","саб"],dayOfWeek:["Недела","Понеделник","Вторник","Среда","Четврток","Петок","Сабота"]},mn:{months:["1-р сар","2-р сар","3-р сар","4-р сар","5-р сар","6-р сар","7-р сар","8-р сар","9-р сар","10-р сар","11-р сар","12-р сар"],dayOfWeekShort:["Дав","Мяг","Лха","Пүр","Бсн","Бям","Ням"],dayOfWeek:["Даваа","Мягмар","Лхагва","Пүрэв","Баасан","Бямба","Ням"]},"pt-BR":{months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],dayOfWeekShort:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],dayOfWeek:["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"]},sk:{months:["Január","Február","Marec","Apríl","Máj","Jún","Júl","August","September","Október","November","December"],dayOfWeekShort:["Ne","Po","Ut","St","Št","Pi","So"],dayOfWeek:["Nedeľa","Pondelok","Utorok","Streda","Štvrtok","Piatok","Sobota"]},sq:{months:["Janar","Shkurt","Mars","Prill","Maj","Qershor","Korrik","Gusht","Shtator","Tetor","Nëntor","Dhjetor"],dayOfWeekShort:["Die","Hën","Mar","Mër","Enj","Pre","Shtu"],dayOfWeek:["E Diel","E Hënë","E Martē","E Mërkurë","E Enjte","E Premte","E Shtunë"]},"sr-YU":{months:["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Oktobar","Novembar","Decembar"],dayOfWeekShort:["Ned","Pon","Uto","Sre","čet","Pet","Sub"],dayOfWeek:["Nedelja","Ponedeljak","Utorak","Sreda","Četvrtak","Petak","Subota"]},sr:{months:["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар"],dayOfWeekShort:["нед","пон","уто","сре","чет","пет","суб"],dayOfWeek:["Недеља","Понедељак","Уторак","Среда","Четвртак","Петак","Субота"]},sv:{months:["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],dayOfWeekShort:["Sön","Mån","Tis","Ons","Tor","Fre","Lör"],dayOfWeek:["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"]},"zh-TW":{months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],dayOfWeekShort:["日","一","二","三","四","五","六"],dayOfWeek:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]},"zh-CN":{months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],dayOfWeekShort:["日","一","二","三","四","五","六"],dayOfWeek:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],postsMonthTip:"查看yyyy年MM月的文章",titleFormat:"yyyy年MM月"},he:{months:["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],dayOfWeekShort:["א'","ב'","ג'","ד'","ה'","ו'","שבת"],dayOfWeek:["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת","ראשון"]},hy:{months:["Հունվար","Փետրվար","Մարտ","Ապրիլ","Մայիս","Հունիս","Հուլիս","Օգոստոս","Սեպտեմբեր","Հոկտեմբեր","Նոյեմբեր","Դեկտեմբեր"],dayOfWeekShort:["Կի","Երկ","Երք","Չոր","Հնգ","Ուրբ","Շբթ"],dayOfWeek:["Կիրակի","Երկուշաբթի","Երեքշաբթի","Չորեքշաբթի","Հինգշաբթի","Ուրբաթ","Շաբաթ"]},kg:{months:["Үчтүн айы","Бирдин айы","Жалган Куран","Чын Куран","Бугу","Кулжа","Теке","Баш Оона","Аяк Оона","Тогуздун айы","Жетинин айы","Бештин айы"],dayOfWeekShort:["Жек","Дүй","Шей","Шар","Бей","Жум","Ише"],dayOfWeek:["Жекшемб","Дүйшөмб","Шейшемб","Шаршемб","Бейшемби","Жума","Ишенб"]},rm:{months:["Schaner","Favrer","Mars","Avrigl","Matg","Zercladur","Fanadur","Avust","Settember","October","November","December"],dayOfWeekShort:["Du","Gli","Ma","Me","Gie","Ve","So"],dayOfWeek:["Dumengia","Glindesdi","Mardi","Mesemna","Gievgia","Venderdi","Sonda"]},ka:{months:["იანვარი","თებერვალი","მარტი","აპრილი","მაისი","ივნისი","ივლისი","აგვისტო","სექტემბერი","ოქტომბერი","ნოემბერი","დეკემბერი"],dayOfWeekShort:["კვ","ორშ","სამშ","ოთხ","ხუთ","პარ","შაბ"],dayOfWeek:["კვირა","ორშაბათი","სამშაბათი","ოთხშაბათი","ხუთშაბათი","პარასკევი","შაბათი"]}};