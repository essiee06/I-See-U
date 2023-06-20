// for booking.html
var cname = localStorage.getItem("clinicname");
var cadd = localStorage.getItem("clinicaddress");
var phone = localStorage.getItem("clinicphone");
var adate = localStorage.getItem("appdate");
var aday = localStorage.getItem("appday");
var stime = localStorage.getItem("starttime");
var etime = localStorage.getItem("endtime");
var doc_id = localStorage.getItem("docid");

document.getElementById("eye_clinic").setAttribute("readonly", true);
document.getElementById("sdate").setAttribute("readonly", true);
document.getElementById("tstart").setAttribute("readonly", true);
document.getElementById("tend").setAttribute("readonly", true);

document.getElementById("eye_clinic").value = cname;
document.getElementById("sdate").value = adate;
document.getElementById("tstart").value = stime;
document.getElementById("tend").value = etime;

//ADDING TO FIRESTORE
var Appointment_Id = ""
var Patient_Name = ""
var Patient_Contact = ""
var Patient_Email = ""
var Patient_Gender = ""
var Clinic_Name = cname
var Clinic_Address = cadd
var Clinic_Contact = phone
var Date_Sched = adate
var Start_Time = stime
var End_Time = etime
var Day_Sched = aday

add_appnum = () =>{
  var d = new Date();
  Appointment_Id = d.getTime();
}

function myFunction1() {
  //GETTING THE INFORMATION FROM THE INPUTS OF THE PATIENT
  Patient_Name = $("#patientname").val();
  Patient_Contact =$("#patientnumber").val();
  Patient_Email =$("#patientemail").val();
  Patient_Gender =$("#patientgender").val();
  add_appnum();
  getdocid();

  //CHECKING IF ALL INPUT FIELDS ARE INPUTTED
  if(!Patient_Name || !Patient_Contact || !Patient_Email || !Patient_Gender){
    alert("Please fill in all the required fields.");
    window.location.href = "booking.html";
  } 
  //FOR THE DISPLAY IN THE MODAL 
  document.getElementById("apid").innerHTML = Appointment_Id;
  document.getElementById("pname").innerHTML = Patient_Name;
  document.getElementById("pnum").innerHTML = Patient_Contact;
  document.getElementById("pemail").innerHTML = Patient_Email;
  document.getElementById("pgender").innerHTML = Patient_Gender;
  document.getElementById("clinicname").innerHTML = Clinic_Name;
  document.getElementById("clinicaddress").innerHTML = Clinic_Address;
  document.getElementById("clinicphone").innerHTML = Clinic_Contact;
  document.getElementById("apdate").innerHTML = Date_Sched;
  document.getElementById("apday").innerHTML = Day_Sched;
  document.getElementById("starttime").innerHTML = Start_Time;
  document.getElementById("endtime").innerHTML = End_Time;
  
    this.appointment_request();
  }

  appointment_request = () =>{
    console.log("sending request")
  
    var requestData = {
        'Appointment_Id': Appointment_Id,
        'Clinic_Name': Clinic_Name,
        'Clinic_Address': Clinic_Address,
        'Clinic_Contact': Clinic_Contact,
        'Date_Sched': Date_Sched,
        'Day_Sched':Day_Sched,
        'End_Time': End_Time,
        'Start_Time': Start_Time,
        'Patient_Name': Patient_Name,
        'Patient_Contact': Patient_Contact,
        'Patient_Email': Patient_Email,
        'Patient_Gender': Patient_Gender,
        'Status' : "Appointment Booked"
      }
        push_to_firebase_appointment(requestData)
  }

  var push_to_firebase_appointment = function(data){
    db.collection("Appointment").add({
      Appointment_Id: data["Appointment_Id"],
      Clinic_Name: data["Clinic_Name"],
      Clinic_Address: data["Clinic_Address"],
      Clinic_Contact: data["Clinic_Contact"],
      Date_Sched: data["Date_Sched"],
      Day_Sched: data["Day_Sched"],
      End_Time: data["End_Time"],
      Start_Time: data["Start_Time"],
      Patient_Name: data["Patient_Name"],
      Patient_Contact: data["Patient_Contact"],
      Patient_Email: data["Patient_Email"],
      Patient_Gender: data["Patient_Gender"],
      Status: data["Status"]
   })
  }

  var getdocid = function(){
    db.collection("Doctor_Schedule").doc(doc_id).update({"Status": "Booked"});
  }