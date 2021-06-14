var msg_reset_password = '<div class="msg-success"><p>成功重置密碼。</p><p><a href="/dashboard/">Dashboard</a><br><a href="/">Blog</a></p></div>'

$('#reset-password-form').on('submit', (e) => {

    e.preventDefault();

    auth.onAuthStateChanged(user => {
        var email = user.email
        var password = $('#current-password').val()
        var newPassword = $('#new-password').val()
        var credential = firebase.auth.EmailAuthProvider.credential(email, password)

        user.reauthenticateWithCredential(credential).then(function () {
            user.updatePassword(newPassword).then(function () {
                msg.css("display", "block")
                if ($('.msg-error')) {
                    $('.msg-error').remove()
                }
                if ($('.msg-success')) {
                    $('.msg-success').remove()
                }
                msg.append(msg_reset_password);
            }).catch(error => {
                msg.css("display", "block")
                if ($('.msg-error')) {
                    $('.msg-error').remove()
                }
                if ($('.msg-success')) {
                    $('.msg-success').remove()
                }
                msg.append('<div class="msg-error"><p>' + error.message + '</p></p></div>');
            });
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
			} else {
                msg.append('<div class="msg-error"><p>' + error.message + '</p></p></div>');
            }
        })
    })


})