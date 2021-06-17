var username = window.location.search.replace("?username=", "")
if (window.location.search[10] !== undefined) {

    function usersNotSetUsername() {
        auth.onAuthStateChanged(user => {


            if (user) {
                $('#nav-item-ui').append('<li class="nav-item"><a class="nav-link" id="nav-logout-profile" style="cursor: pointer;" onclick="auth.signOut().then(() => {window.location = \'/auth/index.html\'})">Logout</a></li>')
                if (username == user.uid) {

                    $('head').append('<title>Unset | Profile</title>')
                    if (auth.currentUser.photoURL != null) {
                        $('.avatar-box').append(`<img alt="User avatar" class="rounded-circle" src="${user.photoURL}" width="150">`)
                    } else {
                        $('.avatar-box').append(
                            "<svg style=\"width:150px;\" viewBox=\"0 0 24 24\" class=\"user-details__avatar\" alt=\"\"><path fill=\"currentColor\" d=\"M12 19.2c-2.5 0-4.71-1.28-6-3.2.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.232 7.232 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10c0-5.53-4.5-10-10-10z\"></path></svg>"
                        )
                    }

                    $('#username').html("Username")
                    $('#what_i_do').html("N/A")
                    $('#country').html("N/A")
                    $('#url-box-container').append('<ul class="list-group list-group-flush" id="url-box"><li class="list-group-item d-flex justify-content-between align-items-center flex-wrap"><a href="/settings" class="claim-username-btn">Claim you username</a></li></ul>')
                }


                db.collection('userPublic').doc(username).get().then((doc) => {
                    if (doc.data() == undefined) {

                        db.collection('users').doc(username).get().then((doc) => {

                            if (doc.data() != undefined) {


                                if (doc.data().usernameIsSet == "true") {
                                    $('head').append(`<title>${doc.data().username} | Profile</title>`)
                                }

                                if (username != user.uid) {
                                    if (doc.data().avatarUrl != null && doc.data().avatarUrl != "") {
                                        $('.avatar-box').append(`<img alt="User avatar" class="rounded-circle" src="${doc.data().avatarUrl}" width="150">`)
                                    } else {
                                        $('.avatar-box').append(`<img alt="User avatar" class="rounded-circle" src="https://cdn.jsdelivr.net/gh/tszhong0411/image/auth/none.png" width="150">`)
                                    }
                                }
                                

                                if (doc.data().WhatDoYouDo != null && doc.data().WhatDoYouDo != "") {
                                    $('#what_i_do').html(doc.data().WhatDoYouDo)
                                } else {
                                    $('#hr-1').remove()
                                }
                                if (doc.data().country != null && doc.data().country != "") {
                                    $('#country').html(doc.data().country)
                                } else {
                                    $('#hr-2').remove()
                                }

                                if (doc.data().url != null && doc.data().url != "") {
                                    $('#url-box').append(`<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="feather feather-globe mr-2 icon-inline">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path
                                        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z">
                                    </path>
                                </svg>Website</h6>
                            <span class="text-secondary"><a href="${doc.data().url}">${doc.data().url}</a></span>
                        </li>`)
                                }

                                if (doc.data().github != null && doc.data().github != "") {
                                    $('#url-box').append(`<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="feather feather-github mr-2 icon-inline">
                                    <path
                                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                                    </path>
                                </svg>Github</h6>
                            <span class="text-secondary"><a href="https://github.com/${doc.data().github}">${doc.data().github}</a></span>
                        </li>`)
                                }

                                if (doc.data().twitter != null && doc.data().twitter != "") {
                                    $('#url-box').append(`<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="feather feather-twitter mr-2 icon-inline text-info">
                                    <path
                                        d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
                                    </path>
                                </svg>Twitter</h6>
                            <span class="text-secondary"><a href="https://twitter.com/${doc.data().twitter}">@${doc.data().twitter}</a></span>
                        </li>`)
                                }

                                if (doc.data().instagram != null && doc.data().instagram != "") {
                                    $('#url-box').append(`<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="feather feather-instagram mr-2 icon-inline text-danger">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>Instagram</h6>
                            <span class="text-secondary"><a href="https://instagram.com/${doc.data().instagram}">${doc.data().instagram}</a></span>
                        </li>`)
                                }
                                if (doc.data().facebook != null && doc.data().facebook != "") {
                                    $('#url-box').append(`<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="feather feather-facebook mr-2 icon-inline text-primary">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z">
                                    </path>
                                </svg>Facebook</h6>
                            <span class="text-secondary"><a href="https://facebook.com/${doc.data().facebook}">${doc.data().facebook}</a></span>
                        </li>`)
                                }
                            } else {

                                $('head').append('<title>Not Found | Profile</title>')
                                $('.avatar-box').append(
                                    "<svg style=\"width:150px;\" viewBox=\"0 0 24 24\" class=\"user-details__avatar\" alt=\"\"><path fill=\"currentColor\" d=\"M12 19.2c-2.5 0-4.71-1.28-6-3.2.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.232 7.232 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10c0-5.53-4.5-10-10-10z\"></path></svg>"
                                )
                                $('#username').html("User not found")
                                $('#what_i_do').html("N/A")
                                $('#country').html("N/A")
                                $('#url-box-container').remove()

                            }
                                


           

                        })

                    }
                })





            } else {

                $('#nav-item-ui').append('<li class="nav-item"><a class="nav-link" id="nav-logout-profile" style="cursor: pointer;" href="/auth/index.html"})">Login</a></li>')

                db.collection('userPublic').doc(username).get().then((doc) => {


                    if (doc.data() == undefined) {

                        db.collection('users').doc(username).get().then((doc) => {

                            if (doc.data() == undefined) {

                                $('head').append('<title>Not Found | Profile</title>')
                                $('.avatar-box').append(
                                    "<svg style=\"width:150px;\" viewBox=\"0 0 24 24\" class=\"user-details__avatar\" alt=\"\"><path fill=\"currentColor\" d=\"M12 19.2c-2.5 0-4.71-1.28-6-3.2.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.232 7.232 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10c0-5.53-4.5-10-10-10z\"></path></svg>"
                                )
                                $('#username').html("User not found")
                                $('#what_i_do').html("N/A")
                                $('#country').html("N/A")
                                $('#url-box-container').remove()

                            } else {
                                if (doc.data().username != null && doc.data().username != undefined) {

                                    $('#username').html(doc.data().username)

                                }

                                if (doc.data().avatarUrl != null && doc.data().avatarUrl != "") {
                                    $('.avatar-box').append(`<img alt="User avatar" class="rounded-circle" src="${doc.data().avatarUrl}" width="150">`)
                                } else {
                                    $('.avatar-box').append(`<img alt="User avatar" class="rounded-circle" src="https://cdn.jsdelivr.net/gh/tszhong0411/image/auth/none.png" width="150">`)
                                }
                                if (doc.data().WhatDoYouDo != null && doc.data().WhatDoYouDo != "") {
                                    $('#what_i_do').html(doc.data().WhatDoYouDo)
                                } else {
                                    $('#hr-1').remove()
                                }
                                if (doc.data().country != null && doc.data().country != "") {
                                    $('#country').html(doc.data().country)
                                } else {
                                    $('#hr-2').remove()
                                }
                
                                if (doc.data().url != null && doc.data().url != "") {
                                    $('#url-box').append(`<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    class="feather feather-globe mr-2 icon-inline">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                                    <path
                                                        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z">
                                                    </path>
                                                </svg>Website</h6>
                                            <span class="text-secondary"><a href="${doc.data().url}">${doc.data().url}</a></span>
                                        </li>`)
                                }
                
                                if (doc.data().github != null && doc.data().github != "") {
                                    $('#url-box').append(`<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    class="feather feather-github mr-2 icon-inline">
                                                    <path
                                                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                                                    </path>
                                                </svg>Github</h6>
                                            <span class="text-secondary"><a href="https://github.com/${doc.data().github}">${doc.data().github}</a></span>
                                        </li>`)
                                }
                
                                if (doc.data().twitter != null && doc.data().twitter != "") {
                                    $('#url-box').append(`<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    class="feather feather-twitter mr-2 icon-inline text-info">
                                                    <path
                                                        d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
                                                    </path>
                                                </svg>Twitter</h6>
                                            <span class="text-secondary"><a href="https://twitter.com/${doc.data().twitter}">@${doc.data().twitter}</a></span>
                                        </li>`)
                                }
                
                                if (doc.data().instagram != null && doc.data().instagram != "") {
                                    $('#url-box').append(`<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    class="feather feather-instagram mr-2 icon-inline text-danger">
                                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                                </svg>Instagram</h6>
                                            <span class="text-secondary"><a href="https://instagram.com/${doc.data().instagram}">${doc.data().instagram}</a></span>
                                        </li>`)
                                }
                                if (doc.data().facebook != null && doc.data().facebook != "") {
                                    $('#url-box').append(`<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    class="feather feather-facebook mr-2 icon-inline text-primary">
                                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z">
                                                    </path>
                                                </svg>Facebook</h6>
                                            <span class="text-secondary"><a href="https://facebook.com/${doc.data().facebook}">${doc.data().facebook}</a></span>
                                        </li>`)
                                }
                                if (doc.data().url == "" && doc.data().github == "" && doc.data().twitter == "" && doc.data().facebook == "" && doc.data().instagram == "") {
                                    $('#url-box-container').remove()
                                }



                            }

                        })


                    }

                })


            }
        })




    }

    function checkUser() {
        db.collection("userPublic").doc(username).get().then((doc) => {
            if (doc.data() == undefined) {
                usersNotSetUsername()

            } else {

                auth.onAuthStateChanged(user => {

                    if (user) {
                        $('#nav-item-ui').append('<li class="nav-item"><a class="nav-link" id="nav-logout-profile" style="cursor: pointer;" onclick="auth.signOut().then(() => {window.location = \'/auth/index.html\'})">Logout</a></li>')
                    } else {

                        $('#nav-item-ui').append('<li class="nav-item"><a class="nav-link" id="nav-logout-profile" style="cursor: pointer;" href="/auth/index.html"})">Login</a></li>')
                    }
                })


                var usernameIsExistAndItIs = doc.data().username
                $('head').append(`<title>${usernameIsExistAndItIs} | Profile</title>`)
                $('#profile-url').attr("href", `/users/?username=${usernameIsExistAndItIs}`)
                // 唔一定
                if (doc.data().avatarUrl != null && doc.data().avatarUrl != "") {
                    $('.avatar-box').append(`<img alt="User avatar" class="rounded-circle" src="${doc.data().avatarUrl}" width="150">`)
                } else {
                    $('.avatar-box').append(`<img alt="User avatar" class="rounded-circle" src="https://cdn.jsdelivr.net/gh/tszhong0411/image/auth/none.png" width="150">`)
                }
                if (doc.data().WhatDoYouDo != null && doc.data().WhatDoYouDo != "") {
                    $('#what_i_do').html(doc.data().WhatDoYouDo)
                } else {
                    $('#hr-1').remove()
                }
                if (doc.data().country != null && doc.data().country != "") {
                    $('#country').html(doc.data().country)
                } else {
                    $('#hr-2').remove()
                }

                if (doc.data().url != null && doc.data().url != "") {
                    $('#url-box').append(`<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="feather feather-globe mr-2 icon-inline">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path
                                        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z">
                                    </path>
                                </svg>Website</h6>
                            <span class="text-secondary"><a href="${doc.data().url}">${doc.data().url}</a></span>
                        </li>`)
                }

                if (doc.data().github != null && doc.data().github != "") {
                    $('#url-box').append(`<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="feather feather-github mr-2 icon-inline">
                                    <path
                                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                                    </path>
                                </svg>Github</h6>
                            <span class="text-secondary"><a href="https://github.com/${doc.data().github}">${doc.data().github}</a></span>
                        </li>`)
                }

                if (doc.data().twitter != null && doc.data().twitter != "") {
                    $('#url-box').append(`<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="feather feather-twitter mr-2 icon-inline text-info">
                                    <path
                                        d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
                                    </path>
                                </svg>Twitter</h6>
                            <span class="text-secondary"><a href="https://twitter.com/${doc.data().twitter}">@${doc.data().twitter}</a></span>
                        </li>`)
                }

                if (doc.data().instagram != null && doc.data().instagram != "") {
                    $('#url-box').append(`<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="feather feather-instagram mr-2 icon-inline text-danger">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>Instagram</h6>
                            <span class="text-secondary"><a href="https://instagram.com/${doc.data().instagram}">${doc.data().instagram}</a></span>
                        </li>`)
                }
                if (doc.data().facebook != null && doc.data().facebook != "") {
                    $('#url-box').append(`<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round"
                                    class="feather feather-facebook mr-2 icon-inline text-primary">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z">
                                    </path>
                                </svg>Facebook</h6>
                            <span class="text-secondary"><a href="https://facebook.com/${doc.data().facebook}">${doc.data().facebook}</a></span>
                        </li>`)
                }
                if (doc.data().url == "" && doc.data().github == "" && doc.data().twitter == "" && doc.data().facebook == "" && doc.data().instagram == "") {
                    $('#url-box-container').remove()
                }
                // 一定
                $('#username').html(doc.data().username)

            }
        })
    }
    checkUser()
} else {
    $('.container').hide()
    $('body').append("<h1>Missing username.</h1>")
}

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