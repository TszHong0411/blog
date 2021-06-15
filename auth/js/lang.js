function changeLan() {
    $("#setting_lan_en_us").on("click", function () {
        $("html").removeClass("lan-zh");
        localStorage['lan'] = "en-US";
        location.reload();
    });
      $("#setting_lan_zh_tw").on("click", function () {
        $("html").addClass("lan-zh");
        localStorage['lan'] = "zh-TW";
        location.reload();
    });
    if (localStorage['lan'] == "zh-TW") {
        $("html").addClass("lan-zh");
    } else if (localStorage['lan'] == "en-US") {
        $("html").removeClass("lan-zh");
    };
};
changeLan();

function lanEn() {
    lang = {
        Management_T: "Management",
        Settings_T: "Settings",
        Settings_T_2: "Settings",
        Go_Blog_T: "Go Blog",
        Logout_T: "Logout",
        Change_Email_T: "Change Email",
        Reset_Password_T: "Reset Password",
        Profile_T: "Profile",
        Username_T: "Username",
        Upload_Avatar_T: "Upload Avatar",
        Upload_T: "Upload",
        Upload_Avatar_hint_T: "Image (png / jpeg) should smaller than 1MB. A 1:1 (square) image with a size of at least 150 pixels is best.",
        Website_T: "Website",
        Website_hint_T: "This your website url, It must be start with http or https.",
        Words_limit_T: "Words Limit: <span id=\"userBioLimit\">0</span> / 100",
        Update_My_Profile_T: "Update my profile",
        Delete_My_Account_T: "Delete my account",
        t_o_darkmode: "Darkmode",
        t_o_font: "Font",
        t_o_filters: "Filters",
        t_o_filters_off: "OFF",
        t_o_filters_sunset: "SUN",
        t_o_filters_darkness: "DARK",
        t_o_filters_grayscale: "GRAY",
        t_o_lan: "Language",
        setting_lan_zh_tw: "中文",
        setting_lan_en_us: "English",
        
    };
    $('#show_settings').attr("data-st-tooltip", "Settings");
    $('#darkmode_toggle').attr("data-darkmode-tooltip", "Darkmode");
    $('#btn_toggle_sides').attr("data-ml-tooltip", "Move To Left Side");
    $('#btn_toggle_sides').attr("data-mr-tooltip", "Move To Right Side");
    $('#t_o_darkmode').html(lang.t_o_darkmode);
    $('#t_o_font').html(lang.t_o_font);
    $('#t_o_filters').html(lang.t_o_filters);
    $('#setting_filter_off').html(lang.t_o_filters_off);
    $('#setting_filter_sunset').html(lang.t_o_filters_sunset);
    $('#setting_filter_darkness').html(lang.t_o_filters_darkness);
    $('#setting_filter_grayscale').html(lang.t_o_filters_grayscale);
    $('#t_o_lan').html(lang.t_o_lan);
    $('#setting_lan_zh_tw').html(lang.setting_lan_zh_tw);
    $('#setting_lan_en_us').html(lang.setting_lan_en_us);
    $('#Management_T').html(lang.Management_T);
    $('#Settings_T').html(lang.Settings_T);
    $('#Go_Blog_T').html(lang.Go_Blog_T);
    $('#Settings_T_2').html(lang.Settings_T_2)
    $('#Profile_T').html(lang.Profile_T);
    $('#Username_T').html(lang.Username_T)
    $('#Upload_Avatar_T').html(lang.Upload_Avatar_T)
    $('#Upload_Avatar_hint_T').html(lang.Upload_Avatar_hint_T)
    $('#Website_T').html(lang.Website_T)
    $('#Website_hint_T').html(lang.Website_hint_T)
    $('#Words_limit_T').html(lang.Words_limit_T)
    $('#Update_My_Profile_T').html(lang.Update_My_Profile_T)
    $('#Delete_My_Account_T').html(lang.Delete_My_Account_T)
    $('#logout').html(lang.Logout_T)
    $('#cEmail').html(lang.Change_Email_T)
    $('#cPassword').html(lang.Reset_Password_T)
    $('#avatarAccept').html(lang.Upload_T)
    
};

