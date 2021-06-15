// Firebase init
var firebaseConfig = {
	apiKey: "AIzaSyDMTyHZ59iT6TvVoq034GOypvEbURBY5os",
	authDomain: "auth-development-57e87.firebaseapp.com",
	databaseURL: "https://auth-development-57e87.firebaseio.com",
	projectId: "auth-development-57e87",
	storageBucket: "auth-development-57e87.appspot.com",
	messagingSenderId: "61606094643",
	appId: "1:61606094643:web:a2c78f80f55147248a8046"
};

firebase.initializeApp(firebaseConfig);


// make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();
const user = firebase.auth().currentUser;

// Main
$(function () {

	$("input[type='password'][data-eye]").each(function (i) {
		var $this = $(this),
			id = 'eye-password-' + i,
			el = $('#' + id);

		$this.wrap($("<div/>", {
			style: 'position:relative',
			id: id
		}));

		$this.css({
			paddingRight: 60
		});
		$this.after($("<div/>", {
			html: 'Show',
			class: 'btn btn-primary btn-sm',
			id: 'passeye-toggle-' + i,
		}).css({
			position: 'absolute',
			right: 10,
			top: ($this.outerHeight() / 2) - 12,
			padding: '2px 7px',
			fontSize: 12,
			cursor: 'pointer',
		}));

		$this.after($("<input/>", {
			type: 'hidden',
			id: 'passeye-' + i
		}));

		var invalid_feedback = $this.parent().parent().find('.invalid-feedback');

		if (invalid_feedback.length) {
			$this.after(invalid_feedback.clone());
		}

		$this.on("keyup paste", function () {
			$("#passeye-" + i).val($(this).val());
		});
		$("#passeye-toggle-" + i).on("click", function () {
			if ($this.hasClass("show")) {
				$this.attr('type', 'password');
				$this.removeClass("show");
				$(this).removeClass("btn-outline-primary");
			} else {
				$this.attr('type', 'text');
				$this.val($("#passeye-" + i).val());
				$this.addClass("show");
				$(this).addClass("btn-outline-primary");
			}
		});
	});

	$(".my-login-validation").submit(function () {
		var form = $(this);
		if (form[0].checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		form.addClass('was-validated');
	});
});

// Const
const msg = $('#msg');
var msg_success_t = '<div class="msg-success"><p>已成功創建帳戶</p></div>'

// SignUp
const signupForm = document.querySelector('#signup-form')
if (document.querySelector('#signup-form')) {
	signupForm.addEventListener('submit', (e) => {
		e.preventDefault();

		// Get user info
		const email = signupForm['signup-email'].value;
		const password = signupForm['signup-password'].value;
		// Sign up the user
		auth.createUserWithEmailAndPassword(email, password).then(cred => {
			msg.css("display", "block")
			if ($('.msg-error')) {
				$('.msg-error').remove()
			}
			if ($('.msg-success')) {
				$('.msg-success').remove()
			}
			msg.append(msg_success_t);
			db.doc('users/' + auth.currentUser.uid).set({
				email: email
			})
		}).catch(error => {
			msg.	css("display", "block")
			if ($('.msg-error')) {
				$('.msg-error').remove()
			}
			if ($('.msg-success')) {
				$('.msg-success').remove()
			}
			if (error.code == "auth/weak-password") {
				msg.append('<div class="msg-error"><p>' + "密碼需要最少6個字元。" + '</p></p></div>');
			} else if (error.code == "auth/email-already-in-use") {
				msg.append('<div class="msg-error"><p>' + "該電子郵件地址已被另一個帳戶使用。" + '</p></p></div>');
			} else if (error.code == "auth/invalid-email") {
				msg.append('<div class="msg-error"><p>' + "電子郵箱無效。" + '</p></p></div>');
			} else {
				msg.append('<div class="msg-error"><p>' + error.message + '</p></p></div>');
			}
		})
	});
}


// Logout
const logout = $('#logout');
logout.on('click', (e) => {
	e.preventDefault();
	auth.signOut().then(() => {
		window.location.replace('/auth/index.html')
	}).catch(error => {
		msg.css("display", "block")
		if ($('.msg-error')) {
			$('.msg-error').remove()
		}
		if ($('.msg-success')) {
			$('.msg-success').remove()
		}
		msg.append('<div class="msg-error"><p>' + error.message + '</p></p></div>');
	})
});

// login
const loginForm = document.querySelector('#login-form');
if (document.querySelector('#login-form')) {
	loginForm.addEventListener('submit', (e) => {
		e.preventDefault();

		// Get usre info
		const email = loginForm['login-email'].value
		const password = loginForm['login-password'].value

		auth.signInWithEmailAndPassword(email, password).then(cred => {
			window.location.replace('/')
		}).catch(error => {
			msg.css("display", "block")
			if ($('.msg-error')) {
				$('.msg-error').remove()
			}
			if ($('.msg-success')) {
				$('.msg-success').remove()
			}
			if (error.code == "auth/wrong-password") {
				msg.append('<div class="msg-error"><p>' + '密碼不正確。' + '</p></p></div>');
			} else if (error.code == "auth/user-not-found") {
				msg.append('<div class="msg-error"><p>' + '用戶不存在。' + '</p></p></div>');
			} else {
				msg.append('<div class="msg-error"><p>' + error.message + '</p></p></div>');
			}

		})
	}) // msg.append('<div class="msg-error"><p>' + error.message + '</p></p></div>');
}

// Copyright Year
copyrightYear = new Date().getFullYear()
if ($('#fullYear')) {
	$('#fullYear').html(copyrightYear)
}

// Float
  
  // Main Darkmode
  function setDarkmode(enable) {
	if (enable == true) {
	  $("html").addClass("darkmode");
	} else {
	  $("html").removeClass("darkmode");
	}
  }
  
  function toggleDarkmode() {
	if ($('html').hasClass("darkmode")) {
	  setDarkmode(false);
	  localStorage.setItem("darkmode", "false");
	  if (localStorage.getItem("lan") == undefined) {
		Snackbar.show({
		  text: 'Light Mode Activated Manually.',
		  showAction: false,
		  pos: 'top-right',
		  backgroundColor: '#fff',
		  textColor: '#FF4040'
		});
	  };
	  if (localStorage.getItem("lan") == "en-US") {
		Snackbar.show({
		  text: 'Light Mode Activated Manually.',
		  showAction: false,
		  pos: 'top-right',
		  backgroundColor: '#fff',
		  textColor: '#FF4040'
		});
	  }
	  if (localStorage.getItem("lan") == "zh-TW") {
		Snackbar.show({
		  text: '你已切換到明亮模式。',
		  showAction: false,
		  pos: 'top-right',
		  backgroundColor: '#fff',
		  textColor: '#FF4040'
		});
	  }
	  
	} else {
	  setDarkmode(true);
	  localStorage.setItem("darkmode", "true")
	  if (localStorage.getItem("lan") == undefined) {
		Snackbar.show({
		  text: 'Dark Mode Activated Manually.',
		  showAction: false,
		  pos: 'top-right',
		  backgroundColor: '#353535'
		});
	  };
	  if (localStorage.getItem("lan") == "en-US") {
		Snackbar.show({
		  text: 'Dark Mode Activated Manually.',
		  showAction: false,
		  pos: 'top-right',
		  backgroundColor: '#353535'
	  });
	  }
	  if (localStorage.getItem("lan") == "zh-TW") {
		Snackbar.show({
		  text: '你已切換到黑暗模式。',
		  showAction: false,
		  pos: 'top-right',
		  backgroundColor: '#353535'
	  });
	  }
	}
  }
  if (localStorage.getItem("darkmode") == "true") {
	setDarkmode(true);
  }
  
  // 設置視窗
  function settingsPopup() {
	let settingsBtn = $('#show_settings');
	let settingsPopup = $('#settings_popup');
	let settingsClose = $('#close_settings_popup');
  
	// Open settings
	settingsBtn.bind('click', function () {
	  if (settingsPopup.hasClass('settings_popup_open')) {
		$('#tooltipS').remove();
		settingsPopup.removeClass('settings_popup_open');
	  } else {
		settingsPopup.addClass('settings_popup_open');
		$('head').append('<style id="tooltipS">#reading_progress:hover::before{display:none!important}</style>');
	  };
	});
  
	// Close settings
	settingsClose.bind('click', function () {
	  settingsPopup.removeClass('settings_popup_open')
	  $('#tooltipS').remove();
	});
  
  
	// Darkmode Toggle 1
	$('#settings_darkmode_switch').bind('click', function () {
	  toggleDarkmode();
	})
  
	// Darkmode Toggle 2
	$('#darkmode_toggle').bind('click', function() {
	  toggleDarkmode();
	});
  
	// Font
	$("#setting_font_sans_serif").on("click", function () {
	  $("html").removeClass("use-serif");
	  localStorage['Use_Serif'] = "false";
	});
	$("#setting_font_serif").on("click", function () {
	  $("html").addClass("use-serif");
	  localStorage['Use_Serif'] = "true";
	});
	if (localStorage['Use_Serif'] == "true") {
	  $("html").addClass("use-serif");
	} else if (localStorage['Use_Serif'] == "false") {
	  $("html").removeClass("use-serif");
	}
  };
  settingsPopup();

  // Float Settings location
let float_btn = $('#float_btn')
if (localStorage['Floating_Status'] == "left") {
  float_btn.addClass("float-left");
}
$('#btn_toggle_sides').on("click" , function(){
  float_btn.addClass("float-unloaded");
  setTimeout(function(){
    float_btn.toggleClass("float-left");
    if (float_btn.hasClass("float-left")){
      localStorage['Floating_Status'] = "left";
    }else{
      localStorage['Floating_Status'] = "right";
    }
    float_btn.removeClass("float-unloaded");
  } , 300);
});

// Filter
function setBlogFilter(name){
  if (name == undefined || name == ""){
    name = "off";
  }
  if (!$("html").hasClass("filter-" + name)){
    $("html").removeClass("filter-sunset filter-darkness filter-grayscale");
    if (name != "off"){
      $("html").addClass("filter-" + name);
    }
  }
  $("#setting_filters .setting-filter-btn").removeClass("active");
  $("#setting_filters .setting-filter-btn[filter-name='" + name + "']").addClass("active");
  localStorage['Filter'] = name;
}
setBlogFilter(localStorage['Filter']);
$(".setting-filter-btn").on("click" , function(){
  setBlogFilter(this.getAttribute("filter-name"));
});