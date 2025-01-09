const shrink_btn = document.querySelector(".shrink-btn");
const search = document.querySelector(".search");
const sidebar_links = document.querySelectorAll(".sidebar-links a");
const active_tab = document.querySelector(".active-tab");
const shortcuts = document.querySelector(".sidebar-links h4");
const tooltip_elements = document.querySelectorAll(".tooltip-element");

let activeIndex;


// Study Stats thing

let pomodoroCount = 0;
let tasksCompleted = 0;
let totalStudyMinutes = 0;

function updateStats() {
  document.getElementById('pomodoro-count').textContent = pomodoroCount;
  document.getElementById('tasks-completed').textContent = tasksCompleted;
  document.getElementById('study-time').textContent = `${totalStudyMinutes}m`;
}

function completePomodoro() {
  pomodoroCount++;
  totalStudyMinutes += 25; 
  updateStats();
}

function completeTask() {
  tasksCompleted++;
  updateStats();
}

shrink_btn.addEventListener("click", () => {
  document.body.classList.toggle("shrink");
  setTimeout(moveActiveTab, 400);

  shrink_btn.classList.add("hovered");

  setTimeout(() => {
    shrink_btn.classList.remove("hovered");
  }, 500);
});

search.addEventListener("click", () => {
  document.body.classList.remove("shrink");
  search.lastElementChild.focus();
});

function changeLink() {
  sidebar_links.forEach((sideLink) => sideLink.classList.remove("active"));
  this.classList.add("active");

  activeIndex = this.dataset.active;

  moveActiveTab();
}

sidebar_links.forEach((link) => link.addEventListener("click", changeLink));

function showTooltip() {
  let tooltip = this.parentNode.lastElementChild;
  let spans = tooltip.children;
  let tooltipIndex = this.dataset.tooltip;

  Array.from(spans).forEach((sp) => sp.classList.remove("show"));
  spans[tooltipIndex].classList.add("show");

  tooltip.style.top = `${(100 / (spans.length * 2)) * (tooltipIndex * 2 + 1)}%`;
}

tooltip_elements.forEach((elem) => {
  elem.addEventListener("mouseover", showTooltip);
});

const themeToggleButton = document.querySelector(".modetogglebutton");
const themeTogContainer = document.querySelector(".modetogcontainer");

// Check localStorage for saved theme preference
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggleButton.classList.add("active");
}

// Event listener to toggle the theme and save preference
themeTogContainer.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggleButton.classList.toggle("active");

  // Save the current theme preference to localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});




const inputBox = document.getElementById("input-box");
const todolistcontainer = document.getElementById("todo-list-container");

function addtask(){
  if(inputBox.value === ''){
    alert("You must write something!");
  }
  else{
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    todolistcontainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    

  }

  inputBox.value = '';
  saveData();
}
inputBox.addEventListener("keydown", function(e){
  if(e.key === "Enter"){
      addtask();
  }
});




todolistcontainer.addEventListener("click",function(e){
  if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked");
   
     if(e.target.classList.contains("checked")){
      completeTask();
     }
     saveData();
  }
  else if(e.target.tagName === "SPAN"){
    e.target.parentElement.remove();
    saveData();
  }
}, false);

function saveData(){
  localStorage.setItem("data", todolistcontainer.innerHTML);
}

function showTaskList(){
   todolistcontainer.innerHTML = localStorage.getItem("data");

}

showTaskList();


// Pomodoro Timer 

let studyTitle = document.getElementById('study');
let breakTitle = document.getElementById('break');

let studyTime = 25;
let breakTime = 5;

let seconds = "00"

let TimerID;

window.onload = () => {
    document.getElementById('minutes').innerHTML = studyTime;
    document.getElementById('seconds').innerHTML = seconds;

    studyTitle.classList.add('active');
}
// start

