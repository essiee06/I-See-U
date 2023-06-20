//USER LOGGED IN
var Clinic_Name = "";
var Clinic_Address = "";
document.getElementById("add_clinic").setAttribute("readonly", true);
const welcomeuser = document.querySelector('.clinic_name');

auth.onAuthStateChanged((user) =>{
  var userUid = auth.currentUser.uid;
  var docRefuser = db.collection("Ophthalmologist").doc(userUid);

  if(user){
    docRefuser.get().then((doc) => {
      if (doc.exists) {
        const username = doc.data().ClinicName;
        const address = doc.data().ClinicAddress;
        const phone = doc.data().ContactNumber;
        //upper right corner, makita ang clinic name
        const usernamehtml = `<div> Welcome ${username}!</div>`;
        welcomeuser.innerHTML = usernamehtml
        //add clinic, diritso na makita ang clinic name no need to type
        Clinic_Name = username; 
        document.getElementById("add_clinic").value = Clinic_Name;

        //getting Clinic address & Contact Number to add to the Doctor_Schedule database
        Clinic_Address = address;
        Contact_Number = phone;

        //For the listing of schedules
        var query = docRef.where("Clinic_Name", "==", username);
        console.log(query);
        query.get().then((querySnapshot) =>{
        querySnapshot.docs.forEach(doc =>{
          renderDate(doc); //These functions can be seen on line 141 onwards
          renderStart(doc);
          renderEnd(doc);
          renderDay(doc);
          renderConsult(doc)
          renderStatus(doc);
          renderAction(doc);
          })
        })
      }
    })
  }
})

var docRef = db.collection("Doctor_Schedule");

const logout = document.querySelector('#log_out');
logout.addEventListener('click',(e)=> {
    e.preventDefault();
    auth.signOut().then(() =>{
        console.log('user signed out');
        window.location.assign("../dlogin.html");
    })
});

//CHECKING FOR START TIME AND END TIME
checktime = () =>{
  var start = Start_Time.split(":");
  var end = End_Time.split(":");
  var startDate = new Date(0,0,0,  start[0], start[1], 0);
  var endDate = new Date(0, 0, 0, end[0], end[1], 0);

  if(endDate.getTime() < startDate.getTime()){
    alert("End time should be greater than the Start time.");
    window.location.href = "dschedule.html";
  }
}

//ADDING TO FIRESTORE
var Date_Sched = ""
var Start_Time = ""
var End_Time = ""
var Day_Sched = ""
var Consult_Time = ""

add_day = () =>{
  var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var d = new Date(Date_Sched);
  Day_Sched= weekday[d.getDay()];
}

add_consult = () => {
  var start = Start_Time.split(":");
  var end = End_Time.split(":");
  var startDate = new Date(0,0,0,  start[0], start[1], 0);
  var endDate = new Date(0, 0, 0, end[0], end[1], 0);
  var diff = endDate.getTime() - startDate.getTime();
  var hours = Math.floor(diff / 1000 / 60 / 60);
      diff -= hours * 1000 * 60 * 60;
  var minutes = Math.floor(diff / 1000 / 60);
  Consult_Time =   hours + " hours and " + minutes + " minutes"
}

AddSchedule = (e) => {
  $("#add_button").addClass("loading-start")
  Date_Sched = $("#add_date").val()
  Start_Time = $("#add_start").val()
  End_Time = $("#add_end").val()
  if(!Date_Sched || !Start_Time || !End_Time){
    alert("Please fill in all the required fields.");
    window.location.href = "dschedule.html";
  }
  else{
    console.log(Date_Sched + "\n" + Start_Time + "\n" + End_Time)
    checktime();
    add_day();
    add_consult();
    this.schedule_request();
  }
}

schedule_request = () =>{
  console.log("sending request")

  var requestData = {
      'Clinic_Name': Clinic_Name,
      'Clinic_Address': Clinic_Address,
      'Contact_Number': Contact_Number,
      'Date_Sched': Date_Sched,
      'Day_Sched':Day_Sched,
      'End_Time': End_Time,
      'Start_Time': Start_Time,
      'Consult_Time': Consult_Time,
      'Status' : "Available"
    }
      push_to_firebase_schedule(requestData)
}

