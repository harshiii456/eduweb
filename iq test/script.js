// /References
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
    question: "What comes next in the sequence? 2, 4, 6, _?",
    options: ["10", "4", "8", "7"],
    correct: "8",
  },
  {
    id: "1",
    question: "If a cat has four legs and a bird has two legs, how many legs do a cat and a bird have together?",
    options: ["2", "6", "4", "10"],
    correct: "6",
  },
  {
    id: "2",
    question: "Which shape is different from the others:?",
    options: ["square", "circle", "triangle", "rectangle"],
    correct: "circle",
  },
  {
    id: "3",
    question: "If you have three apples and you give one to your friend, how many apples do you have left?",
    options: ["7", "8", "1", "2"],
    correct: "2",
  },
  {
    id: "4",
    question: "What is the missing number in this sequence: 10, 15, __, 25?",
    options: ["16", "18", "20", "22"],
    correct: "20",
  },
  {
    id: "5",
    question: "If a clock shows 3:45, how many minutes are there until 4:00?",
    options: ["15", "18", "22", "30"],
    correct: "15",
  },
  {
    id: "6",
    question: "Which word doesn't belong:?",
    options: ["chair", "table", "dog", "couch"],
    correct: "dog",
  },
  {
    id: "7",
    question: "If a shirt costs 15rs and you have 20rs, how much change will you get?",
    options: ["1", "3", "5", "7"],
    correct: "5",
  },
  {
    id: "8",
    question: "What comes next in the pattern: sun, moon, stars, _?",
    options: ["earth", "galaxy", "mars", "jupyter"],
    correct: "galaxy",
  },
  {
    id: "9",
    question: "How many fingers do three people have altogether?",
    options: ["7", "9", "15", "13"],
    correct: "15",
  },
  {
    id: "10",
    question: "Which of these objects is heaviest:?",
    options: ["feather", "rock", "balloon", "paper"],
    correct: "rock",
  },
  {
    id: "11",
    question: "If you rearrange the letters in the word 'listen' what new word do you get?",
    options: ["nistle", "silent", "tenis", "isten"],
    correct: "silent",
  },
  {
    id: "12",
    question: "What is the opposite of 'big'?",
    options: ["large", "small", "high", "low"],
    correct: "small",
  },
  {
    id: "13",
    question: "If you have 8 candies and you eat 3, how many candies do you have left?",
    options: ["2", "3", "5", "1"],
    correct: "5",
  },
  {
    id: "14",
    question: "Which shape can roll:?",
    options: ["square", "triangle", "circle", "rectangle"],
    correct: "circle",
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
      sessionStorage.setItem('totalMarks', parseInt(quizArray.length) + parseInt(prevTotalMarks));
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
// const timerDisplay = () => {
//   countdown = setInterval(() => {
//     count--;
//     timeLeft.innerHTML = `${count}s`;
//     if (count == 0) {
//       clearInterval(countdown);
//       displayNext();
//     }
//   }, 1000);
// };


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
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--; // Decrement the count
    timeLeft.innerHTML = `${count}s`;
    if (count <= 0) { // Adjust the condition to stop the countdown when count reaches 0
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};
