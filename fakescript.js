// refers to quizBody div.
var quizBody = document.getElementById("quizBody");

// variables that manipulate the startquizdiv, startquizbutton, savedhighscores (function).
var startQuizDiv = document.getElementById("startQuizDiv");
var startQuizButton = document.getElementById("startQuizButton");
var savedHighscores = document.getElementById("savedHighscores");
savedHighscores.addEventListener("click", savedHighscores);

// submitScoreButton- a button for submitting the score.
var submitScoreButton = document.getElementById("submitScoreButton");

// efinalscoreEl is an element which contains the final score.
var finalScoreEl = document.getElementById("finalScoreEl");


// highscoreDiv refers tot he div that holds the high score display & the header.
var highscoreDiv = document.getElementById("highscoreDiv");
var highscoreDisplayScore = document.getElementById("highscoreDisplayScore");
var highscoreDisplayName = document.getElementById ("highscoreDisplayName");
var highScoreHeader = document.getElementById ("highScoreHeader");


// initials - refers to the input user logs initials.
var initials = document.getElementById ("initials");

var endGameBtns = document.getElementById ("endGameBtns");

// refers to gameoverDiv.
var gameoverDiv = document.getElementById("gameoverDiv");

// quizTimer - displays amount of time remaining.
var quizTimer = document.getElementById ("quizTimer");

// questionsEl - refers to the question element.
var questionsEl = document.getElementById("questionsEl");

var showHighScore = document.getElementById("showHighScore");

// questionscontainer- refers to questions container. This container has buttons for A,B,C,D and results.
var questionscontainer = document.getElementById("questionscontainer");
var buttonA = document.getElementById("A");
var buttonB = document.getElementById("B");
var buttonC = document.getElementById("C");
var buttonD = document.getElementById("D");
// add result id to html
var result = document.getElementById("result"); 

// Quiz questions
 var quizQuestions = [{
  question: "What does WWW stand for?",
  choiceA : "A. Word Walt Water",
  choiceB : "B. When We Would",
  choiceC : "C. World Wide Web",
  choiceD : "D.None of the above",
  correctAnswer: "C"
  },
   {
  question: " What are Arrays in JavaScript used to store?",
  choiceA : "A. Numbers & strings",
  choiceB : "B. Other arrays",
  choiceC : "C. Booleans",
  choiceD : "D. All of the above",
  correctAnswer: "D"
 },
 {
  question : "Commonly used data types do not include:",
  choiceA: "A. strings",
  choiceB: "B. booleans",
  choiceC: "C. numbers",
  choiceD: "D. alerts",
  correctAnswer: "D"
},
{
  question : "What's the HTML tag for creating an ordered list?",
  choiceA:"A. <p>",
  choiceB: "B. <ol>",
  choiceC:"C. <ul>",
  choiceD: "D. None of the above",
  correctAnswer: "B"
}, 
{
  question : "String values must be enclosed within ______ when being assigned to variables.",
  choiceA: "A. commas",
  choiceB: "B. curly brackets",
  choiceC: "C. quotes",
  choiceD: "D. parentheses",
  correctAnswer: "C"
},
];


// global variables
var finalQuestionIndex = quizQuestions.length;
var timeLeft = 70; // initial time
var timerInterval;
var score = 0;
var correct;
// add currentQuestionIndex to html
var currentQuestionIndex = 0; 

// this function generates questions & answers
function generateQuizQuestion(){
  if (currentQuestionIndex===finalQuestionIndex){
    return showHighScore();
  }
  var currentQuestion = quizQuestions[currentQuestionIndex];
  
  questionsEl.textContent = currentQuestion.question;
  buttonA.textContent = currentQuestion.choiceA;
  buttonB.textContent = currentQuestion.choiceB;
  buttonC.textContent = currentQuestion.choiceC;
  buttonD.textContent = currentQuestion.choiceD;
};


// start quiz starts the timer & displays first question
function startQuiz() {
  questionscontainer.style.display = "block";
  startQuizDiv.style.display = "none";
  gameoverDiv.style.display = "none";
  generateQuizQuestion();

  // timer

  timerInterval = setInterval(function() {
    timeLeft--;
    quizTimer.textContent = "Time left: " + timeLeft;

    if(timeLeft === 0) {
      clearInterval(timerInterval);
      return showHighScore();
    }
  }, 1000);
  quizBody.style.display = "block";
}
function showHighScore() {
  quizBody.style.display = "none"
  gameoverDiv.style.display = "flex";
  clearInterval(timerInterval);
  highscoreInputName.value = "";
  finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}



