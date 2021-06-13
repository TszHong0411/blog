var msg_change_email = '<div class="msg-success"><p>Successfully change email.</p><p><a href="/dashboard/">Go Dashboard</a><br><a href="/">Go Blog</a></p></div>'

$('#change-email-form').on('submit', (e) => {
    e.preventDefault();
    auth.onAuthStateChanged(user => {
        var email = user.email
        var password = $('#current-password').val()
        var newEmail = $('#new-email').val()
        var credential = firebase.auth.EmailAuthProvider.credential(email, password)

        user.reauthenticateWithCredential(credential).then(function () {
            user.updateEmail(newEmail).then(function () {
                msg.css("display", "block")
                if ($('.msg-error')) {
                    $('.msg-error').remove()
                }
                if ($('.msg-success')) {
                    $('.msg-success').remove()
                }
                msg.append(msg_change_email);
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
            msg.append('<div class="msg-error"><p>' + error.message + '</p></p></div>');
        })
    })


})