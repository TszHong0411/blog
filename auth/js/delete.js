"use strict";var msg_delete_account='<div class="msg-success"><p>Successfully delete account.</p><p><a href="/login.html">Go Login</a></p></div>';$("#delete-form").on("submit",function(e){e.preventDefault(),auth.onAuthStateChanged(function(e){var s=e.email,c=$("#current-password").val(),c=firebase.auth.EmailAuthProvider.credential(s,c);e.reauthenticateWithCredential(c).then(function(){e.delete().then(function(){msg.css("display","block"),$(".msg-error")&&$(".msg-error").remove(),$(".msg-success")&&$(".msg-success").remove(),msg.append(msg_delete_account)}).catch(function(e){msg.css("display","block"),$(".msg-error")&&$(".msg-error").remove(),$(".msg-success")&&$(".msg-success").remove(),msg.append('<div class="msg-error"><p>'+e.message+"</p></p></div>")})}).catch(function(e){msg.css("display","block"),$(".msg-error")&&$(".msg-error").remove(),$(".msg-success")&&$(".msg-success").remove(),msg.append('<div class="msg-error"><p>'+e.message+"</p></p></div>")})})});