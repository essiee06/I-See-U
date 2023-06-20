//LISTING THE DATA
const clinic_name = document.querySelector('#clinic_name');
const sched_date = document.querySelector('#sched_date');
const sched_day = document.querySelector('#sched_day');
const start_time = document.querySelector('#start_time');
const end_time = document.querySelector('#end_time');
const book = document.querySelector('#book');

var docRef = db.collection("Doctor_Schedule");

var query = docRef.where("Status", "==", "Available");

query.get().then((querySnapshot) =>{
    querySnapshot.docs.forEach(doc =>{
        renderName(doc);
        renderDate(doc);
        renderStart(doc);
        renderEnd(doc);
        renderDay(doc);
        renderBook(doc);
    })
})

//FOR CLINIC NAME
function renderName(doc){
    let li = document.createElement('li');
    let name = document.createElement('a');

    li.setAttribute('data-id', doc.id);
    li.style.paddingBottom = "2.5em";
    name.textContent = doc.data().Clinic_Name;

    li.appendChild(name);
    clinic_name.appendChild(li);
}

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

//FOR BOOKING
function renderBook(doc){
    let li = document.createElement('li');
    let act = document.createElement('a');
    let btn = document.createElement("button");

    li.setAttribute('data-id', doc.id);
    li.style.paddingBottom = "2.25em";

    act.textContent = "BOOK";
    btn.innerHTML = act.textContent;
    btn.type = "submit";
    btn.name = "formBtn";
    btn.style.backgroundColor = "#0A2558";
    btn.style.color = "#fff";
    btn.style.display = "flex";
    btn.style.width = "50%";
    btn.style.padding = "1px 10px";
    btn.style.verticalAlign = "middle";

    li.appendChild(btn);
    book.appendChild(li);
      btn.onclick = function(){
            var cname = doc.data(doc.id).Clinic_Name;
            var cadd = doc.data(doc.id).Clinic_Address;
            var phone = doc.data(doc.id).Contact_Number;
            var adate = doc.data(doc.id).Date_Sched;
            var aday = doc.data(doc.id).Day_Sched;
            var stime = doc.data(doc.id).Start_Time;
            var etime = doc.data(doc.id).End_Time;

            localStorage.setItem("clinicname",cname);
            localStorage.setItem("clinicaddress",cadd);
            localStorage.setItem("clinicphone",phone);
            localStorage.setItem("appdate",adate);
            localStorage.setItem("appday",aday);
            localStorage.setItem("starttime",stime);
            localStorage.setItem("endtime",etime);
            localStorage.setItem("docid",doc.id);
            window.location.href = "booking.html"
      }
  }
