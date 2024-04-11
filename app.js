import { Github } from "./github.js";
import { UI } from "./ui.js";

const github = new Github();
const ui = new UI();

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");
const alertDiv = document.querySelector(".alert");

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
  alertDiv.textContent = message;
  alertDiv.style.display = "block";
  alertDiv.style.border = "2px solid #FFF3CD";
  alertDiv.style.marginTop = "20px";
  alertDiv.style.backgroundColor = "#FFF3CD";
  alertDiv.style.color = "red";

  setTimeout(() => {
    alertDiv.style.display = "none";
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