function start() {
    // switch buttons
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    // changes the time 
    seconds = 59;

    let studyMinutes = studyTime - 1;
    let breakMinutes = breakTime - 1;

    breakCount = 0;

    // countdown
    let timerFunction = () => {
        //change the display
        document.getElementById('minutes').innerHTML = studyMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        // start
        seconds = seconds - 1;

        if(seconds === 0) {
            studyMinutes = studyMinutes - 1;
            if(studyMinutes === -1 ){
                if(breakCount % 2 === 0) {
                    // start break
                    studyMinutes = breakMinutes;
                    breakCount++

                    // change the panel
                    studyTitle.classList.remove('active');
                    breakTitle.classList.add('active');   
                    // adds to pomodoro count
                    completePomodoro();
                }else {
                    // continue work
                    studyMinutes = studyTime;
                    breakCount++

                    // change the panel
                    breakTitle.classList.remove('active');
                    studyTitle.classList.add('active');
                }
            }
            seconds = 59;
        }
    }

    // start countdown
    TimerID = setInterval(timerFunction, 1000); 
}


function reset(){

  // switches the buttons
  document.getElementById('start').style.display = "block";
  document.getElementById('reset').style.display = "none";

  // stops the timer
  clearInterval(TimerID);


  //resets the time variables

  studyMinutes = studyTime
  breakMinutes = breakTime
 seconds= "00"

// resets cycle
breakCount= 0;

 // display

document.getElementById('minutes').innerHTML = studyMinutes;
document.getElementById('seconds').innerHTML = seconds;

// changes back active tab
breakTitle.classList.remove('active');
studyTitle.classList.add('active');


}

//quotes
let currentIndex = 0;  
const quotes = document.querySelectorAll('.Quotestext');  // Get all quote divs

function showQuotes() {
  for (let i = 0; i < quotes.length; i++) {
    setTimeout(() => {
      quotes.forEach(quote => quote.style.display = 'none');
      quotes[i].style.display = 'block';
    }, i * 40000); 
  }
}
showQuotes();

//help
function validateForm() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;
  var formMessage = document.getElementById('form-message');

  if (name === "" || email === "" || message === "") {
    formMessage.textContent = "Please fill out all fields.";
    return false;  // Prevent form submission
  }

  // Check if email is valid
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    formMessage.textContent = "Please enter a valid email address.";
    return false;
  }

  // If everything is valid
  formMessage.textContent = "Thank you for your message! We will get back to you soon.";
  formMessage.style.color = "black";
  return false;  // Simulate form submission for demo purposes
}




function toggleDetails(h3Element){

  const cdetails = h3Element.nextElementSibling

  const boxIconArrow = h3Element.querySelector('box-icon');

  const alldetails = document.querySelectorAll('.details');

  const allboxIonArrows = document.querySelectorAll('box-icon');


  //  Closes others when u click on one
  alldetails.forEach( cdetails => {
    if (cdetails !== h3Element.nextElementSibling){
      cdetails.style.height = "0";
    }
  })

  allboxIonArrows.forEach( boxIconArrow => {
    if (boxIconArrow !== h3Element.nextElementSibling)
      boxIconArrow.style.transform = "rotate(0deg)";
  })
 


  //  Toggle 

  if (cdetails.style.height === "100px") {
    cdetails.style.height = "0"; 
  } else {
    cdetails.style.height = "100px"; 
  }


  if (cdetails.style.height === "100px"){
    boxIconArrow.style.transform = "rotate(90deg)";

  }else {
    boxIconArrow.style.transform = "rotate(0deg)";
  }


}


// Focus Mode

document.querySelector('.focusbut').addEventListener('click', focus);

function focus() {
  const focuscontainer = document.querySelector('.focuscontainer');
  const focusbutton = document.querySelector('.focusbut');
  const secondpomo = document.querySelector('.pomocontainer2');
  const focusText = document.getElementById("focus-text");
  reset();
  focuscontainer.classList.add('focused');

  secondpomo.style.opacity = "100%";

  void focusText.offsetWidth;

 setTimeout( () => {

    focusText.classList.add("animate");
    focusText.style.borderRight = "0.15em solid var(--accent-color)"; 
   },900);
   
   
   focusText.classList.remove("animate");
   focusText.addEventListener("animationend", (event) => {
    if (event.animationName === "typing") { 
      focusText.style.borderRight = "none";
    }

  });


  document.addEventListener('keydown', (e) => { 
    if (e.key === 'Escape') {
      secondpomo.style.opacity = "0";
      focuscontainer.classList.remove('focused');
    }
  });
}



