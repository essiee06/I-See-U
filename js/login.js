const SubmitLogin = () => {
    var Email = $("#user_email").val();
    var Password = $("#user_password").val();
    var user = auth.currentUser;
  
    db.settings({merge: true});
  
    auth.signInWithEmailAndPassword(Email, Password)
    
    .then(cred =>{
        if(user.emailVerified==true){
            window.location = 'Userpage/doctordb.html'; //After successful login, user will be redirected to home.html
        }
        else if (user.emailVerified==false){
          window.alert("You must be a verified user to login. Refresh the page once you have verified the account.");
          window.location.assign("dlogin.html")
        }
      })
      .catch(e =>{
        window.alert("Email or password is incorrect.");
        window.location.assign("dlogin.html")
      })
  }