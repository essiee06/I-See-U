var doc_id = localStorage.getItem("doc_id");
console.log(doc_id);
console.log("I am working!"); //working pani sila

var docRef = db.collection("Appointment");

docRef.doc(doc_id).get().then((doc)=>{

    document.getElementById("pname").innerHTML = doc.data().Patient_Name;
    document.getElementById("gender").innerHTML = doc.data().Patient_Gender;
    document.getElementById("contact_info").innerHTML = doc.data().Patient_Contact;
    document.getElementById("pemail").innerHTML = doc.data().Patient_Email;
    document.getElementById("app_number").innerHTML = doc.data().Appointment_Id;
    document.getElementById("clinic_name").innerHTML = doc.data().Clinic_Name;
    document.getElementById("clinic_address").innerHTML = doc.data().Clinic_Address;
    document.getElementById("clinic_contact").innerHTML = doc.data().Clinic_Contact;
    document.getElementById("app_date").innerHTML = doc.data().Date_Sched;
    document.getElementById("app_day").innerHTML = doc.data().Day_Sched;
    document.getElementById("start_time").innerHTML = doc.data().Start_Time;
    document.getElementById("end_time").innerHTML = doc.data().End_Time;

})




  
