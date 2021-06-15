// var
var userPersonalUrlInput = $('#userUrl')
var uploadBox = $('#uploadBox')
var avatarUpload = $('#avatarUpload')
var avatarPreview = $('#avatarPreview')
var avatarAccept = $('#avatarAccept')
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
        $('#avatarPreview').attr("src", "https://cdn.jsdelivr.net/gh/tszhong0411/image/auth/none.png")
    } else {
        $('.profile-avatar').attr("src", user.photoURL)
        $('#avatarPreview').attr("src", user.photoURL)
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

        }).then(function () {
            if ($('#msg_dash_t')) {
                $('#msg_dash_t').remove()
            }
            if ($('#msg_dash_t_error')) {
                $('#msg_dash_t_error').remove()
            }
            if (localStorage.getItem("lan") == undefined) {
                $('#msg_dash').append("<div id=\"msg_dash_t\">Successfully Update</div>");
            };
            if (localStorage.getItem("lan") == "en-US") {
                $('#msg_dash').append("<div id=\"msg_dash_t\">Successfully Update</div>");
            }
            if (localStorage.getItem("lan") == "zh-TW") {
                $('#msg_dash').append("<div id=\"msg_dash_t\">更新成功</div>");
            }
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
        if (localStorage.getItem("lan") == undefined) {
            $('#msg_dash').append("<div id=\"msg_dash_t\">Bio words can't greater than 100</div>");
        };
        if (localStorage.getItem("lan") == "en-US") {
            $('#msg_dash').append("<div id=\"msg_dash_t\">Bio words can't greater than 100</div>");
        }
        if (localStorage.getItem("lan") == "zh-TW") {
            $('#msg_dash').append("<div id=\"msg_dash_t_error\">Bio 字數不能大於 100。</div>")
        }
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


avatarUpload.on('change', (e) => {

    e.preventDefault();

    if (avatarUpload.val() == "" && auth.currentUser.photoURL == null) {
        avatarPreview.attr("src", "https://cdn.jsdelivr.net/gh/tszhong0411/image/auth/none.png")
    } else {
        avatarPreview.attr("src", auth.currentUser.photoURL)
    }

    if (avatarUpload.val() !== "") {
        var file = avatarUpload.get(0).files[0],
            reader = new FileReader();

        // Preview
        reader.onload = function (event) {
            avatarPreview.attr('src', event.target.result);
        }
        reader.readAsDataURL(file);

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
            var storageRefOfAvatar = firebase.storage().ref('user/' + auth.currentUser.uid + '/avatar/' + 'avatar' + '_' + auth.currentUser.uid + '.' + imageExtension)
            storageRefOfAvatar.put(file).then(function () {
                auth.currentUser.updateProfile({
                    photoURL: `https://firebasestorage.googleapis.com/v0/b/auth-development-57e87.appspot.com/o/user%2F${auth.currentUser.uid}%2Favatar%2Favatar_${auth.currentUser.uid}.${imageExtension}?alt=media`,
        
                })
                if ($('#msg_dash_t')) {
                    $('#msg_dash_t').remove()
                } 
                if ($('#msg_dash_t_error')) {
                    $('#msg_dash_t_error').remove()
                }
                if (localStorage.getItem("lan") == undefined) {
                    $('#msg_dash').append("<div id=\"msg_dash_t\">Successfully update avatar</div>")
                };
                if (localStorage.getItem("lan") == "en-US") {
                    $('#msg_dash').append("<div id=\"msg_dash_t\">Successfully update avatar</div>")
                }
                if (localStorage.getItem("lan") == "zh-TW") {
                    $('#msg_dash').append("<div id=\"msg_dash_t\">頭像已更新</div>")
                }
                setTimeout(function() {
                    window.location.reload()
                }, 1500)
             
            })
        } else {
            if ($('#msg_dash_t')) {
                $('#msg_dash_t').remove()
            }
            if ($('#msg_dash_t_error')) {
                $('#msg_dash_t_error').remove()
            }
            if (localStorage.getItem("lan") == undefined) {
                $('#msg_dash').append("<div id=\"msg_dash_t_error\">The file cannot be larger than 1 MB.</div>")
            };
            if (localStorage.getItem("lan") == "en-US") {
                $('#msg_dash').append("<div id=\"msg_dash_t_error\">The file cannot be larger than 1 MB.</div>")
            }
            if (localStorage.getItem("lan") == "zh-TW") {
                $('#msg_dash').append("<div id=\"msg_dash_t_error\">檔案不能大於 1 MB。</div>")
            }
           
        }
    } else {
        if ($('#msg_dash_t')) {
            $('#msg_dash_t').remove()
        }
        if ($('#msg_dash_t_error')) {
            $('#msg_dash_t_error').remove()
        }
        if (localStorage.getItem("lan") == undefined) {
            $('#msg_dash').append("<div id=\"msg_dash_t_error\">Please select a file.</div>")
        };
        if (localStorage.getItem("lan") == "en-US") {
            $('#msg_dash').append("<div id=\"msg_dash_t_error\">Please select a file.</div>")
        }
        if (localStorage.getItem("lan") == "zh-TW") {
            $('#msg_dash').append("<div id=\"msg_dash_t_error\">請選擇檔案。</div>")
        }
        
    }
})

// User Bio
// Limit
userBio.on('input', () => {
    userBioLimit.html(userBio.val().length)
})