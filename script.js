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

  //Disable all inputs except first one
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );

  inputsInDisabledDiv.forEach((input) => {
    input.disabled = true;
  });

  // Add event listner
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      // To convert the input to Uppercase
      this.value = this.value.toUpperCase();
      // to set fouce to next input field
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);

      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      } else if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}

window.onload = function () {
  generateInput();
};
