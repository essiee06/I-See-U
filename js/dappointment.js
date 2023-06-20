const welcomeuser = document.querySelector('.clinic_name');

var docRef = db.collection("Appointment");

auth.onAuthStateChanged((user) =>{
    var userUid = auth.currentUser.uid;
    var docRefUser = db.collection("Ophthalmologist").doc(userUid);
    
      if(user){
        docRefUser.get().then((doc) => {
          if (doc.exists) {
          const username = doc.data().ClinicName;
          const usernamehtml = `<div> Welcome ${username}!</div>`;
          welcomeuser.innerHTML = usernamehtml

          

          var query = docRef.where("Clinic_Name", "==", username);
          console.log(query);
          query.get().then((querySnapshot) =>{
          querySnapshot.docs.forEach(doc =>{
            renderDate(doc); //These functions can be seen on line 141 onwards
            renderStart(doc);
            renderEnd(doc);
            renderName(doc);
            renderNumber(doc);
            renderAction(doc);
            renderView(doc);
            })
          })
    }
    })
}
})

const sched_date = document.querySelector('#sched_date');
const start_time = document.querySelector('#start_time');
const end_time = document.querySelector('#end_time');
const full_time = document.querySelector('#full_name');
const phone_number = document.querySelector('#phone_number');
const action = document.querySelector('#remove_action');
const view = document.querySelector('#view');

function renderDate(doc){
  let li = document.createElement('li');
  let date = document.createElement('a');
  
  li.setAttribute('data-id', doc.id);
  li.style.paddingBottom = "2.5em";
  date.textContent = doc.data().Date_Sched;
  
  li.appendChild(date);
  sched_date.appendChild(li);
  }

function renderStart(doc){
  let li = document.createElement('li');
  let starttime = document.createElement('a');

  li.setAttribute('data-id', doc.id);
  li.style.paddingBottom = "2.5em";
  starttime.textContent = doc.data().Start_Time;
  
  li.appendChild(starttime);
  start_time.appendChild(li);
  }

function renderEnd(doc){
  let li = document.createElement('li');
  let endtime = document.createElement('a');
  
  li.setAttribute('data-id', doc.id);
  li.style.paddingBottom = "2.5em";
  endtime.textContent = doc.data().End_Time;
    
  li.appendChild(endtime);
  end_time.appendChild(li);
}

function renderName(doc){
  let li = document.createElement('li');
  let personame = document.createElement('a');
    
  li.setAttribute('data-id', doc.id);
  li.style.paddingBottom = "2.5em";
  personame.textContent = doc.data().Patient_Name;
      
  li.appendChild(personame);
  full_name.appendChild(li);
}
    
function renderNumber(doc){
  let li = document.createElement('li');
  let phonenumber = document.createElement('a');
      
  li.setAttribute('data-id', doc.id);
  li.style.paddingBottom = "2.5em";
  phonenumber.textContent = doc.data().Patient_Contact;
        
  li.appendChild(phonenumber);
  phone_number.appendChild(li);
}

function renderAction(doc){
  let li = document.createElement('li');
  let act = document.createElement('a');
  let btn = document.createElement("button");
        
  li.setAttribute('data-id', doc.id);
  li.style.paddingBottom = "2.6em";
        
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
      window.alert("The appointment will now be removed.");
      window.location.assign("dappointment.html");
    })  
  }
}

function renderView(doc){
  let li = document.createElement('li');
  let act = document.createElement('a');
  let btn = document.createElement("button");
            
  li.setAttribute('data-id', doc.id);
  li.style.paddingBottom = "2.05em";
            
  act.textContent = "VIEW";
  btn.innerHTML = act.textContent; 
  btn.type = "submit";
  btn.name = "formBtn";
  btn.style.backgroundColor = "#0A2558";
  btn.style.color = "#fff";
  btn.style.display = "flex";
  btn.style.width = "100%";
  btn.style.padding = "1px 10px";
  btn.style.verticalAlign = "middle";
            
  li.appendChild(btn);
  view.appendChild(li);
  btn.onclick = function(){
    var appointid = doc.data(doc.id).Appointment_Id;
    localStorage.setItem("doc_id",doc.id);	
    window.location.href = "details.html"
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