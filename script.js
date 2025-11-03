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

const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Retrieve saved answers or initialize empty array for progress
function getUserAnswers() {
  return JSON.parse(sessionStorage.getItem("progress")) || Array(questions.length).fill(null);
}

// Save current answers to session storage
function saveUserAnswers(userAnswers) {
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Render questions and choices, restore previous selections, and set checked attributes for Cypress
function renderQuestions() {
  const userAnswers = getUserAnswers();
  questionsElement.innerHTML = "";

  questions.forEach((q, idx) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";

    const questionText = document.createElement("div");
    questionText.textContent = q.question;
    questionDiv.appendChild(questionText);

    q.choices.forEach(choice => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${idx}`;
      input.value = choice;

      // Set both checked property and attribute for Cypress compatibility
      if (userAnswers[idx] === choice) {
        input.checked = true;
        input.setAttribute("checked", "true");
      } else {
        input.checked = false;
        input.removeAttribute("checked");
      }

      input.addEventListener("change", () => {
        userAnswers[idx] = choice;
        saveUserAnswers(userAnswers);

        // Update checked attribute for all radios in the group to keep in sync for Cypress
        const radios = document.getElementsByName(`question-${idx}`);
        radios.forEach(radio => {
          if (radio.value === choice) {
            radio.setAttribute("checked", "true");
          } else {
            radio.removeAttribute("checked");
          }
        });
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Calculate score, display it, and save to local storage
function handleSubmit() {
  const userAnswers = getUserAnswers();
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) score++;
  }

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
}

renderQuestions();
submitBtn.addEventListener("click", handleSubmit);

// Display saved score after page reload
window.addEventListener("load", () => {
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
  }
});
