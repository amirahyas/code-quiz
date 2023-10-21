var quizBody = document.getElementById("quiz");
var startQuizDiv = document.getElementById("startpage");
var highscoreDiv = document.getElementById("highscore-page");
var startQuizButton = document.getElementById("startbtn");
var submitScoreButton = document.getElementById("submitScore");
var finalScoreEl = document.getElementById("finalScore");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayScore = document.getElementById("highscore-score");
var highscoreDisplayName = document.getElementById ("highscore-initials")
var gameoverDiv = document.getElementById("gameover");
var quizTimer = document.getElementById ("timer");
var questionsEl = document.getElementById("questions");
var saveScoreButton = document.getElementById("savescore");
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
function generatequizQuestion(){

  if (currentQuestionIndex===finalQuestionIndex){
    return showScore();
  }

  var currentQuestion = quizQuestions[currentQuestionIndex];
  
 questionsEl.textContent = currentQuestion.question;
 buttonA.textContent = currentQuestion.choiceA;
 buttonB.textContent = currentQuestion.choiceB;
 buttonC.textContent = currentQuestion.choiceC;

 buttonD.textContent = currentQuestion.choiceD;

  // // Amirah, the line below is undefined. 
  // questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
  // buttonA.innerHTML = currentQuestion.choiceA;
  // buttonB.innerHTML = currentQuestion.choiceB;
  // buttonC.innerHTML = currentQuestion.choiceC;
  // buttonD.innerHTML = currentQuestion.choiceD;
};


// start quiz starts the timer & displays first question
function startQuiz() {

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

  // Amirah, the line below is undefined. You need to create the finalScoreE1 element in the html.
  finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}


// click button to show high scores
submitScoreButton.addEventListener("click", function highscore() {
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


function generateHighscores() {
  const savedHighscores= JSON.parse(localStorage.getItem("savedHighscores")) || [];
  highscoreDisplayScore.innerHTML = "";
  highscoreDisplayName.innerHTML = "";
 for (var i = 0; i < savedHighscores.length; i++) {
  var newScoreSpan = document.createElement("li");
  var newNameSpan = document.createElement("li");
  newScoreSpan.textContent = highscores[i].score;
  newNameSpan.textContent = highscores[i].name;
  highscoreDisplayName.appendChild(newNameSpan);
  highscoreDisplayScore.appendChild(newScoreSpan);
}

}


// Function to check selected answer
function checkAnswer(selectedAnswer) {
  correct = quizQuestions[currentQuestionIndex].correctAnswer;
}
function checkAnswerA() {
  checkAnswer('A');
}
function checkAnswerB() {
  checkAnswer('B');
}
function checkAnswerC() {
  checkAnswer('C');
}
function checkAnswerD() {
  checkAnswer('D');



  // Amirah, where is quizQuestionsIndex declared.  This variable does not exist.  Therefore, it cannot be called.
  if (selectedAnswer === correct && currentQuestionIndex !== finalQuestionIndex){ 
    score++;
    alert("That is correct!")
    currentQuestionIndex++;
    generatequizQuestion();
  
  } else if (selectedAnswer !== correct && currentQuestionIndex !== finalQuestionIndex){
    alert("That Is Incorrect.")
    currentQuestionIndex++;
    timeLeft -= 10; // Time penalty for incorrect answer
  } else{
    showScore();
  }
};


// this function times quiz out
    function endQuiz() {
      clearInterval(timerInterval);
      questionContainer.innerHTML = "Quiz over!";
      submitScoreButton.style.display = "block";
}


// this function displays high score page
function showHighscore(){
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
function saveScore() {
  quizBody.style.display = "none"
  gameoverDiv.style.display ="flex"
  clearInterval (timerInterval);
  highscoreInputName.value = "";
  finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!"

}


// event listeners for buttons
startQuizButton.addEventListener("click", startQuiz);
submitScoreButton.addEventListener("click", submitScore);
saveScoreButton.addEventListener("click", saveScore);
buttonA.addEventListener("click", checkAnswer('A'));
buttonB.addEventListener("click", checkAnswer ('B'));
buttonC.addEventListener("click", checkAnswer ('C'));
buttonD.addEventListener("click", checkAnswer('D'));

function init() {
  questionscontainer.style.display = "none";
}

init();