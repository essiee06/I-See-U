const welcomeuser = document.querySelector('.clinic_name');

var docRef = db.collection("Appointment");
var x = 0;
auth.onAuthStateChanged((user) =>{
    var userUid = auth.currentUser.uid;
    var docRefuser = db.collection("Ophthalmologist").doc(userUid);
    
      if(user){
        docRefuser.get().then((doc) => {
          if (doc.exists) {
          const username = doc.data().ClinicName;
          const usernamehtml = `<div> Welcome ${username}!</div>`;
          welcomeuser.innerHTML = usernamehtml
          
          var query = docRef.where("Clinic_Name", "==", username);
          console.log(query);
          query.get().then((querySnapshot) =>{
          querySnapshot.docs.forEach(doc =>{
            if (x<=4){
            renderDate(doc); //These functions can be seen on line 141 onwards
            renderStart(doc);
            renderEnd(doc);
            renderName(doc);
            x++;
            }
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
    

const logout = document.querySelector('#log_out');
logout.addEventListener('click',(e)=> {
    e.preventDefault();
    auth.signOut().then(() =>{
        console.log('user signed out');
        window.location.assign("../dlogin.html");
    })
});
