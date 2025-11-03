// Quiz questions array
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
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// DOM references
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load answers from session storage or initialize empty array
function getUserAnswers() {
  return JSON.parse(sessionStorage.getItem("progress")) || Array(questions.length).fill(null);
}

// Save answers to session storage
function saveUserAnswers(userAnswers) {
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Render the quiz questions and choices with saved answers selected
function renderQuestions() {
  const userAnswers = getUserAnswers();
  questionsElement.innerHTML = "";

  questions.forEach((q, idx) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";

    const questionTextDiv = document.createElement("div");
    questionTextDiv.textContent = q.question;
    questionDiv.appendChild(questionTextDiv);

    q.choices.forEach(choice => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${idx}`;
      input.value = choice;

      // Set checked property for restored answer
      if (userAnswers[idx] === choice) {
        input.checked = true;
      }

      // On change, save the selected answer to session storage
      input.addEventListener("change", () => {
        userAnswers[idx] = choice;
        saveUserAnswers(userAnswers);
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Calculate score and store it in local storage, then display it
function handleSubmit() {
  const userAnswers = getUserAnswers();
  let score = 0;

  userAnswers.forEach((answer, i) => {
    if (answer === questions[i].answer) score++;
  });

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
}

// Initial render
renderQuestions();

// Bind submit event
submitBtn.addEventListener("click", handleSubmit);
