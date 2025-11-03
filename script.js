
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

// Get references to DOM elements
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load previously saved answers from session storage or initialize with nulls
function getUserAnswers() {
  return JSON.parse(sessionStorage.getItem("progress")) || Array(questions.length).fill(null);
}

// Save answers in session storage
function saveUserAnswers(userAnswers) {
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Render questions and choices with restored progress
function renderQuestions() {
  const userAnswers = getUserAnswers();
  questionsElement.innerHTML = "";

  questions.forEach((q, idx) => {
    // Create question container
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";

    // Question text
    const questionTextDiv = document.createElement("div");
    questionTextDiv.textContent = q.question;
    questionDiv.appendChild(questionTextDiv);

    // Choices
    q.choices.forEach(choice => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${idx}`;
      input.value = choice;

      // Restore checked state
      if (userAnswers[idx] === choice) {
        input.checked = true;
      }

      // Save progress on change
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

// Calculate and display score, store in local storage
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

// Submit button event listener
submitBtn.addEventListener("click", handleSubmit);
