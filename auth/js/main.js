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
$(function() {

	$("input[type='password'][data-eye]").each(function(i) {
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
			id: 'passeye-toggle-'+i,
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

		if(invalid_feedback.length) {
			$this.after(invalid_feedback.clone());
		}

		$this.on("keyup paste", function() {
			$("#passeye-"+i).val($(this).val());
		});
		$("#passeye-toggle-"+i).on("click", function() {
			if($this.hasClass("show")) {
				$this.attr('type', 'password');
				$this.removeClass("show");
				$(this).removeClass("btn-outline-primary");
			}else{
				$this.attr('type', 'text');
				$this.val($("#passeye-"+i).val());				
				$this.addClass("show");
				$(this).addClass("btn-outline-primary");
			}
		});
	});

	$(".my-login-validation").submit(function() {
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
var msg_success_t = '<div class="msg-success"><p>Successfully created an account</p></div>'

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
            msg.append('<div class="msg-error"><p>' + error.message + '</p></p></div>');
        })
	})
}

// Copyright Year
copyrightYear = new Date().getFullYear()
if ($('#fullYear')) {
	$('#fullYear').html(copyrightYear)
}















