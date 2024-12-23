const words = ['baby', 'banana', 'cherry', 'life', 'mango', 'zebra', 'elephant', 'class', 'cricket', 'eagle', 'flyover', 'school', 'grandmother', 'notebook', 'alphabets'];
const correctAnswers = [];
let score = 0;
let wordCounter = 0; // Keep track of the number of words shown
let shuffledWords = shuffleArray(words.slice()); // Make a copy of the words array and shuffle it
let timerId;
const timerDuration = 15; // Timer duration in seconds

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function speakWord(word) {
    // Use the SpeechSynthesis API to speak the word
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(word);
    synth.speak(utterance);
}

function startTimer() {
    let timeLeft = timerDuration;
    updateTimerDisplay(timeLeft);
    timerId = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);
        if (timeLeft === 0) {
            clearInterval(timerId);
            checkAnswer();
        }
    }, 1000);
}

function updateTimerDisplay(timeLeft) {
    document.getElementById('timer').textContent = 'Time left: ' + timeLeft + 's';
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer').value.toLowerCase();
    const word = shuffledWords[wordCounter].toLowerCase();

    if (userAnswer === word) {
        score++;
        correctAnswers.push(word);
        document.getElementById('result').textContent = 'Correct! Your score is ' + score;
    } else {
        document.getElementById('result').textContent = 'Incorrect. The correct answer was ' + word;
    }

    document.getElementById('answer').value = '';
    wordCounter++;

    if (wordCounter < 15) {
        const nextWord = shuffledWords[wordCounter];
        speakWord(nextWord);
        document.getElementById('word').textContent = nextWord;
        clearInterval(timerId); // Clear any existing timer
        startTimer(); // Start the timer for the next word
    } else {
        // Game over, display result
        document.getElementById('result').textContent = 'Game Over! Your final score is ' + score;
        clearInterval(timerId); // Clear the timer
        // Optionally, you can reset the game here if you want
        // score = 0;
        // correctAnswers = [];
        // wordCounter = 0;
    }
}

// Delay the start of the game by 10 seconds
setTimeout(() => {
    // Speak the first word and start the timer
    speakWord(shuffledWords[0]);
    document.getElementById('word').textContent = shuffledWords[0];
    startTimer(); // Start the timer for the first word
}, 10000); // 10000 milliseconds = 10 seconds
