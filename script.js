let rem;
let maxi;
let one_sec;
let score = 0;
let num;
let easy = 50;
let medium = 25;
let hard = 10;
let start = document.getElementById("start");
let qna = document.getElementById("qna");
let ques = document.getElementById("ques");
let options = document.getElementById("options");
let timer = document.getElementById("timer");
let firstContent = document.getElementById("firstContent");
let topp = document.getElementsByClassName("top");
let one = document.getElementById("1");
let two = document.getElementById("2");
let three = document.getElementById("3");
let namee = document.getElementById("namee");
let submit = document.getElementById("submit");
let headName = document.getElementById("headName");
let headScore = document.getElementById("headScore");
let video = document.getElementById("video");
let save = document.getElementById("save");
let mediaRecorder;
let recordedBlobs;
let constraints = { 
  audio: true, 
  video: true
};
navigator.mediaDevices.getUserMedia(constraints)
  .then(function(mediaStreamObj) {
    one.disabled = false;
    two.disabled = false;
    three.disabled = false;
    let options = {mimeType: "video/webm;codecs=vp9,opus"};
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    console.error(`${options.mimeType} is not supported`);
    options = {mimeType: "video/webm;codecs=vp8,opus"};
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.error(`${options.mimeType} is not supported`);
      options = {mimeType: "video/webm"};
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not supported`);
        options = {mimeType: ""};
      }
    }
  }
    mediaRecorder = new MediaRecorder(mediaStreamObj, options);
    video.srcObject = mediaStreamObj;
    video.play();
    recordedBlobs = [];
    mediaRecorder.ondataavailable = function(event) {
      if (event.data && event.data.size > 0) recordedBlobs.push(event.data);
    }
    mediaRecorder.start();
    mediaRecorder.onstop = (ev)=>{
      video.classList.add("hide");
      mediaStreamObj.getTracks().forEach(function(track) {
        track.stop();
      });
    }
  })
  .catch(function(err) { 
      console.log(err.name, err.message); 
  });
function choose(id) {
  if(id === "1") maxi = easy;
  else if(id === "2") maxi = medium;
  else maxi = hard;
  startGame();
}
function startGame() {
  num = 0;
  rem = maxi;
  score = 0;
  topp[0].classList.add("hide");
  firstContent.classList.add("hide");
  start.classList.add("hide");
  qna.classList.remove("hide");
  timer.classList.remove("hide");
  show();
}
function show() {
  while (options.firstChild) options.removeChild(options.firstChild);
  rem = maxi;
  clearInterval(one_sec);
  timing();
  if(num == questions.length) gameOver();
  else {
    let question = questions[num];
    ques.innerText = question.q;
    for(let i = 0; i < question.a.length; i++) {
      let button = document.createElement("button");
      button.innerText = question.a[i].text;
      button.classList.add("btn");
      button.classList.add("btn-success");
      button.classList.add("add");
      button.addEventListener("click", curr);
      button.style.display = "block";
      options.appendChild(button);
    }
    num++;
  }
}
function curr(clicked) {
  let question = questions[num - 1];
  for(let i = 0; i < question.a.length; i++) {
    if(question.a[i].text === clicked.target.innerText) {
      if(question.a[i].correct === true) score++;
    }
  }
  show();
}
function gameOver() {
  clearInterval(one_sec);
  timer.classList.add("hide");
  qna.classList.add("hide");
  topp[1].classList.remove("hide");
  rem = maxi;
  mediaRecorder.stop();
}
function final() {
  firstContent.classList.remove("hide");
  firstContent.children[0].innerText = "Successfully Submitted";
  firstContent.children[1].classList.add("hide");
  topp[1].classList.add("hide");
  topp[2].classList.remove("hide");
  headName.innerText = "Name: " + namee.value;
  headScore.innerText = "Score: " + score + " out of " + questions.length;
  save.classList.remove("hide");
}
function download() {
  const blob = new Blob(recordedBlobs, {type: "video/webm"});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = namee.value + ".webm";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}
function timing() {
  timer.innerHTML = "Time Remaining: " + rem + " seconds";
  if (rem <= 0) {
    rem = maxi;
    show();
  }
  else {
    rem--;
    one_sec = setTimeout(timing, 1000);
  }
}
let questions = [
  {
  
    q: "HTML stands for?",
    a: [
      { text: "High Text Markup Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Tabular Markup Language", correct: false },
      { text: "None of these", correct: false }
    ]
  },
  {

    q: "Correct HTML tag for the largest heading is?",
    a: [
      { text: "<head>", correct: false },
      { text: "<heading>", correct: false },
      { text: "<h6>", correct: false },
      { text: "<h1>", correct: true }
    ]
  },
  {
    q: "The external JavaScript file must contain the script tag.",
    a: [
      { text: "True", correct: false },
      { text: "False", correct: true }
    ]
  },
  {
    q: 'www is based on which model?',
    a: [
      { text: 'Local-server', correct: false },
      { text: 'Client-server', correct: true },
      { text: '3-tier', correct: false },
      { text: 'None of these', correct: false }
    ]
  },
  {
    q: "How do you create a function in JavaScript?",
    a: [
      { text: "function myFunction()", correct: true },
      { text: "function = myFunction()", correct: false },
      { text: "make.function.myFunction()", correct: false },
      { text: "function:myFunction()", correct: false }
    ]
  },
  {
    q: 'How can you open a link in a new browser window?',
    a: [
      { text: "< a href = 'url' target = 'new'>", correct: false },
      { text: "<a href = 'url'.new>", correct: false },
      { text: "<a href = 'url' target= '_blank'>", correct: true },
      { text: "<a href = 'url' target ='open'>", correct: false }
    ]
  },
  {
    q: "Can the element <First> be replaced with <first>?",
    a: [
      { text: "No, they represent different elements altogether", correct: false },
      { text: "Both are same", correct: true },
      { text: "First is only correct", correct: false },
      { text: "first is only correct", correct: false }
    ]
  },
  {
    q: "What does error 404 or Not Found error while accessing a URL mean?",
    a: [
      { text: "The server could not find the requested URL", correct: true },
      { text: "Requested HTML file is not available", correct: false },
      { text: "The path to the interpreter of the script is not valid", correct: false },
      { text: "The requested HTML file does not have sufficient permissions", correct: false }
    ]
  },
  {
    q: "What Characters Contains an Array?",
    a: [
      { text: "< >", correct: false },
      { text: "{ }", correct: false },
      { text: "[ ]", correct: true },
      { text: "# #", correct: false }
    ]
  },
  {
    q: "Which of these is a client server application?",
    a: [
      { text: "Web browsing", correct: false },
      { text: "E-mail", correct: false },
      { text: "Internet Chat", correct: false },
      { text: "All of the above", correct: true }
    ]
  }
];