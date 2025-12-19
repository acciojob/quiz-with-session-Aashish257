//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
// your JS code here

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load saved progress from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
function renderQuestions() {
  questionsElement.innerHTML = "";

  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");
    questionDiv.textContent = q.question;

    q.choices.forEach(choice => {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = choice;

      // Restore checked state
      if (userAnswers[i] === choice) {
        radio.checked = true;
      }

      // Save progress on change
      radio.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      questionDiv.appendChild(radio);
      questionDiv.appendChild(document.createTextNode(choice));
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Submit quiz
submitButton.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });

  scoreElement.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});

// Show previous score if exists
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of 5.`;
}

renderQuestions();

