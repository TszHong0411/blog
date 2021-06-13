var msg_sended_email = '<div class="msg-success"><p>Successfully. Check your inbox for further instructions</p><p><a href="/auth/">Go Login</a><br><a href="/">Go Blog</a></p></div>'

$('#forgot-form').on('submit', (e) => {
    e.preventDefault();
    auth.onAuthStateChanged(user => {
        var email = $('#user_email').val()


        auth.sendPasswordResetEmail(email).then(function () {
            msg.css("display", "block")
            if ($('.msg-error')) {
                $('.msg-error').remove()
            }
            if ($('.msg-success')) {
                $('.msg-success').remove()
            }
            msg.append(msg_sended_email);
        }).catch(function (error) {
            msg.css("display", "block")
            if ($('.msg-error')) {
                $('.msg-error').remove()
            }
			if ($('.msg-success')) {
                $('.msg-success').remove()
            }
            msg.append('<div class="msg-error"><p>' + error.message + '</p></p></div>');
        });

        
    })


})