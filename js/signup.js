
//functions for input checking
const gotoformtop = () => {
    $('html, body').animate({
        scrollTop: $("#doc_reg").offset().top - 250
    }, 200);
}

const showalert = (msg) => {
    alert(msg)
}

const submitRequest = () => {
    
    ClinicName = $('#clinic_name').val();
    ClinicAddress = $('#clinic_address').val();
    LicenseNo = $('#license').val();
    ContactNumber = $('#number').val();
    Email = $('#email').val();
    Password =  $('#password').val();


    //conditional checker if okay ba tanan fields
    if(!ClinicName || !ClinicAddress || !LicenseNo || !ContactNumber || !Email || !Password){
        gotoformtop();
        showalert("Please fill all the required fields");
    }
    else if(ContactNumber.length<11){
        gotoformtop();
        showalert("Invalid Contact Number");
    }
    else if(Password.length<6){
        gotoformtop();
        showalert("Please enter a password with a minimum of 6 characters.");
    }
    else{
        auth.createUserWithEmailAndPassword(Email, Password)
        .catch(e =>{
            window.alert("Please input a valid email address.");
            gotoformtop();
        })
        .then(cred =>{
            this.add_user()
        }).then(cred =>{
            const user = firebase.auth().currentUser;
            user.sendEmailVerification()
            user.updateProfile({
                displayClinicName: ClinicName,
            })
            window.alert("Account created successfully, please activate your account through an activation link sent to your email.");
        })
        
    }
}

add_user = () =>{
    var requestData = {
        'ClinicName': ClinicName,
        'ClinicAddress': ClinicAddress,
        'LicenseNo': LicenseNo,
        'ContactNumber': ContactNumber,
        'Email': Email,
        'Password': Password
    }
    push_to_firebase_join(requestData)
}
var push_to_firebase_join = function(data){
    var userUid = auth.currentUser.uid;

    db.collection("Ophthalmologist").doc(userUid).set({
        ClinicName: data["ClinicName"],
        ClinicAddress: data["ClinicAddress"],
        LicenseNo: data["LicenseNo"],
        ContactNumber: data["ContactNumber"],
    }).then(cred => {
        window.location.href = "dlogin.html"
        })
    }