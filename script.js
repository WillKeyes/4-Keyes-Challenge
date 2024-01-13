document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const questionContainer = document.getElementById('question-container');
    const timerDisplay = document.getElementById('time');
    const scoreDisplay = document.getElementById('score');
    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 60; // seconds

    const questions = [
        { question: "What does HTML stand for?", answers: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tabular Markup Language"], correct: 0 },
        { question: "What does CSS stand for?", answers: ["Coloring Style Stuff", "Cascading Style Sheets", "Copper Salt Sand"], correct: 1 },
        { question: "What is the correct syntax for referring to an external script called xyz.js?", answers: ["<script href=\"xyz.js\">", "<script name=\"xyz.js\">", "<script src=\"xyz.js\">", "<script scr=\"xyz.js\">"], correct: 2 },
        { question: "How do you write Hello World in an alert box?", answers: ["alertBox(\"Hello World\");", "msg(\"Hello World\");", "msgbox(\"Hello World\");", "alert(\"Hello World\");"], correct: 3 },
        { question: "Which event occurs when the user clicks on an HTML element?", answers: ["onchange", "onclick", "onmouseclick"], correct: 2 },
        { question: "How do you declare a JavaScript variable?", answers: ["v carName;", "var carName;", "variable carName;"], correct: 1 },
        { question: "What will the following code return: Boolean(10 > 9)?", answers: ["NaN", "false", "true"], correct: 2 },
        // ... add more questions here
    ];

    startButton.addEventListener('click', startGame);

    function startGame() {
        startButton.style.display = 'none';
        currentQuestionIndex = 0;
        score = 0;
        timeLeft = 60;
        scoreDisplay.innerText = score;
        questionContainer.innerHTML = '';
        startTimer();
        showNextQuestion();
    }
    let timer;

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    }

    function showNextQuestion() {
        // Clear previous question
        questionContainer.innerHTML = '';
        if (currentQuestionIndex >= questions.length) {
            endGame();
            return;
        }

        const question = questions[currentQuestionIndex];
        const questionElement = document.createElement('div');
        questionElement.innerText = question.question;
        questionContainer.appendChild(questionElement);

        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.addEventListener('click', () => selectAnswer(index));
            questionContainer.appendChild(button);
        });
    }

    function selectAnswer(index) {
        if (index === questions[currentQuestionIndex].correct) {
            score++;
            scoreDisplay.innerText = score;
        } else {
            timeLeft -= 5; // Subtract time for wrong answers
        }
        currentQuestionIndex++;
        showNextQuestion();
    }
    
    function endGame() {
        // endGame logic
        clearInterval(timer);
        // Display the final score in the modal
        document.getElementById('final-score').innerText = score;
    
        // Show the score modal
        const scoreModal = document.getElementById('score-modal');
        scoreModal.style.display = 'block';
    
        // Handle the close button
        const closeButton = scoreModal.querySelector('.close-button');
        closeButton.onclick = function() {
            scoreModal.style.display = 'none';
        }
    
        // Handle form submission
        const saveScoreForm = document.getElementById('save-score-form');
        saveScoreForm.onsubmit = function(event) {
            event.preventDefault(); // Prevent form from submitting to a server
            const initials = document.getElementById('initials').value;
            saveScore(initials, score);
            scoreModal.style.display = 'none';
            console.log('Saved', { initials, score }); // For testing purposes
            // Here, you would save the score and initials to local storage or a database
        };
    }
    
    function saveScore(initials, score) {
        // Implement saving logic here, e.g., to localStorage
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const newScore = { initials, score };
        highScores.push(newScore);
        highScores.sort((a, b) => b.score - a.score); // Sort the scores
        localStorage.setItem('highScores', JSON.stringify(highScores)); // Save back to localStorage
        // You might want to limit the number of high scores stored
    }
// Call this function when the page loads and after a new score is saved
function loadHighScores() {
    const highScoresList = document.getElementById('high-scores-list');
    highScoresList.innerHTML = ''; // Clear existing list items
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.forEach(score => {
        const li = document.createElement('li');
        li.textContent = `${score.initials}: ${score.score}`;
        highScoresList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Existing setup code...
    
    // Load high scores when the page loads
    loadHighScores();
    
    // Existing event listeners and functions...
});

function saveScore(initials, score) {
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const newScore = { initials, score };
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    
    highScores = highScores.slice(0, 10); // Keep top 10
    localStorage.setItem('highScores', JSON.stringify(highScores)); // Save back to localStorage
    loadHighScores(); // Refresh the high scores displayed on the page
}


});
