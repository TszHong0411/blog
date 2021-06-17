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
        Profile_Nav_T: "Profile",
        Settings_T: "Settings",
        Settings_T_2: "Settings",
        Logout_T: "Logout",
        Change_Email_T: "Change Email",
        Reset_Password_T: "Reset Password",
        Profile_T: "Profile",
        Display_Name_T: "Display Name",
        Username_T: "Username",
        Upload_Avatar_T: "Profile Picture",
        Upload_T: "Upload",
        Upload_Avatar_hint_T: "Image (png / jpeg) should smaller than 1MB. A 1:1 (square) image with a size of at least 150 pixels is best.",
        Website_T: "Website",
        Website_hint_T: "This your website url, It must be start with http or https.",
        Update_My_Profile_T: "Update my profile",
        Delete_My_Account_T: "Delete my account",
        t_o_font: "Font",
        t_o_filters: "Filters",
        t_o_filters_off: "OFF",
        t_o_filters_sunset: "SUN",
        t_o_filters_darkness: "DARK",
        t_o_filters_grayscale: "GRAY",
        t_o_lan: "Language",
        setting_lan_zh_tw: "中文",
        setting_lan_en_us: "English",
        Username_hint_T: "Minimum 3 and maximum 20 characters long. Alphabets, numbers and underscore(_) allowed. Case-insensitive.<br>Note: Once set, username cannot be changed.",
        Username_submit_btn_T: "Set Username",
        Github_T: "Github username",
        Twitter_T: "Twitter username",
        Instagram_T: "Instagram username", 
        Facebook_T: "Facebook username",
        What_Do_You_Do_T: "What do you do?",
        
    };
    $('#show_settings').attr("data-st-tooltip", "Settings");
    $('#btn_toggle_sides').attr("data-ml-tooltip", "Move To Left Side");
    $('#btn_toggle_sides').attr("data-mr-tooltip", "Move To Right Side");
    $('#t_o_font').html(lang.t_o_font);
    $('#t_o_filters').html(lang.t_o_filters);
    $('#setting_filter_off').html(lang.t_o_filters_off);
    $('#setting_filter_sunset').html(lang.t_o_filters_sunset);
    $('#setting_filter_darkness').html(lang.t_o_filters_darkness);
    $('#setting_filter_grayscale').html(lang.t_o_filters_grayscale);
    $('#t_o_lan').html(lang.t_o_lan);
    $('#setting_lan_zh_tw').html(lang.setting_lan_zh_tw);
    $('#setting_lan_en_us').html(lang.setting_lan_en_us);
    $('#profile-url').html(lang.Profile_Nav_T);
    $('#Settings_T').html(lang.Settings_T);
    $('#Settings_T_2').html(lang.Settings_T_2)
    $('#Profile_T').html(lang.Profile_T);
    $('#Display_Name_T').html(lang.Display_Name_T)
    $('#Username_T').html(lang.Username_T)
    $('#Upload_Avatar_T').html(lang.Upload_Avatar_T)
    $('#Upload_Avatar_hint_T').html(lang.Upload_Avatar_hint_T)
    $('#Website_T').html(lang.Website_T)
    $('#Website_hint_T').html(lang.Website_hint_T)
    $('#Update_My_Profile_T').html(lang.Update_My_Profile_T)
    $('#Delete_My_Account_T').html(lang.Delete_My_Account_T)
    $('#nav-logout').html(lang.Logout_T)
    $('#cEmail').html(lang.Change_Email_T)
    $('#cPassword').html(lang.Reset_Password_T)
    $('#avatarAccept').html(lang.Upload_T)
    $('#Username_hint_T').html(lang.Username_hint_T)
    $('#username-submit-btn').html(lang.Username_submit_btn_T)
    $('#Github_T').html(lang.Github_T)
    $('#Twitter_T').html(lang.Twitter_T)
    $('#Instagram_T').html(lang.Instagram_T)
    $('#Facebook_T').html(lang.Facebook_T)
    $('#What_Do_You_Do_T').html(lang.What_Do_You_Do_T)

};

