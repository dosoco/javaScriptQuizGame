document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
          question: "What is the correct way to create an array in JavaScript?",
          choices: ["let arr = '1, 2, 3'", "let arr = [1, 2, 3]", "let arr = {1, 2, 3}", "let arr = (1, 2, 3)"],
          correct: 1,
        },
        {
          question: "What is the index of the first element in an array?",
          choices: ["1", "0", "-1", "Depends on the array"],
          correct: 1,
        },
        {
          question: "Which property is used to determine the number of elements in an array?",
          choices: ["length", "size", "count", "elements"],
          correct: 0,
        },
        {
          question: "Which method adds elements to the end of an array?",
          choices: ["push()", "pop()", "shift()", "unshift()"],
          correct: 0,
        },
        {
          question: "What does the pop() method do?",
          choices: [
            "Adds elements to the end of an array",
            "Removes the first element of an array",
            "Removes the last element of an array",
            "Removes all elements from an array",
          ],
          correct: 2,
        },
        {
          question: "How do you access the last element of an array named 'arr'?",
          choices: ["arr[arr.length - 1]", "arr[-1]", "arr.last()", "arr[arr.length]"],
          correct: 0,
        },
        {
          question: "What is the output of the following code: `let arr = [1, 2, 3]; arr[1] = 5; console.log(arr);`?",
          choices: ["[1, 2, 3]", "[1, 5, 3]", "[1, 2, 5]", "[5, 2, 3]"],
          correct: 1,
        },
        {
          question: "What does the slice() method do?",
          choices: [
            "Extracts a section of an array into a new array",
            "Removes elements from an array",
            "Sorts the elements of an array",
            "Joins all elements into a string",
          ],
          correct: 0,
        },
        {
          question: "What does the splice() method do?",
          choices: [
            "Joins elements into a string",
            "Changes contents of an array by adding/removing elements",
            "Extracts a section of an array into a new array",
            "Combines two or more arrays",
          ],
          correct: 1,
        },
        {
          question: "How would you iterate over an array with index values?",
          choices: [
            "Using a for...of loop",
            "Using a for loop",
            "Using a while loop",
            "Using array.forEach()",
          ],
          correct: 1,
        },
        {
          question: "Which of the following is a valid for loop syntax?",
          choices: [
            "for (let i = 0, i < 5, i++)",
            "for i = 0; i < 5; i++",
            "for (let i = 0; i < 5; i++)",
            "for (i < 5; i++; let i = 0)",
          ],
          correct: 2,
        },
        {
          question: "What does the 'break' statement do in a loop?",
          choices: [
            "Stops the loop and executes the next iteration",
            "Exits the loop entirely",
            "Skips to the next iteration",
            "Restarts the loop",
          ],
          correct: 1,
        },
        {
          question: "Which method combines two arrays without modifying the original arrays?",
          choices: ["concat()", "push()", "splice()", "unshift()"],
          correct: 0,
        },
        {
          question: "How do you embed a variable in a template literal?",
          choices: ["${variable}", "{variable}", "%variable%", "&variable"],
          correct: 0,
        },
        {
          question: "What does the split() method do?",
          choices: [
            "Joins array elements into a string",
            "Splits a string into an array",
            "Divides an array into parts",
            "Sorts the elements of a string",
          ],
          correct: 1,
        },
        {
          question: "What is the output of `console.log(`${2 + 3}`);`?",
          choices: ["23", "5", "undefined", "NaN"],
          correct: 1,
        },
        {
          question: "Which loop is best for iterating over the characters of a string?",
          choices: ["for...of", "for", "while", "do...while"],
          correct: 0,
        },
        {
          question: "What is the result of `['a', 'b'].join('-')`?",
          choices: ["a-b", "a,b", "['a', 'b']", "undefined"],
          correct: 0,
        },
        {
          question: "Which operator is used for incrementing a value by 1?",
          choices: ["++", "+=", "+1", "add()"],
          correct: 0,
        },
        {
          question: "How do you count the vowels in a string using a loop?",
          choices: [
            "Check each character using includes()",
            "Check each character using indexOf()",
            "Use a regular expression",
            "All of the above",
          ],
          correct: 3,
        },
      ];
      
  
    let currentQuestion = 0;
    let score = 0;
    let timer;
    let timeLeft = 30;
  
    const startButton = document.getElementById("start-btn");
    const restartButton = document.getElementById("restart-btn");
    const questionBox = document.getElementById("question-box");
    const finalScoreScreen = document.getElementById("final-score-screen");
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const scoreElement = document.getElementById("score");
    const timerElement = document.getElementById("timer");
    const finalScoreElement = document.getElementById("final-score");
    const correctSound = new Audio("rightAnswer.mp3");
    const incorrectSound = new Audio("wrongAnswer.mp3");

    // Utility functions for visibility
    function hideElement(element) {
      element.style.display = "none";
    }
  
    function showElement(element) {
      element.style.display = "block";
    }
  
    function startGame() {
      score = 0;
      currentQuestion = 0;
      timeLeft = 30;
      scoreElement.textContent = score;
  
      // Hide start button and final score screen
      hideElement(startButton);
      hideElement(finalScoreScreen);
      showElement(questionBox);
  
      showQuestion();
    }
  
    function showQuestion() {
      if (currentQuestion >= questions.length) {
        return endGame();
      }
  
      const questionData = questions[currentQuestion];
      questionElement.textContent = questionData.question;
      answersElement.innerHTML = "";
  
      questionData.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.classList.add("answer-btn");
        button.dataset.choice = index;
        button.addEventListener("click", checkAnswer);
        answersElement.appendChild(button);
      });
  
      timeLeft = 30;
      timerElement.textContent = timeLeft;
      clearInterval(timer);
      timer = setInterval(countdown, 1000);
    }
  
    function checkAnswer(event) {
      const selectedChoice = parseInt(event.target.dataset.choice);
      const correctChoice = questions[currentQuestion].correct;
  
      if (selectedChoice === correctChoice) {
        score++;
        scoreElement.textContent = score;
        event.target.classList.add("correct");
        event.target.style.backgroundColor = "#4CAF50"; // Green for correct
        correctSound.play(); // Play correct answer sound
      } else {
        event.target.classList.add("incorrect");
        event.target.style.backgroundColor = "#F44336"; // Red for incorrect
        incorrectSound.play(); // Play incorrect answer sound
      }
  
      setTimeout(() => {
        currentQuestion++;
        showQuestion();
      }, 1000);
    }
  
    function countdown() {
      timeLeft--;
      timerElement.textContent = timeLeft;
  
      if (timeLeft <= 0) {
        clearInterval(timer);
        currentQuestion++;
        showQuestion();
      }
    }
  
    function endGame() {
      clearInterval(timer);
  
      // Hide question box and show final score screen
      hideElement(questionBox);
      showElement(finalScoreScreen);
      finalScoreElement.textContent = score;
    }
  
    restartButton.addEventListener("click", () => {
      startGame();
    });
  
    startButton.addEventListener("click", startGame);
  });
  