// script.js
const questions = [
    {
        question: "What is the index of the first element in an array?",
        options: ["1", "0", "Depends on the array", "-1"],
        answer: 1
    },
    {
        question: "Which method adds one or more elements to the end of an array?",
        options: ["push", "pop", "unshift", "shift"],
        answer: 0
    },
    {
        question: "What does the length property of an array represent?",
        options: ["The number of elements in the array", "The last index of the array", "The type of the array", "None of the above"],
        answer: 0
    },
    {
        question: "How can you remove the first element of an array?",
        options: ["shift", "unshift", "splice", "pop"],
        answer: 0
    },
    {
        question: "What does array.slice(1, 3) do?",
        options: ["Modifies the array", "Returns a shallow copy of a portion of the array", "Removes the first 3 elements", "Returns the first 3 elements"],
        answer: 1
    },
    {
        question: "How can you combine two arrays into one?",
        options: ["concat", "join", "push", "merge"],
        answer: 0
    },
    {
        question: "Which method splits a string into an array?",
        options: ["join", "split", "slice", "map"],
        answer: 1
    },
    {
        question: "What is the output of ['hello', 'world'][0][1]?",
        options: ["h", "e", "w", "o"],
        answer: 1
    },
    {
        question: "What does the `pop` method do?",
        options: [
            "Adds elements to the start of an array",
            "Removes the last element from an array",
            "Combines two arrays into one",
            "Sorts the elements of an array"
        ],
        answer: 1
    },
    {
        question: "What does the `splice` method allow you to do?",
        options: [
            "Extract a portion of an array",
            "Add, remove, or replace elements in an array",
            "Find the index of an element",
            "Split a string into an array"
        ],
        answer: 1
    },
    {
        question: "Which method would you use to add elements to the start of an array?",
        options: ["unshift", "shift", "push", "pop"],
        answer: 0
    },
    {
        question: "What is the output of ['apple', 'banana', 'cherry'].length?",
        options: ["0", "2", "3", "4"],
        answer: 2
    },
    {
        question: "How can you find the first index of a specific element in an array?",
        options: ["indexOf", "findIndex", "includes", "filter"],
        answer: 0
    },
    {
        question: "Which method creates a new array with the results of calling a function on every element?",
        options: ["map", "filter", "reduce", "forEach"],
        answer: 0
    },
    {
        question: "What does `reduce` do in JavaScript?",
        options: [
            "Filters elements based on a condition",
            "Combines array elements into a single value",
            "Sorts elements alphabetically",
            "Finds the maximum value in an array"
        ],
        answer: 1
    },
    {
        question: "Which method checks if an array includes a specific value?",
        options: ["includes", "some", "every", "find"],
        answer: 0
    },
    {
        question: "How can you create a copy of an array without modifying the original?",
        options: ["slice", "splice", "concat", "split"],
        answer: 0
    },
    {
        question: "What is the difference between `forEach` and `map`?",
        options: [
            "forEach creates a new array, while map modifies the original",
            "forEach modifies the original array, while map creates a new array",
            "forEach returns undefined, while map returns a new array",
            "forEach is only for objects, while map is for arrays"
        ],
        answer: 2
    },
    {
        question: "What is the output of ['a', 'b', 'c'].join('-')?",
        options: ["'abc'", "'a-b-c'", "'a, b, c'", "'-'"],
        answer: 1
    },
    {
        question: "How can you reverse the elements in an array?",
        options: ["reverse", "sort", "splice", "concat"],
        answer: 0
    }
    // Add the rest of the questions here...
];

let currentQuestionIndex = 0;
let score = 0;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const scoreScreen = document.getElementById("score-screen");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", handleNextQuestion);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    nextButton.disabled = true;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => handleAnswer(index));
        optionsElement.appendChild(button);
    });
}

function handleAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = optionsElement.querySelectorAll("button");

    buttons.forEach((button, index) => {
        if (index === currentQuestion.answer) {
            button.style.backgroundColor = "green";
        } else if (index === selectedIndex) {
            button.style.backgroundColor = "red";
        }
        button.disabled = true;
    });

    if (selectedIndex === currentQuestion.answer) {
        score++;
    }

    nextButton.disabled = false;
}

function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    quizScreen.classList.remove("active");
    scoreScreen.classList.add("active");
    scoreElement.textContent = `You scored ${score} out of ${questions.length}!`;
}

function restartQuiz() {
    scoreScreen.classList.remove("active");
    startScreen.classList.add("active");
}
