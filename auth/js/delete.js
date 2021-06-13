var msg_delete_account = '<div class="msg-success"><p>Successfully delete account.</p><p><a href="/auth/index.html">Go Login</a></p></div>'

$('#delete-form').on('submit', (e) => {

    e.preventDefault();

    auth.onAuthStateChanged(user => {
        var email = user.email
        var password = $('#current-password').val()
        var credential = firebase.auth.EmailAuthProvider.credential(email, password)

        user.reauthenticateWithCredential(credential).then(function () {
            user.delete().then(function () {
                msg.css("display", "block")
                if ($('.msg-error')) {
                    $('.msg-error').remove()
                }
                if ($('.msg-success')) {
                    $('.msg-success').remove()
                }
                msg.append(msg_delete_account);
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