import { Github } from "./github.js";
import { UI } from "./ui.js";

const github = new Github();
const ui = new UI();

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

searchButton.addEventListener("click", getInput);

function getInput() {
  if (searchInput.value) {
    github
      .fetchUserData(searchInput.value)
      .then((res) => {
        if (res.data.message === "Not Found") {
          showAlert("User Not Found!");
        } else {
          ui.renderProfile(res.data);
          ui.renderProjects(res.repos);
        }
      })
      .catch((err) => console.log(err));
    return;
  }
  showAlert("Please enter a username!");
}

function showAlert(message) {
  const alertDiv = document.getElementById("alertDiv");
  alertDiv.textContent = message;
  alertDiv.classList.remove("d-none");

  setTimeout(() => {
    alertDiv.classList.add("d-none"); // Hide the alert after 3 seconds
  }, 3000);
}

const modeToggleBtn = document.getElementById("mode-toggle-btn");
const lightModeStylesheet = document.getElementById("light-mode-stylesheet");

function toggleMode() {
  lightModeStylesheet.disabled = !lightModeStylesheet.disabled;
  const currentMode = lightModeStylesheet.disabled ? "Light Mode" : "Dark Mode";
  modeToggleBtn.innerText = currentMode;
}

modeToggleBtn.addEventListener("click", toggleMode);
