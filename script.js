// Assigning each section of the page to a variable to be able to show/hide them individually as the quiz progresses
var pageSection = document.querySelectorAll('.section');
var answerAlert = document.querySelectorAll('.answer-alert');
var introPage = document.querySelector('#introduction');
var firstQuestion = document.querySelector('#question-1');
var secondQuestion = document.querySelector('#question-2');
var thirdQuestion = document.querySelector('#question-3');
var fourthQuestion = document.querySelector('#question-4');
var resultsPage = document.querySelector('#results');
var leaderboardPage = document.querySelector('#leaderboard');

// Assigning the unordered list of high scores to a variable
var highScoresList = document.querySelector('#high-scores');

// Assigning each type of interactive element on the page to a variable to update information on the page as needed
var startButton = document.querySelector('#start-button');
var q1ButtonCorrect = document.querySelector('#q1-correct');
var q1ButtonWrong = document.querySelectorAll('.q1-wrong');
var q2ButtonCorrect = document.querySelector('#q2-correct');
var q2ButtonWrong = document.querySelectorAll('.q2-wrong');
var q3ButtonCorrect = document.querySelector('#q3-correct');
var q3ButtonWrong = document.querySelectorAll('.q3-wrong');
var q4ButtonCorrect = document.querySelector('#q4-correct');
var q4ButtonWrong = document.querySelectorAll('.q4-wrong');
var resultsTitle = document.querySelector('#results-title');
var tryAgainButton = document.querySelector('#try-again-button');
var clearHighScoresButton = document.querySelector('#clear-button');
var submitButton = document.querySelector('#submit-button');
var initialsInput = document.querySelector('#initials-input');

// Assigning elements for remaining time and total score to variables and assigning initial values to time and total score
var timeElement = document.querySelector('#time');
var scoreElement = document.querySelector('#score');
var score = 0;
var secondsLeft = 60;

// Checks to see whether each section of the page is marked as 'shown' or 'hidden' to determine which section to show at any given time
function displayCheck() {
    for (var i = 0; i < pageSection.length; i++) {
        var state = pageSection[i].getAttribute("data-state");

        if (state === "shown") {
            pageSection[i].style.display = "block";
        } else {
            pageSection[i].style.display = "none";
        }
    }
};

// Displays the message 'correct' when the user answers a question correctly
function answerCorrect() {
    answerAlert.forEach(item => {
        item.textContent = "Correct";
    })
};

// Displays the message 'wrong' when the user answers a question incorrectly
function answerWrong() {
    answerAlert.forEach(item => {
        item.textContent = "Wrong";
    })
};

// Makes it so the 'Correct/Wrong' dialog is reverted once this function is called with a timeout
function answerTimeout() {
    answerAlert.forEach(item => {
        item.textContent = '';
    })
};

// Defining how the timer will operate and redicrecting the user to the 'time-out' section if time runs out
function startTimer () {

    var timerInterval = setInterval(function() {

        if (secondsLeft > 1) {
            timeElement.textContent = secondsLeft + ' Seconds';
            secondsLeft --;

        } else if (secondsLeft === 1) {
            timeElement.textContent = secondsLeft + ' Second';
            secondsLeft --;

        } else if (secondsLeft <= 0) {
            clearInterval(timerInterval); 
            timeElement.textContent = 'N/A';
            for (var i = 0; i < pageSection.length; i++) {
                pageSection[i].dataset.state = "hidden";
            }
            resultsTitle.textContent = 'Oh no! Looks like you have run out of time!';
            scoreElement.textContent = score;
            resultsPage.setAttribute('data-state', 'shown');
            displayCheck();
        }
    }, 1000);
    // Defining timerInterval as a global variable so that I can clearInterval later during the quiz
    window.timerInterval = timerInterval;
};

// Adding functionality for the start button. Once the button is pressed, the intrio section will be hidden and question 1 will be shown. The timer will also be engaged.
startButton.addEventListener('click', function() {
    introPage.dataset.state = 'hidden';
    firstQuestion.dataset.state = 'shown';
    startTimer();
    displayCheck();
});

// Setting event for selecting the correct answer for question 1, then adding points and hiding/displaying sections to set up for next question
q1ButtonCorrect.addEventListener('click', function() {
    score += 5;
    firstQuestion.dataset.state = 'hidden';
    secondQuestion.dataset.state = 'shown';
    displayCheck();
    answerCorrect();
    setTimeout(answerTimeout, 1500);
});

// Setting event for selecting any wrong answer for question 1, then removing time and hiding/displaying sections to set up for next question
q1ButtonWrong.forEach(item => {
    item.addEventListener('click', function() {
        firstQuestion.dataset.state = 'hidden';
        secondQuestion.dataset.state = 'shown';
        secondsLeft -= 20;
        displayCheck();
        answerWrong();
        setTimeout(answerTimeout, 1500);
    })
});