function lanZh() {
    lang = {
        Management_T: "管理",
        Settings_T: "設定",        
        Settings_T_2: "設定",
        Go_Blog_T: "回到 Blog",
        Logout_T: "登出",
        Change_Email_T: "更改 Email",
        Reset_Password_T: "更改密碼",
        Profile_T: "個人資料",
        Username_T: "暱稱",
        Upload_Avatar_T: "上傳頭像",
        Upload_T: "上傳",
        Upload_Avatar_hint_T: "圖像文件（png 或 jpeg）應小於 1MB。最好是尺寸至少為 150 像素的 1:1 (正方形) 圖像。",
        Website_T: "個人主頁地址",
        Website_hint_T: "此使用者的個人主頁地址, 請用 http 或 https 開頭。",
        Words_limit_T: "字數上限: <span id=\"userBioLimit\">0</span> / 100",
        Update_My_Profile_T: "更新我的檔案",
        Delete_My_Account_T: "刪除我的帳戶",
        t_o_darkmode: "黑暗模式",
        t_o_font: "字體",
        t_o_filters: "濾鏡",
        t_o_filters_off: "關閉",
        t_o_filters_sunset: "日落",
        t_o_filters_darkness: "暗化",
        t_o_filters_grayscale: "灰度",
        t_o_lan: "語言",
        setting_lan_zh_tw: "中文",
        setting_lan_en_us: "English",
    };
    $('#show_menu').attr("data-sm-tooltip", "菜單");
    $('#show_settings').attr("data-st-tooltip", "設置");
    $('#darkmode_toggle').attr("data-darkmode-tooltip", "黑暗模式");
    $('#btn_toggle_sides').attr("data-ml-tooltip", "移到左側");
    $('#btn_toggle_sides').attr("data-mr-tooltip", "移到右側");
    $('#t_o_darkmode').html(lang.t_o_darkmode);
    $('#t_o_font').html(lang.t_o_font);
    $('#t_o_filters').html(lang.t_o_filters);
    $('#setting_filter_off').html(lang.t_o_filters_off);
    $('#setting_filter_sunset').html(lang.t_o_filters_sunset);
    $('#setting_filter_darkness').html(lang.t_o_filters_darkness);
    $('#setting_filter_grayscale').html(lang.t_o_filters_grayscale);
    $('#t_o_lan').html(lang.t_o_lan);
    $('#setting_lan_zh_tw').html(lang.setting_lan_zh_tw);
    $('#setting_lan_en_us').html(lang.setting_lan_en_us);
    $('#Management_T').html(lang.Management_T);
    $('#Settings_T').html(lang.Settings_T);
    $('#Go_Blog_T').html(lang.Go_Blog_T);
    $('#Settings_T_2').html(lang.Settings_T_2)
    $('#Profile_T').html(lang.Profile_T);
    $('#Username_T').html(lang.Username_T)
    $('#Upload_Avatar_T').html(lang.Upload_Avatar_T)
    $('#Upload_Avatar_hint_T').html(lang.Upload_Avatar_hint_T)
    $('#Website_T').html(lang.Website_T)
    $('#Website_hint_T').html(lang.Website_hint_T)
    $('#Words_limit_T').html(lang.Words_limit_T)
    $('#Update_My_Profile_T').html(lang.Update_My_Profile_T)
    $('#Delete_My_Account_T').html(lang.Delete_My_Account_T)
    $('#logout').html(lang.Logout_T)
    $('#cEmail').html(lang.Change_Email_T)
    $('#cPassword').html(lang.Reset_Password_T)
    $('#avatarAccept').html(lang.Upload_T)
};

function lanInit() {
    if (localStorage.getItem("lan") == undefined) {
        $('html').attr("lang","en-US");
        lanEn();
    };
    if (localStorage.getItem("lan") == "en-US") {
        $('html').attr("lang","en-US");
        lanEn();
    }
    if (localStorage.getItem("lan") == "zh-TW") {
        $('html').attr("lang","zh-TW");
        lanZh();
    }
};
lanInit();