function lanZh() {
    lang = {
        Profile_Nav_T: "個人資料",
        Settings_T: "設定",        
        Settings_T_2: "設定",
        Logout_T: "登出",
        Change_Email_T: "更改 Email",
        Reset_Password_T: "更改密碼",
        Profile_T: "個人資料",
        Display_Name_T: "顯示名稱",
        Username_T: "用戶名",
        Upload_Avatar_T: "上傳頭像",
        Upload_T: "上傳",
        Upload_Avatar_hint_T: "圖像文件（png 或 jpeg）應小於 1MB。最好是尺寸至少為 150 像素的 1:1 (正方形) 圖像。",
        Website_T: "個人主頁地址",
        Website_hint_T: "此使用者的個人主頁地址, 請用 http 或 https 開頭。",
        Update_My_Profile_T: "更新我的檔案",
        Delete_My_Account_T: "刪除我的帳戶",
        t_o_font: "字體",
        t_o_filters: "濾鏡",
        t_o_filters_off: "關閉",
        t_o_filters_sunset: "日落",
        t_o_filters_darkness: "暗化",
        t_o_filters_grayscale: "灰度",
        t_o_lan: "語言",
        setting_lan_zh_tw: "中文",
        setting_lan_en_us: "English",
        Username_hint_T: "最少 3 個字符，最多 20 個字符。允許使用字母、數字和下劃線 (_)。不區分大小寫。<br>注意：一旦設置，用戶名就不能更改。",
        Username_submit_btn_T: "確定",
        Github_T: "Github 用戶名",
        Twitter_T: "Twitter 用戶名",
        Instagram_T: "Instagram 用戶名", 
        What_Do_You_Do_T: "你做什麼工作?",
    };
    $('#show_menu').attr("data-sm-tooltip", "菜單");
    $('#show_settings').attr("data-st-tooltip", "設置");
    $('#btn_toggle_sides').attr("data-ml-tooltip", "移到左側");
    $('#btn_toggle_sides').attr("data-mr-tooltip", "移到右側");
    $('#t_o_font').html(lang.t_o_font);
    $('#t_o_filters').html(lang.t_o_filters);
    $('#setting_filter_off').html(lang.t_o_filters_off);
    $('#setting_filter_sunset').html(lang.t_o_filters_sunset);
    $('#setting_filter_darkness').html(lang.t_o_filters_darkness);
    $('#setting_filter_grayscale').html(lang.t_o_filters_grayscale);
    $('#t_o_lan').html(lang.t_o_lfan);
    $('#setting_lan_zh_tw').html(lang.setting_lan_zh_tw);
    $('#setting_lan_en_us').html(lang.setting_lan_en_us);
    $('#profile-url').html(lang.Profile_Nav_T);
    $('#Settings_T').html(lang.Settings_T);
    $('#Settings_T_2').html(lang.Settings_T_2)
    $('#Profile_T').html(lang.Profile_T);
    $('#Display_Name_T').html(lang.Display_Name_T)
    $('#Username_T').html(lang.Username_T)
    $('#Upload_Avatar_T').html(lang.Upload_Avatar_T)
    $('#Upload_Avatar_hint_T').html(lang.Upload_Avatar_hint_T)
    $('#Website_T').html(lang.Website_T)
    $('#Website_hint_T').html(lang.Website_hint_T)
    $('#Update_My_Profile_T').html(lang.Update_My_Profile_T)
    $('#Delete_My_Account_T').html(lang.Delete_My_Account_T)
    $('#nav-logout').html(lang.Logout_T)
    $('#cEmail').html(lang.Change_Email_T)
    $('#cPassword').html(lang.Reset_Password_T)
    $('#avatarAccept').html(lang.Upload_T)
    $('#Username_hint_T').html(lang.Username_hint_T)
    $('#username-submit-btn').html(lang.Username_submit_btn_T)
    $('#Github_T').html(lang.Github_T)
    $('#Twitter_T').html(lang.Twitter_T)
    $('#Instagram_T').html(lang.Instagram_T)
    $('#What_Do_You_Do_T').html(lang.What_Do_You_Do_T)

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

