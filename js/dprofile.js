const welcomeuser = document.querySelector('.clinic_name');
const clinicnamedako = document.querySelector('.clinicname_dako');
const clinicnamegamay = document.querySelector('.clinicname_gamay');
const clinicaddress = document.querySelector('.clinic_address');
const contactnumber = document.querySelector('.contact_number');
const ltonumber =  document.querySelector('.lto_number')

auth.onAuthStateChanged((user) =>{
    var userUid = auth.currentUser.uid;
    var docRef = db.collection("Ophthalmologist").doc(userUid);
    
      if(user){
        docRef.get().then((doc) => {
          if (doc.exists) {
          // welcome user
          const username = doc.data().ClinicName;
          const usernamehtml = `<div> Welcome ${username}!</div>`;
          welcomeuser.innerHTML = usernamehtml
          
          //clinic name box
          const clinicnamesmall = doc.data().ClinicName;
          const clinicnamesmallhtml = `<div>${clinicnamesmall}</div>`;
          clinicnamegamay.innerHTML = clinicnamesmallhtml
          //clinic name big and bold
          clinicnamedako.innerHTML = clinicnamesmallhtml

          const clinicadd = doc.data().ClinicAddress;
          const clinicaddhtml = `<div>${clinicadd}</div>`;
          clinicaddress.innerHTML = clinicaddhtml

          const phonenumber = doc.data().ContactNumber;
          const phonenumberhtml = `<div>${phonenumber}</div>`;
          contactnumber.innerHTML = phonenumberhtml

          const licensenumber = doc.data().LicenseNo;
          const licensenumberhtml = `<div>${licensenumber}</div>`;
          ltonumber.innerHTML = licensenumberhtml

    }
    })
}
});

var check = function() {
  const newpass = document.getElementById('newpass').value;
  const confirmpass = document.getElementById('confirmpass').value;
  
  //checking newpass and confirm pass
  if ( newpass == confirmpass && newpass!="" && confirmpass!="") {
    document.getElementById('message').style.color = 'green';
    document.getElementById('message').innerHTML = 'matching';
    
  } else if(newpass != confirmpass && newpass!="" && confirmpass!="") {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'not matching';
  }
  else{
      document.getElementById('message').innerHTML = ' ';
  }  
}

var checkupdate = function(){
  const newpass = document.getElementById('newpass').value;
  const confirmpass = document.getElementById('confirmpass').value;
  user = auth.currentUser;

  if(newpass==confirmpass && newpass!=null && confirmpass!=null){
      if(newpass.length<=12&&newpass.length>=6){
          user.updatePassword(newpass).then(() => {
              window.location.assign("../dlogin.html");
              window.alert("You will be logged out. Please login again with your new password.");
            })
      }
      else{
         window.alert("Password must have 6-12 characters");
      }
  }
  else if(newpass != confirmpass && newpass!=null && confirmpass!=null){
      window.alert("Passwords must match!");
  }
 
}


const logout = document.querySelector('#log_out');
logout.addEventListener('click',(e)=> {
    e.preventDefault();
    auth.signOut().then(() =>{
        console.log('user signed out');
        window.location.assign("../dlogin.html");
    })
});

//start of profile details