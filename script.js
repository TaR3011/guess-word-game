// Setting the game name

let gameName = "Guess The Word";

document.title = gameName;
document.querySelector(".main-text").textContent = gameName;
document.querySelector(
  "footer"
).textContent = `${gameName} Game Created by TaR`;

// set game option
let numberOfTries = 6;
let numberofLetters = 6;
let activeTry = 1;

function generateInput() {
  const inputsContainer = document.querySelector(".inputs-section");

  // to create Main tries box
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== activeTry) {
      tryDiv.classList.add("disabled-inputs");
    }

    // to create try inputs
    for (let j = 1; j < numberofLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv);
  } // end nested loop

  inputsContainer.children[activeTry - 1].children[1].focus();
}

window.onload = function () {
  generateInput();
};