// Setting event for selecting the correct answer for question 2, then adding points and hiding/displaying sections to set up for next question
q2ButtonCorrect.addEventListener('click', function() {
    score += 5;
    secondQuestion.dataset.state = 'hidden';
    thirdQuestion.dataset.state = 'shown';
    displayCheck();
    answerCorrect();
    setTimeout(answerTimeout, 1500);
});

// Setting event for selecting any wrong answer for question 2, then removing time and hiding/displaying sections to set up for next question
q2ButtonWrong.forEach(item => {
    item.addEventListener('click', function() {
        secondQuestion.dataset.state = 'hidden';
        thirdQuestion.dataset.state = 'shown';
        secondsLeft -= 20;
        displayCheck();
        answerWrong();
        setTimeout(answerTimeout, 1500);
    })
});

// Setting event for selecting the correct answer for question 3, then adding points and hiding/displaying sections to set up for next question
q3ButtonCorrect.addEventListener('click', function() {
    score += 5;
    thirdQuestion.dataset.state = 'hidden';
    fourthQuestion.dataset.state = 'shown';
    displayCheck();
    answerCorrect();
    setTimeout(answerTimeout, 1500);
});

// Setting event for selecting any wrong answer for question 3, then removing time and hiding/displaying sections to set up for next question
q3ButtonWrong.forEach(item => {
    item.addEventListener('click', function() {
        thirdQuestion.dataset.state = 'hidden';
        fourthQuestion.dataset.state = 'shown';
        secondsLeft -= 20;
        displayCheck();
        answerWrong();
        setTimeout(answerTimeout, 1500);
    })
});

// Combining the common actions from answering the final question correctly or incorrectly into one function to save space
function quizOver() {
    displayCheck();
    setTimeout(answerTimeout, 1500);
    clearInterval(timerInterval);
    timeElement.textContent = 'N/A';
    resultsTitle.textContent = 'Quiz Complete!';
    scoreElement.textContent = score;
}


// Setting event for selecting the correct answer for question 4, then adding points and hiding/displaying sections to set up for next question
q4ButtonCorrect.addEventListener('click', function() {
    score += 5;
    fourthQuestion.dataset.state = 'hidden';
    resultsPage.dataset.state = 'shown';
    answerCorrect();
    quizOver();
});

// Setting event for selecting any wrong answer for question 4, then removing time and hiding/displaying sections to set up for next question
q4ButtonWrong.forEach(item => {
    item.addEventListener('click', function() {
        fourthQuestion.dataset.state = 'hidden';
        resultsPage.dataset.state = 'shown';
        secondsLeft -= 20;
        answerWrong();
        quizOver();
    })
});

// Creating an object to store all initials and high scores logged
var highScores = {
    storedInitials: [],
    storedScores: [],
}

// For each time initials are stored, store the score as well, create a list item element and append it to the list of high scores
function renderHighScores() {
    highScoresList.innerHTML = '';

    for (var i = 0; i < highScores.storedInitials.length; i++) {
        var initials = highScores.storedInitials[i];
        var scores = highScores.storedScores[i];

        var li = document.createElement('li');
        li.textContent = initials + ': ' + scores;
        highScoresList.appendChild(li);
    }
}

// Storing the initials and scores to the local storage
function storeHighScores() {
    localStorage.setItem("High Scores", JSON.stringify(highScores));
}

// Storing the initials input and the current score into the highScores object and taking the user to the leaderboard page
submitButton.addEventListener('click', function(event) {
    event.stopImmediatePropagation();

    var initialsText = initialsInput.value.toUpperCase();

    if (initialsText === '') {
        return;
    }

    highScores.storedInitials.push(initialsText);
    highScores.storedScores.push(score);

    resultsPage.dataset.state = 'hidden';
    leaderboardPage.dataset.state = 'shown';

    displayCheck();
    storeHighScores();
    renderHighScores();

});

// If initials and scores have been previously logged, they will populate the leaderboard page
function init() {
    var storedHighScores = JSON.parse(localStorage.getItem("High Scores"))

    if (storedHighScores !== null) {
        highScores = storedHighScores;
    }

    renderHighScores();
}

// Populating the leaderboard page with any existing initials + scores
init();

//Reinitializes the quiz from the beginning when the user clicks the "Try Again" button
tryAgainButton.addEventListener('click', function() {
    leaderboardPage.dataset.state = 'hidden';
    introPage.dataset.state = 'shown';
    score = 0;
    secondsLeft = 60
    initialsInput.value = '';

    displayCheck();
})

//  Clears all high scores once the "Clear High Scores" button is clicked
clearHighScoresButton.addEventListener('click', function() {
    highScores.storedInitials = [];
    highScores.storedScores = [];
    storeHighScores();
    renderHighScores();
})

