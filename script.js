// TOGGLE THEME

const themeToggleButton = document.querySelector(".theme-toggle");
const moonIcon = document.querySelector(".theme-toggle i");
const body = document.querySelector("body");

const toggleTheme = () => {
  if (body.classList.contains("dark-theme")) {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    moonIcon.classList.remove("fa-solid");
    moonIcon.classList.add("fa-regular");
  } else {
    body.classList.add("dark-theme");
    body.classList.remove("light-theme");
    moonIcon.classList.add("fa-solid");
    moonIcon.classList.remove("fa-regular");
  }
};

themeToggleButton.addEventListener("click", toggleTheme);
