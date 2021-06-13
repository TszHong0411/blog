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

// var
var userPersonalUrlInput = $('#userUrl')


// Update info
$('#update-form').on('submit', (e) => {
    e.preventDefault();


    db.doc(`users/${auth.currentUser.email}`).set({
        url: userPersonalUrlInput.val()
    })



    auth.currentUser.updateProfile({
        displayName: $('#screenName-0-1').val(),
        photoURL: $('#photoLink').val()

    }).then(function () {
        if ($('#msg_dash_t')) {
            $('#msg_dash_t').remove()
        }
        $('#msg_dash').append("<div id=\"msg_dash_t\">更新成功</div>")
        setTimeout(function () {
            location.reload()
        }, 1000);
    })
    
    

    

})
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        db.collection("users").doc(user.email).get().then((doc) => {
            if (doc.data().url != undefined) {
                $('#userUrl').val(doc.data().url)
            }
        });
    }
});
