// var
var userPersonalUrlInput = $('#userUrl')
var uploadBox = $('#uploadBox')
var avatarUpload = $('#avatarUpload')
var avatarPreview = $('#avatarPreview')
var avatarAccept = $('#avatarAccept')
var userWhatDoYouDo = $('#userWhatDoYouDo')
var userUrlGithub = $('#userUrlGithub')
var userUrlTwitter = $('#userUrlTwitter')
var userUrlInstagram = $('#userUrlInstagram')
var userUrlFacebook = $('#userUrlFacebook')
var username = $('#username')
var country = $('#country')

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
        $('#displayname').html(user.displayName)
    }
    db.collection("users").doc(user.uid).get().then((doc) => {
        if (doc.data().usernameIsSet == "false") {
            $('username-submit-btn').removeAttr("disabled")
        }
        if (doc.data().usernameIsSet == "true") {
            $('#profile-url').attr('href', `/users/?username=${doc.data().username}`)
        } else {
            $('#profile-url').attr('href', `/users/?username=${user.uid}`)
        }
    })
})

// Update info
$('#update-form').on('submit', (e) => {
    e.preventDefault();

    // Save all
    db.collection("users").doc(auth.currentUser.uid).get().then((doc) => {
        if (doc.data().username != undefined) {
            db.doc('users/' + auth.currentUser.uid).set({
                url: userPersonalUrlInput.val(),
                email: auth.currentUser.email,
                WhatDoYouDo: userWhatDoYouDo.val(),
                github: userUrlGithub.val(),
                twitter: userUrlTwitter.val(),
                instagram: userUrlInstagram.val(),
                facebook: userUrlFacebook.val(),
                username: username.val(),
                avatarUrl: auth.currentUser.photoURL,
                usernameIsSet: "true",
                country: country.val(),
                uid: auth.currentUser.uid
                
            })
            db.doc('userPublic/' + doc.data().username).set({
                url: userPersonalUrlInput.val(),
                email: auth.currentUser.email,
                WhatDoYouDo: userWhatDoYouDo.val(),
                github: userUrlGithub.val(),
                twitter: userUrlTwitter.val(),
                instagram: userUrlInstagram.val(),
                facebook: userUrlFacebook.val(),
                username: username.val(),
                avatarUrl: auth.currentUser.photoURL,
                usernameIsSet: "true",
                country: country.val(),
                uid: auth.currentUser.uid
            })
        } else {
            db.doc('users/' + auth.currentUser.uid).set({
                url: userPersonalUrlInput.val(),
                email: auth.currentUser.email,
                WhatDoYouDo: userWhatDoYouDo.val(),
                github: userUrlGithub.val(),
                twitter: userUrlTwitter.val(),
                instagram: userUrlInstagram.val(),
                facebook: userUrlFacebook.val(),
                avatarUrl: auth.currentUser.photoURL,
                usernameIsSet: "false",
                country: country.val(),
                uid: auth.currentUser.uid
            })
        }
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

})

// innerHTML
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        db.collection("users").doc(user.uid).get().then((doc) => {
            if (doc.data().url != undefined) {
                $('#userUrl').val(doc.data().url)
            }
            if (doc.data().WhatDoYouDo != undefined) {
                $('#userWhatDoYouDo').val(doc.data().WhatDoYouDo)
            }
            if (doc.data().github != undefined) {
                $('#userUrlGithub').val(doc.data().github)
            }
            if (doc.data().twitter != undefined) {
                $('#userUrlTwitter').val(doc.data().twitter)
            }
            if (doc.data().facebook != undefined) {
                $('#userUrlFacebook').val(doc.data().facebook)
            }
            if (doc.data().instagram != undefined) {
                $('#userUrlInstagram').val(doc.data().instagram)
            }
            if (doc.data().username == undefined) {
                $('#username-submit-btn').removeAttr("disabled")
            } else {
                $('#username').val(doc.data().username)
                $('#username').attr("readonly", "")
            }
            if (doc.data().country != undefined) {
                $('#country').val(doc.data().country)
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

// Set username
$('#username-submit-btn').on('click', () => {
    if (confirm(`Username cannot be changed once set. Are you sure you want to set "${username.val()}"?`) == true) {
        db.collection("users").doc(auth.currentUser.uid).get().then((doc) => {
            if (doc.data().usernameIsSet == "false") {
                
                db.collection("userPublic").doc(username.val()).get().then((doc) => {
                    if (doc.data() == undefined) {
                        db.doc('userPublic/' + username.val()).set({
                            url: userPersonalUrlInput.val(),
                            email: auth.currentUser.email,
                            WhatDoYouDo: userWhatDoYouDo.val(),
                            github: userUrlGithub.val(),
                            twitter: userUrlTwitter.val(),
                            instagram: userUrlInstagram.val(),
                            facebook: userUrlFacebook.val(),
                            usernameIsSet: "true",
                            username: username.val(),
                            avatarUrl: auth.currentUser.photoURL,
                            country: country.val()
                        })
                        db.doc('users/' + auth.currentUser.uid).set({
                            url: userPersonalUrlInput.val(),
                            email: auth.currentUser.email,
                            WhatDoYouDo: userWhatDoYouDo.val(),
                            github: userUrlGithub.val(),
                            twitter: userUrlTwitter.val(),
                            instagram: userUrlInstagram.val(),
                            facebook: userUrlFacebook.val(),
                            usernameIsSet: "true",
                            username: username.val(),
                            avatarUrl: auth.currentUser.photoURL,
                            country: country.val()
                        })
                        if ($('.username_msg_box_error')) {
                            $('.username_msg_box_error').remove()
                        }
                        
                        if (localStorage.getItem("lan") == undefined) {
                            $('#username_msg_box').append('<div class="username_msg_box_success"><p>Successfully</p></div>')
                        };
                        if (localStorage.getItem("lan") == "en-US") {
                            $('#username_msg_box').append('<div class="username_msg_box_success"><p>Successfully</p></div>')
                        }
                        if (localStorage.getItem("lan") == "zh-TW") {
                            $('#username_msg_box').append('<div class="username_msg_box_success"><p>成功</p></div>')
                        }
                        setTimeout(function() {
                            window.location.reload()
                        }, 1500)
                    } else {


                        if ($('.username_msg_box_error')) {
                            $('.username_msg_box_error').remove()
                        }
    
                        if (localStorage.getItem("lan") == undefined) {
                            $('#username_msg_box').append('<div class="username_msg_box_error"><p>This username is already taken</p></div>')
                        };
                        if (localStorage.getItem("lan") == "en-US") {
                            $('#username_msg_box').append('<div class="username_msg_box_error"><p>This username is already taken</p></div>')
                        }
                        if (localStorage.getItem("lan") == "zh-TW") {
                            $('#username_msg_box').append('<div class="username_msg_box_error"><p>此用戶名已被使用</p></div>')
                        }
                    }
                })


            } else {

                alert("You already have username.")

            }

        })
        
    }
        
})

// Search
// Get the input field
var searchBox = $("#search-box");

searchBox.on('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();

        // code for enter
        window.location = `/users/?username=${searchBox.val()}`
    }
});