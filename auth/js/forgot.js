var msg_sended_email = '<div class="msg-success"><p>成功。檢查您的電子郵箱以獲取更多說明。</p><p><a href="/auth/">登入</a><br><a href="/">Blog</a></p></div>'

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
            if (error.code == "auth/user-not-found") {
                msg.append('<div class="msg-error"><p>' + '沒有與此電子郵箱對應的用戶記錄，該用戶可能已被刪除。' + '</p></p></div>');
            } else {
                msg.append('<div class="msg-error"><p>' + error.message + '</p></p></div>');
            }
        });

        
    })


})