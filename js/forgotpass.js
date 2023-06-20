


const forgotpassword = () => {
    const auth = firebase.auth();
const db = firebase.firestore();
    db.settings({merge: true});
    var email = $("#user_email").val();
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      window.alert("Email sent.");
      window.location.assign("dlogin.html");
    })
    .catch(e =>{
        window.alert("Email is invalid and does not exist.");
        window.location.assign("dforgetpass.html");
      })
  }
