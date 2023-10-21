var quizBody = document.getElementById("quiz");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscore-page");
var startQuizButton = document.getElementById("startbtn");
var submitScoreButton = document.getElementById("submitScore");
var initialsInput = document.getElementById("initials");
var finalScoreE1 = document.getElementById("finalScore");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayScore = document.getElementById("highscore-score");
var gameoverDiv = document.getElementById("gameover");
var quizTimer = document.getElementById ("timer");
var questionsE1 = document.getElementById("questionsE1");
var saveScoreButton = document.getElementById("savescore");
var buttonA = document.getElementById("A");
var buttonB = document.getElementById("B");
var buttonC = document.getElementById("C");
var buttonD = document.getElementById("D");


// Quiz questions
 var quizQuestions = [{
  question: "What does WWW stand for?",
  choiceA: "Word Walt Water",
  choiceB: "When We Would",
  choiceC:"World Wide Web",
  choiceD: "None of the above",
  correctAnswer: "C"
  },
   {
  question: "What are Arrays in JavaScript used to store?",
  choiceA: "Numbers & strings",
  choiceB: "Other arrays",
  choiceC:"Booleans",
  choiceD: "All of the above",
  correctAnswer: "D"
 },
 {
 question : "Commonly used data types do not include:",
  choiceA: "strings",
  choiceB: "booleans",
  choiceC: "numbers",
  choiceD: "alerts",
  answer: "D"

  // Amirah, add a correctAnswer here.
},
{
  question : "What's the HTML tag for creating an ordered list?",
  choiceA:"<p>",
  choiceB: "<ol>",
  choiceC:"<ul>",
  choiceD: "None of the above",
  correctAnswer: "C"
}, 
{
  question : "String values must be enclosed within ______ when being assigned to variables.",
  choiceA: "commas",
  choiceB: "curly brackets",
  choiceC: "quotes",
  choiceD: "parentheses",
  correctAnswer: "C"
},
];


// global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
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

  // Amirah, the line below is undefined. 
  questionsE1.innerHTML = "<p>" + currentQuestion.question + "</p>";
  buttonA.innerHTML = currentQuestion.choiceA;
  buttonB.innerHTML = currentQuestion.choiceB;
  buttonC.innerHTML = currentQuestion.choiceC;
  buttonD.innerHTML = currentQuestion.choiceD;
};


// start quiz starts the timer & displays first question
function startQuiz() {

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
  var newScoreSpan = document.createElement("li");
  var newNameSpan = document.createElement("li");
  newScoreSpan.textContent = highscores[i].score;
  newNameSpan.textContent = highscores[i].name;
  highscoreDisplayName.appendChild(newNameSpan);
  highscoreDisplayScore.appendChild(newScoreSpan);

}


// Function to check selected answer
function checkAnswer(selectedAnswer) {
  debugger;
  correct = quizQuestions[currentQuestionIndex].correctAnswer;


  // Amirah, where is quizQuestionsIndex declared.  This variable does not exist.  Therefore, it cannot be called.
  if (selectedAnswer === correct && quizQuestionsIndex !== finalQuestionIndex){ 
    score++;
    alert("That is correct!")
    currentQuestionIndex++;
    generatequizQuestions();
  
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


// this function displays gih score page
function showHighscore(){
  startQuizDiv.style.display = "none"
  gameoverDiv.style.display = "none";
  highscoreContainer.style.display = "flex";
  highscoreDiv.style.display = "block";
  endGameBtns.style.display = "flex";

  generateHighscore();
}


// this functions starts quiz over
function replayQuiz(){
  highscoreContainer.style.display = "none";
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "flex";
  timeLeft = 76;
  score = 0;
  currentQuestionIndex = 0;
}


// function saves user intials and score
function saveScore() {
  quizBody.style.display = "none"
  gameoverDiv.style.display ="flex"
  clearInterval (timerInterval);
  highscoreInputName.value = "";
  finalScoreE1.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!"

  console.log(`Initials: ${initials}, Score: ${timeLeft}`);
}


// event listeners for buttons
startQuizButton.addEventListener("click", startQuiz);
submitScoreButton.addEventListener("click", submitScore);
saveScoreButton.addEventListener("click", saveScore);