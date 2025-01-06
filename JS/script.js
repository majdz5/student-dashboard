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