// click button to show high scores
submitScoreButton.addEventListener("click", function savedHighscores() {
  if(highscoreInputName.value === "") {
    alert("Initials cannot be blank");
    return false;
  } else {
    var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    var currentUser = highscoreInputName.value.trim();
    var currentHighscore = {
      name: currentUser,
      score: score
    };
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    gameoverDiv.style.display = "flex";

    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
  };
});


function generatesavedHighscores() {
  const savedHighscores= JSON.parse(localStorage.getItem("savedHighscores")) || [];
  highscoreDisplayScore.innerHTML = "";
  highscoreDisplayName.innerHTML = "";
 for (var i = 0; i < savedHighscores.length; i++) {
  var newScoreSpan = document.createElement("li");
  var newNameSpan = document.createElement("li");
  newScoreSpan.textContent = savedHighscores[i].score;
  newNameSpan.textContent = savedHighscores[i].name;
  highscoreDisplayName.appendChild(newNameSpan);
  highscoreDisplayScore.appendChild(newScoreSpan);
}

}


// Function to check selected answer
function checkAnswer(selectedAnswer) {
  correct = quizQuestions[currentQuestionIndex].correctAnswer;

  if (selectedAnswer === correct && currentQuestionIndex !== finalQuestionIndex){ 
    score++;
    alert("That is correct!")
    currentQuestionIndex++;
    generateQuizQuestion();
  
  } else if (selectedAnswer !== correct && currentQuestionIndex !== finalQuestionIndex){
    alert("That Is Incorrect.")
    currentQuestionIndex++;
    timeLeft -= 10; // Time penalty for incorrect answer
    generateQuizQuestion()
  } else{
    showScore();
  }

}
// this function displays high score page
function generateHighscores(){
  startQuizDiv.style.display = "none"
  gameoverDiv.style.display = "none";
  highscoreContainer.style.display = "flex";
  highscoreDisplayScore.style.display = "block";
  endGameBtns.style.display = "flex";
  generateHighscores();
}


// this functions starts quiz over
function replayQuiz(){
  highscoreContainer.style.display = "none";
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "flex";
  timeLeft = 70;
  score = 0;
  currentQuestionIndex = 0;
}


// function saves user intials and score
function submitScore() {
  var initials = highscoreInputName.value.trim(); // Get user initials
    if (initials === "") {
      alert("Initials cannot be blank");
      return false;
    } else {
      // ... (your existing code for saving score)

      // Save initials along with the score
      var currentHighscore = {
          name: initials,
          submitScore: score
      }      
   }
}

// event listeners for buttons
startQuizButton.addEventListener("click", startQuiz);
submitScoreButton.addEventListener("click", submitScore);
buttonA.addEventListener("click", function () { checkAnswer('A'); });
buttonB.addEventListener("click", function () { checkAnswer('B'); });
buttonC.addEventListener("click", function () { checkAnswer('C'); });
buttonD.addEventListener("click", function () { checkAnswer('D'); });



function init() {
  questionscontainer.style.display = "none";
} 

init();

/* var quizBody = document.getElementById("quiz");
var startQuizDiv = document.getElementById("startpage");
var highscoreDiv = document.getElementById("highscore-page");
var startQuizButton = document.getElementById("startbtn");
var submitScoreButton = document.getElementById("submitScore");
var finalScoreEl = document.getElementById("finalScore");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayScore = document.getElementById("highscore-score");
var highscoreDisplayName = document.getElementById ("highscore-initials")
var highscoreContainer = document.getElementById ("highscoreContainer")
var Username = document.getElementById ("Username")
var endGameBtns = document.getElementById ("endGameBtns")
var endQuiz = document.getElementById ("endQuiz")
var gameoverDiv = document.getElementById("gameover");
var quizTimer = document.getElementById ("timer");
var questionsEl = document.getElementById("questions");
var savedHighscores = document.getElementById("savescore"); */

  // quizBody.style.display = "none"
  // gameoverDiv.style.display ="flex"
  // clearInterval (timerInterval);
  // highscoreInputName.value = "";
  // finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!"