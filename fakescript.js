var quizBody = document.getElementById("quiz");
var resultsEl =  document.getElementById("result");
var startQuizDiv = document.getElementById("startpage");
var startQuizDiv = document.getElementById("highscore-page");
var startQuizcontainer= document.getElementById("highscore-page");
var startQuizDiv= document.getElementById("highscore-page");
var startQuizButton = document.getElementById("startbtn");
var questionsEl = document.getElementById("questions");
var Timer = document.getElementById("time-remaining");
var submitScoreButton = document.getElementById("submit-score");
var initialsInput = document.getElementById("initials");
var saveScoreButton = document.getElementById("save-score");
var finalScoreE1 = document.getElementById("finalScore");
var highscoreInputName = document.getElementById("initials")
var highscoreDisplayScore = document.getElementById("highscore-score");
var gameoverDiv = document.getElementById("gameover");
var quizTimer = document.getElementById ("timer")
var buttonA = document.getElementById("A");
var buttonB = document.getElementById("B");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("D");

// Quiz questions
var Quizquestions = [{
  question: "What does WWW stand for?",
  choiceA: "Word Walt Water",
  choiceB: " When We Would",
  choiceC:" World Wide Web",
  choiceD: " None of the above",
  correctAnswer: "D"
  },
   {
  question: "what are Arrays in JavaScript used to store?",
  choiceA: "Numbers & strings",
  choiceB: " Other arrays",
  choiceC:" Booleans",
  choiceD: " All the above",
  correctAnswer: "D"
 },
 {
 question : "Commonly used data types do not include:",
  choiceA:" strings",
  choiceB: " booleans",
  choiceC: " numbers",
  choiceD: " alerts",
  answer: "D"
},
{
  question : "What's the HTML tag for creating an ordered list?",
  choiceA:" <p>",
  choiceB: " <ol>",
  choiceC:" <ul>",
  choiceD: " None of the above",
  correctAnswer: "C"
}, 
{
  question : "String values must be enclosed within ______ when being assigned to variables.",
  choiceA: "commas",
  choiceB: "curly brackets",
  choiceC: "quotes",
  choiceD: "parenthesis",
  correctAnswer: "B"
},
];

// global variables
let finalQuestionIndex = Quizquestions.length;
let currentQuestionIndex = 0;
let timeLeft = 70; // initial time
let timerInterval;
let score = 0;
let correct;

// this function generates questions & answers
function generateQuizQuestion(){
  if (currentQuestionIndex===finalQuestionIndex){
    return showScore();
  }
let currentQuestion = Quizquestions[currentQuestionIndex];
questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
buttonA.innerHTML = currentQuestion.choiceA;
buttonB.innerHTML = currentQuestion.choiceB;
buttonC.innerHTML = currentQuestion.choiceC;
buttonD.innerHTML = currentQuestion.choiceD;
}
// start quiz starts the timer & displays first question
function startQuiz() {
startquiz.style.display = "none";
gameoverDiv.style.display = "none";
}
// timer
timerInterval = setInterval(function() {
  timeLeft--;
  quizTimer.textContent = "Time left: " + timeLeft;
  if(timeLeft === 0) {
    clearInterval(timerInterval);
    return showScore();
  }
  }, 1000);
  quiz.style.display = "block";

  // this fucion shows the last page after quiz times out
  function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
  }
    
  if(highscoreInputName.value === "") {
    alert("Initials cannot be blank");
    return false;
  }else{
   var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
   var currentUser = highscoreInputName.value.trim();
   var currentHighscore = {
      name : currentUser,
      score : score
    };


gameoverDiv.style.display = "none";
highscoreContainer.style.display = "flex";
highscoreDiv.style.display = "block";
endGameBtns.style.display = "flex";

savedHighscores.push(currentHighscore);
localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
generateHighscores()

  
// this function checks response to each answer choice.

function checkAnswer(selectedAnswer){
      correct = quizQuestions[currentQuestionIndex].correctAnswer;

      if (selectedAnswer === correct && quizQuestionsIndex !== finalQuestionIndex){ 
        score++;
        alert("That is correct!")
        currentQuestionIndex++;
        generatquizQuestion();
      
      } else if (selectedAnswer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        timeLeft -= 10; // Time penalty for incorrect answer
      } else{
        showScore();
      }
};  
    
    function endQuiz() {
      clearInterval(timerInterval);
      questionContainer.innerHTML = "Quiz over!";
      submitScoreButton.style.display = "block";
}

  

    function submitScore() {
      submitScoreButton.style.display = "none";
      initialsInput.style.display = "block";
      saveScoreButton.style.display = "block";
    }

    function saveScore() {
      const initials = initialsInput.value;
      // You can save the score and initials as needed, e.g., to local storage or send to a server.
      // For simplicity, we'll just log it here.
      console.log(`Initials: ${initials}, Score: ${timeLeft}`);
    }

    startQuizButton.addEventListener("click", startQuiz);
  }