//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 16;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "What's the capital of India?",
    options: ["Delhi", "Chandigarh", "Mumbai", "Chennai"],
    correct: "Delhi",
  },
  {
    id: "1",
    question: "Which animal is known as the king of the Jungle?",
    options: [" Tiger", "Lion", "Elephant", "Wolf"],
    correct: "Lion",
  },
  {
    id:"2",
    question: "How many days are in a leap year?",
    options: ["365", "12", "366", "7"],
    correct: "366",
  },
  {
    id:"3",
    question: "Who is the current Prime Minister of India?",
    options: ["Narendra Modi", "Rahul Gandhi", "Arvind Kejriwal", "Amit Shah"],
    correct: "Narendra Modi",
  },
  {
    id:"4",
    question: "What's the color of grass?",
    options: ["Red", "Green", "Yellow", "Pink"],
    correct: "Green",
  },
  {
    id:"5",
    question: "Which is the 7th month?",
    options: ["August", "June", "July", "May"],
    correct: "July",
  },
  {
    id:"6",
    question: "What does the word 'Hungry' mean?",
    options: ["Need of food", "Need of sleep", "Need of Mobile", "Need of money"],
    correct: "Need of food",
  },
  {
    id:"7",
    question: "Who is the father of India?",
    options: ["Bhagat Singh", "Mahatama Gandhi", "Milkha Singh", "Lal Bhadur Shastri"],
    correct: "Mahatama Gandhi",
  },
  {
    id:"8",
    question: "Who is known as Flying Sikh of India?",
    options: ["Bhagat Singh", "Milkha Singh", "Pt. Jawahar Lal Nehru", "Mahatama Gandhi"],
    correct: "Milkha Singh",
  },
  {
    id:"9",
    question: "Taste of water?",
    options: ["salty", "bitter", "Tasteless", "sweet"],
    correct: "Tasteless",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
        const prevScoredMarks = sessionStorage.getItem('scoredMarks') || 0;
      const prevTotalMarks = sessionStorage.getItem('totalMarks') || 0;
      sessionStorage.setItem('totalMarks', parseInt(questionCount) + parseInt(prevTotalMarks));
      sessionStorage.setItem('scoredMarks', parseInt(scoreCount) + parseInt(prevScoredMarks));
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 16;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 16;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};