var push_to_firebase_schedule = function(data){
  db.collection("Doctor_Schedule").add({
    Clinic_Name: data["Clinic_Name"],
    Clinic_Address: data["Clinic_Address"],
    Contact_Number: data["Contact_Number"],
    Date_Sched: data["Date_Sched"],
    Day_Sched: data["Day_Sched"],
    End_Time: data["End_Time"],
    Start_Time: data["Start_Time"],
    Consult_Time: data["Consult_Time"],
    Status: data["Status"]
 }).then(data => {
    window.alert("New schedule successfully added");
    window.location.href="dschedule.html";
 })
}

  //GETTING THE LIST
  const sched_date = document.querySelector('#sched_date');
  const sched_day = document.querySelector('#sched_day');
  const start_time = document.querySelector('#start_time');
  const end_time = document.querySelector('#end_time');
  const consult_time = document.querySelector('#consult_time');
  const schedstatus = document.querySelector('#status');
  const action = document.querySelector('#remove_action');

  
  
  //FOR DATE
  function renderDate(doc){
  let li = document.createElement('li');
  let date = document.createElement('a');
  
  li.setAttribute('data-id', doc.id);
  li.style.paddingBottom = "2.5em";
  date.textContent = doc.data().Date_Sched;
  
  li.appendChild(date);
  sched_date.appendChild(li);
  }
  
  //FOR DAY SCHED
  function renderDay(doc){
  let li = document.createElement('li');
  let day = document.createElement('a');
  
  li.setAttribute('data-id', doc.id);
  li.style.paddingBottom = "2.5em";
  day.textContent = doc.data().Day_Sched;
  
  li.appendChild(day);
  sched_day.appendChild(li);
  }
  
  //FOR START TIME
  function renderStart(doc){
  let li = document.createElement('li');
  let start = document.createElement('a');
  
  li.setAttribute('data-id', doc.id);
  li.style.paddingBottom = "2.5em";
  start.textContent = doc.data().Start_Time;
  
  li.appendChild(start);
  start_time.appendChild(li);
  }
  
  //FOR END TIME
  function renderEnd(doc){
  let li = document.createElement('li');
  let end = document.createElement('a');
  
  li.setAttribute('data-id', doc.id);
  li.style.paddingBottom = "2.5em";
  end.textContent = doc.data().End_Time;
  
  li.appendChild(end);
  end_time.appendChild(li);
  }
  
  //FOR CONSULTATION TIME
  function renderConsult(doc){
  let li = document.createElement('li');
  let consult = document.createElement('a');
  
  li.setAttribute('data-id', doc.id);
  li.style.paddingBottom = "2.5em";
  consult.textContent = doc.data().Consult_Time;
  
  li.appendChild(consult);
  consult_time.appendChild(li);
  }
  
  function renderStatus(doc){
    let li = document.createElement('li');
    let status = document.createElement('a');
  
    li.setAttribute('data-id', doc.id);
    li.style.paddingBottom = "2.5em";
    status.textContent = doc.data().Status;
    
    li.appendChild(status);
    schedstatus.appendChild(li);
    }  
  
  
  //FOR ACTION
  function renderAction(doc){
    let li = document.createElement('li');
    let act = document.createElement('a');
    let btn = document.createElement("button");
  
    li.setAttribute('data-id', doc.id);
    li.style.paddingBottom = "2.5em";
  
    act.textContent = "REMOVE";
    btn.innerHTML = act.textContent; 
    btn.type = "submit";
    btn.name = "formBtn";
    btn.style.backgroundColor = "#0A2558";
    btn.style.color = "#fff";
    btn.style.display = "flex";
    btn.style.width = "100%";
    btn.style.padding = "1px 10px";
  
    li.appendChild(btn);
    remove_action.appendChild(li);
      btn.onclick = function(){
        docRef.doc(doc.id).delete().then(data=>{
          window.alert("The schedule will now be removed.");
          window.location.assign("dschedule.html");
        })
  }}
