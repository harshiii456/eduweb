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
        question: "Once upon a time, in a small village nestled between rolling hills, there lived a curious young boy named Tim. Tim loved exploring the forests surrounding his village, always seeking new adventures. One day, as he wandered deeper into the woods, he stumbled upon an old, abandoned cabin hidden among the trees.\n\nWhat did Tim discover while exploring the forest?",
        options: ["A hidden treasure chest", "An old, abandoned cabin", "A magical unicorn", "A friendly bear"],
        correct: "An old, abandoned cabin",
    },
    {
        id: "1",
        question: "Sarah was excited about her upcoming birthday party. She had invited all her friends to a special celebration at the local park. The day of the party arrived, and the park was filled with laughter and joy as Sarah and her friends played games, enjoyed delicious treats, and celebrated together.\n\nWhere did Sarah decide to have her birthday party?",
        options: ["At home", "At a restaurant", "At the local park", "At the movie theater"],
        correct: "At the local park",
    },
    {
        id: "2",
        question: "Emily had always dreamed of becoming an astronaut and exploring the stars. She spent countless hours reading books about space, studying the planets, and imagining herself floating among the galaxies. One night, as she gazed up at the twinkling stars above, Emily felt a sense of wonder and excitement fill her heart.\n\nWhat was Emily's dream career?",
        options: ["Teacher", "Doctor", "Astronaut", "Pilot"],
        correct: "Astronaut",
    },
    {
        id: "3",
        question: "Jake loved spending time in his grandfather's garden, surrounded by colorful flowers and buzzing bees. His grandfather taught him how to plant seeds, water the plants, and care for the garden. Together, they watched as the flowers bloomed and the vegetables grew, creating a beautiful oasis of nature in their backyard.\n\nWhat did Jake enjoy doing in his grandfather's garden?",
        options: ["Watching television", "Playing video games", "Reading books", "Gardening and spending time with his grandfather"],
        correct: "Gardening and spending time with his grandfather",
    },
    {
        id: "4",
        question: "Mia and her family had planned a trip to the beach for their summer vacation. They packed their bags with sunscreen, towels, and snacks before setting off on their adventure. When they arrived at the beach, Mia couldn't wait to splash in the waves, build sandcastles, and collect seashells along the shore.\n\nWhat did Mia enjoy doing at the beach?",
        options: ["Reading books", "Playing soccer", "Swimming in the waves and collecting seashells", "Flying kites"],
        correct: "Swimming in the waves and collecting seashells",
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