// SECOND POMODORO TIMER



let studyTitle2 = document.getElementById('study2');
let breakTitle2 = document.getElementById('break2');

let studyTime2 = 25;
let breakTime2 = 5;

let seconds2 = "00"

let TimerID2;

window.onload = () => {
    document.getElementById('minutes2').innerHTML = studyTime2;
    document.getElementById('seconds2').innerHTML = seconds2;

    studyTitle2.classList.add('active');
}
// start

function start2() {
    // switch buttons
    document.getElementById('start2').style.display = "none";
    document.getElementById('reset2').style.display = "block";

    // changes the time 
    seconds2 = 59;

    let studyMinutes2 = studyTime2 - 1;
    let breakMinutes2 = breakTime2 - 1;

    breakCount2 = 0;

    // countdown
    let timerFunction = () => {
        //change the display
        document.getElementById('minutes2').innerHTML = studyMinutes2;
        document.getElementById('seconds2').innerHTML = seconds2;

        // start
        seconds2 = seconds2 - 1;

        if(seconds2 === 0) {
            studyMinutes2 = studyMinutes2 - 1;
            if(studyMinutes2 === -1 ){
                if(breakCount2 % 2 === 0) {
                    // start break
                    studyMinutes2 = breakMinutes2;
                    breakCount2++

                    // change the panel
                    studyTitle2.classList.remove('active');
                    breakTitle2.classList.add('active');   
                    // adds to pomodoro count
                    completePomodoro2();
                }else {
                    // continue work
                    studyMinutes2 = studyTime2;
                    breakCount2++

                    // change the panel
                    breakTitle2.classList.remove('active');
                    studyTitle2.classList.add('active');
                }
            }
            seconds2 = 59;
        }
    }

    // start countdown
    TimerID2 = setInterval(timerFunction, 1000); 
}


function reset2(){

  // switches the buttons
  document.getElementById('start2').style.display = "block";
  document.getElementById('reset2').style.display = "none";

  // stops the timer
  clearInterval(TimerID2);


  //resets the time variables

  studyMinutes2 = studyTime2
  breakMinutes2 = breakTime2
 seconds2= "00"

// resets cycle
breakCount2= 0;

 // display

document.getElementById('minutes2').innerHTML = studyMinutes2;
document.getElementById('seconds2').innerHTML = seconds2;

// changes back active tab
breakTitle2.classList.remove('active');
studyTitle2.classList.add('active');


}


  const DashboardElement= document.querySelectorAll('.dashboardelement');
  const LeftSideCont = document.querySelector('.leftsidecont');
  const CenterCont = document.querySelector('.centercont');
  const  RightSideCont = document.querySelector('.rightsidecont');



  function checkScreenSize() {
    if (window.innerWidth <= 1300 && window.innerWidth >= 400) {
      DashboardElement.forEach(element => {
        element.addEventListener('mouseenter', hoverEffect);
        element.addEventListener('mouseleave', leaveEffect);
      });
    } else {
      DashboardElement.forEach(element => {
        element.removeEventListener('mouseenter', hoverEffect);
        element.removeEventListener('mouseleave', leaveEffect);
      });
    }
  }
  function hoverEffect(e) {
   DashboardElement.forEach(element => element.classList.remove('hovered'));
   e.target.classList.add('hovered');

  }

  function leaveEffect(e) {
    e.target.classList.remove('hovered');
    CenterCont.classList.add('hovered');
  }

  // Initial check when page loads
  checkScreenSize();

  // Recheck on window resize
  window.addEventListener('resize', checkScreenSize);



  const dashboard = document.querySelector('.dashboardcont');

function adjustDashboard() {
  const dashboardWidth = dashboard.scrollWidth;
  const viewportWidth = window.innerWidth;

  if (dashboardWidth > viewportWidth) {
    const overflow = (dashboardWidth - viewportWidth) / 2; // Calculate overflow
    dashboard.style.transform = `translateX(-${overflow}px)`; // Adjust position
  } else {
    dashboard.style.transform = 'translateX(0)'; // Reset if no overflow
  }
}

// Run on window resize and initial load
window.addEventListener('resize', adjustDashboard);
adjustDashboard();