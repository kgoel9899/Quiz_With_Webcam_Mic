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
      save.classList.remove("hide");
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
  firstContent.classList.remove("hide");
  firstContent.children[0].innerText = "Successfully Submitted";
  firstContent.children[1].classList.add("hide");
  qna.classList.add("hide");
  topp[1].classList.remove("hide");
  rem = maxi;
  mediaRecorder.stop();
}
function final() {
  topp[1].classList.add("hide");
  topp[2].classList.remove("hide");
  headName.innerText = "Name: " + namee.value;
  headScore.innerText = "Score: " + score + " out of " + questions.length;
}
function download() {
  const blob = new Blob(recordedBlobs, {type: "video/webm"});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "test.webm";
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
    q: "Inside which HTML element do we put the JavaScript?",
    a: [
      { text: "javascript", correct: false },
      { text: "script", correct: true },
      { text: "js", correct: false },
      { text: "jQuery", correct: false }
    ]
  },
  {
    q: "Where is the correct place to insert JavaScript?",
    a: [
      { text: "The Head Section", correct: false },
      { text: "The Body Section", correct: false },
      { text: "In an External File", correct: false },
      { text: "All of the Above", correct: true }
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
    q: 'How do you write "Hello World" in an alert box?',
    a: [
      { text: 'msg("Hello World");', correct: false },
      { text: 'prompt("Hello World");', correct: false },
      { text: 'alertBox("Hello World");', correct: false },
      { text: 'alert("Hello World");', correct: true }
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
    q: 'How do you call a function named "myFunction"?',
    a: [
      { text: "call myFunction()", correct: false },
      { text: "read myFunction()", correct: false },
      { text: "myFunction()", correct: true },
      { text: "run.myFunction()", correct: false }
    ]
  },
  {
    q: "How do you write an IF statement in JavaScript?",
    a: [
      { text: "if (i === 5)", correct: true },
      { text: "if i = 5 then", correct: false },
      { text: "if i === 5 then", correct: false },
      { text: "if (i = 5)", correct: false }
    ]
  },
  {
    q: "!= means what in javascript?",
    a: [
      { text: "Or", correct: false },
      { text: "And", correct: false },
      { text: "Plus and Equal To", correct: false },
      { text: "Not Equal To", correct: true }
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
  }
];