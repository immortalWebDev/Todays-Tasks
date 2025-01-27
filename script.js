const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll("input");
const errorLabel = document.querySelector(".error-label");
const progressLabel = document.querySelector(".progress-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");

const allQuotes = [
  "Push your limits—every step counts!",
  "A strong start leads to a powerful finish!",
  "You're closer than you think—keep moving!",
  "Amazing! You've crushed every goal—time to relax and recharge",
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;

progressValue.style.width = `${
  (completedGoalsCount / inputFields.length) * 100
}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`;
progressLabel.innerText = allQuotes[completedGoalsCount];

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputFields].every(function (input) {
      return input.value;
    });

    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle("completed");
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;

      progressValue.style.width = `${
        (completedGoalsCount / inputFields.length) * 100
      }%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`;
      progressLabel.innerText = allQuotes[completedGoalsCount];

      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressBar.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }

  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }

    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value;
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      };
    }

    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});

const toggleButton = document.getElementById("toggle-dark");

if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
}

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
    toggleButton.textContent = "☀️";
  } else {
    localStorage.setItem("darkMode", "disabled");
    toggleButton.textContent = "🌙";
  }
});

const setFresh = document.querySelector(".set-fresh");

setFresh.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});
