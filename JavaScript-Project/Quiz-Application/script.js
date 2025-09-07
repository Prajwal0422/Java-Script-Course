const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "Which company developed Java?",
    options: ["Microsoft", "Sun Microsystems", "Google", "IBM"],
    answer: "Sun Microsystems"
  },
  {
    question: "Which keyword is used to create a class in Java?",
    options: ["function", "class", "define", "object"],
    answer: "class"
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

function startTimer() {
  timeLeft = 30;
  document.getElementById("time").textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function showQuestion() {
  clearInterval(timer);
  startTimer();

  let q = questions[currentQuestion];
  document.getElementById("question").textContent = q.question;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    let btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(option);
    optionsDiv.appendChild(btn);
  });

  // disable next button until an answer is chosen
  document.getElementById("next-btn").disabled = true;
}

function selectAnswer(option) {
  let correctAnswer = questions[currentQuestion].answer;
  if (option === correctAnswer) {
    score++;
  }
  // enable next button once an answer is selected
  document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("result-box").style.display = "block";

  // show score
  document.getElementById("score").textContent = `${score} / ${questions.length}`;

  // handle high score
  let highscore = localStorage.getItem("highscore") || 0;
  if (score > highscore) {
    localStorage.setItem("highscore", score);
    highscore = score;
  }
  document.getElementById("highscore").textContent = highscore;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("quiz-box").style.display = "block";
  document.getElementById("result-box").style.display = "none";
  showQuestion();
}

window.onload = () => {
  showQuestion();
};
