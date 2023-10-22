var quizBody = document.getElementById("quizBody");
var startQuizDiv = document.getElementById("startQuizDiv");
var highscoreDiv = document.getElementById("highscoreDiv");
var startQuizButton = document.getElementById("startQuizButton");
var submitScoreButton = document.getElementById("submitScoreButton");
var finalScoreEl = document.getElementById("finalScoreEl");
var highscoreInputName = document.getElementById("highscoreInputName");
var highscoreDisplayScore = document.getElementById("highscoreDisplayScore");
var highscoreDisplayName = document.getElementById ("highscoreDisplayName")
var highscoreContainer = document.getElementById ("highscoreContainer");
var initials = document.getElementById ("initials");
var endGameBtns = document.getElementById ("endGameBtns");
var endQuiz = document.getElementById ("endQuiz")
var gameoverDiv = document.getElementById("gameoverDiv");
var quizTimer = document.getElementById ("quizTimer");
var questionsEl = document.getElementById("questionsEl");
var savedHighscores = document.getElementById("savedHighscores");
var buttonA = document.getElementById("A");
var buttonB = document.getElementById("B");
var buttonC = document.getElementById("C");
var buttonD = document.getElementById("D");
var currentQuestionIndex = 0;

var questionscontainer = document.getElementById("questionscontainer");

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


// this function generates questions & answers
function generateQuizQuestion(){
  if (currentQuestionIndex===finalQuestionIndex){
    return showScore();
  }

  var currentQuestion = quizQuestions[currentQuestionIndex];
  
  questionsEl.textContent = currentQuestion.question;
  buttonA.textContent = currentQuestion.choiceA;
  buttonB.textContent = currentQuestion.choiceB;
  buttonC.textContent = currentQuestion.choiceC;
  buttonD.textContent = currentQuestion.choiceD;
};


// start quiz starts the timer & displays first question
function startQuizDiv() {

  questionscontainer.style.display = "block";
  startQuizDiv.style.display = "none";
  gameoverDiv.style.display = "none";
  generatequizQuestion();

  // timer
  timerInterval = setInterval(function() {
    timeLeft--;
    quizTimer.textContent = "Time left: " + timeLeft;

    if(timeLeft === 0) {
      clearInterval(timerInterval);
      return showScore();
    }
  }, 1000);
  quizBody.style.display = "block";
}


// Function to show final score page
function showScore(){
  quizBody.style.display = "none"
  gameoverDiv.style.display = "flex";
  clearInterval(timerInterval);
  highscoreInputName.value = "";
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
    generatequizQuestion();
  
  } else if (selectedAnswer !== correct && currentQuestionIndex !== finalQuestionIndex){
    alert("That Is Incorrect.")
    currentQuestionIndex++;
    timeLeft -= 10; // Time penalty for incorrect answer
    generatequizQuestion()
  } else{
    showScore();
  }
}

// this function times quiz out
function endQuiz() {
  clearInterval(timerInterval);
  questionscontainer.innerHTML = "Quiz over!";
  submitScoreButton.style.display = "block";
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
startQuizButton.addEventListener("click", startQuizDiv);
submitScoreButton.addEventListener("click", submitScore);
savedHighscores.addEventListener("click", saveScore);
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