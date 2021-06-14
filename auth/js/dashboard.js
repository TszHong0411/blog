// var
var userPersonalUrlInput = $('#userUrl')
var uploadBtn = $('#uploadBtn')
var uploadBox = $('#uploadBox')
var avatarUpload = $('#avatarUpload')
var avatarPreview = $('#avatarPreview')
var avatarPreviewCancel = $('#avatarPreviewCancel')
var avatarAccept = $('#avatarAccept')
var uploadedBtn = $('#uploadedBtn')
var userBio = $('#userBio')
var userBioLimit = $('#userBioLimit')

// Listen for auth status
auth.onAuthStateChanged(user => {
    // console.log(user)
    if (user) {
        $('#emailOfUser').html(user.email)
    }
    if (user.photoURL == null) {
        $('.profile-avatar').attr("src", "https://cdn.jsdelivr.net/gh/tszhong0411/image/auth/none.png")
    } else {
        $('.profile-avatar').attr("src", user.photoURL)
        $('#photoLink').attr("value", user.photoURL)
    }
    if (user.displayName !== null) {
        $('#screenName-0-1').attr("value", user.displayName)
        $('#username').html(user.displayName)
    }
})

// Update info
$('#update-form').on('submit', (e) => {
    e.preventDefault();

    // Save user personal url
    if (userBio.val().length <= 100) {
        db.doc('users/' + auth.currentUser.uid).set({
            url: userPersonalUrlInput.val(),
            email: auth.currentUser.email,
            bio: userBio.val()
        })


        // Update profile
        auth.currentUser.updateProfile({
            displayName: $('#screenName-0-1').val(),
            photoURL: $('#photoLink').val()

        }).then(function () {
            if ($('#msg_dash_t')) {
                $('#msg_dash_t').remove()
            }
            if ($('#msg_dash_t_error')) {
                $('#msg_dash_t_error').remove()
            }
            $('#msg_dash').append("<div id=\"msg_dash_t\">更新成功</div>")
            setTimeout(function () {
                location.reload()
            }, 1000);
        })
    } else {
        if ($('#msg_dash_t')) {
            $('#msg_dash_t').remove()
        }
        if ($('#msg_dash_t_error')) {
            $('#msg_dash_t_error').remove()
        }
        $('#msg_dash').append("<div id=\"msg_dash_t_error\">Bio 字數不能大於 100。</div>")
    }

})

// 如果用戶有 個人網址 或 Bio 就 innerHTML
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        db.collection("users").doc(user.uid).get().then((doc) => {
            if (doc.data().url != undefined) {
                $('#userUrl').val(doc.data().url)
            }
            if (doc.data().bio != undefined) {
                $('#userBio').val(doc.data().bio)
                // Limit display current length of bio
                userBioLimit.html(doc.data().bio.length)
            }
        });
    }
});

// Upload avatar function
uploadBtn.on('click', (e) => {
    uploadBox.toggle()
})

avatarUpload.on('change', (e) => {

    e.preventDefault();

    if (avatarUpload.val() == "") {
        avatarPreview.attr("style", "")
    }

    if (avatarUpload.val() !== "") {
        var file = avatarUpload.get(0).files[0],
            reader = new FileReader();

        // Preview
        reader.onload = function (event) {
            avatarPreview.css('background-image', 'url(' + event.target.result + ')');
        }
        reader.readAsDataURL(file);

    }



})

// Cancel
avatarPreviewCancel.on('click', (e) => {
    uploadBox.hide()
    avatarUpload.val("")
    avatarPreview.attr("style", "")
    if ($('.msg-success')) {
        $('.msg-success').remove()
    }
    if ($('.msg-error')) {
        $('.msg-error').remove()
    }
})


// Upload
avatarAccept.on('click', (e) => {


    if (avatarUpload.val() !== "") {
        if (avatarUpload.get(0).files[0].size <= 1024 * 1024) {
            var file = avatarUpload.get(0).files[0]
            const imageExtensionMatch = file.name.match(/\.(\w+)?$/)
            const imageExtension =
                imageExtensionMatch && imageExtensionMatch[1] !== 'jpg' ?
                imageExtensionMatch[1] :
                'jpeg'
            var fileName = file.name.replace(/.*\.(\w+)?$/, 'avatar.$1')
            var storageRefOfAvatar = firebase.storage().ref('user/' + auth.currentUser.uid + '/avatar/' + 'avatar' + '_' + auth.currentUser.uid + '.' + imageExtension)
            storageRefOfAvatar.put(file).then(function () {
                
                $('#photoLink').val(`https://firebasestorage.googleapis.com/v0/b/auth-development-57e87.appspot.com/o/user%2F${auth.currentUser.uid}%2Favatar%2Favatar_${auth.currentUser.uid}.${imageExtension}?alt=media`)
                if ($('.msg-success')) {
                    $('.msg-success').remove()
                }
                $('#msg_of_avatar').html('<div class="msg-success"><p>連結已自動貼上，請按 更新我的檔案。</p></div>')
                $('#notUploaded').hide()
                $('#uploaded').show()
             
            })
        } else {
            if ($('.msg-error')) {
                $('.msg-error').remove()
            }
            $('#msg_of_avatar').html('<div class="msg-error"><p>檔案不能大於 1 MB。</p></div>')
        }
    } else {
        if ($('.msg-error')) {
            $('.msg-error').remove()
        }
        $('#msg_of_avatar').html('<div class="msg-error"><p>請選擇檔案。</p></div>')
    }
})

// 關閉按鈕
uploadedBtn.on('click', (e) => {
    uploadBox.hide()
})

// User Bio
// Limit
userBio.on('input', (e) => {
    userBioLimit.html(userBio.val().length)
})