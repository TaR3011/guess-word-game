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

// manage the words
let wordToGuess = "";
let words = [
  "Create",
  "update",
  "delete",
  "master",
  "branch",
  "Mainly",
  "school",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log(wordToGuess);

let messageArea = document.querySelector(".message");

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
    for (let j = 1; j <= numberofLetters; j++) {
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

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handelGuesses);

function handelGuesses() {
  let successGuess = true;
  for (let i = 1; i <= numberofLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${activeTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    // game logic
    // successGuess = letter === actualLetter ? true : false;
    if (letter === actualLetter) {
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }

  //Check if user win or lose
  if (successGuess) {
    messageArea.innerHTML = `You Win the Word is <span>${wordToGuess.toUpperCase}</span>`;

    //Disable all try by adding disable class to all input divs
    let allTries = document.querySelectorAll(".inputs-section >div");
    allTries.forEach((i) => {
      i.classList.add("disabled-inputs");

      //disable guess button
      guessButton.disabled = true;
    });
  } else {
    // const inputsContainer = document.querySelector(".inputs-section");
    // activeTry += 1;
    // const prevDiv = document.querySelector(`.try-${activeTry - 1}`);
    // prevDiv.classList.add("disabled-inputs");
    // const activeDiv = document.querySelector(`.try-${activeTry}`);
    // activeDiv.classList.remove("disabled-inputs");
    // console.log(activeDiv.children[1]);
    // activeDiv.children[1].focus();

    // // Disable all inputs except first one
    // const inputsInDisabledDiv = document.querySelectorAll(
    //   `.try-${activeTry} input`
    // );

    // inputsInDisabledDiv.forEach((input) => {
    //   input.disabled = true;
    // });

    // add the disable class to faild try

    if (activeTry === numberOfTries) {
      messageArea.innerHTML = `YOU LOSE THE WORD IS <span>${wordToGuess.toUpperCase()}</span>`;
      guessButton.disabled = true;
      return;
    }

    document
      .querySelector(`.try-${activeTry}`)
      .classList.add("disabled-inputs");

    const currentTryInputs = document.querySelectorAll(
      `.try-${activeTry} input`
    );

    currentTryInputs.forEach((input) => {
      input.disabled = true;
    });

    activeTry++;

    // delete the disable class from newTry and add focus to it
    document
      .querySelector(`.try-${activeTry}`)
      .classList.remove("disabled-inputs");

    const nextTryInput = document.querySelectorAll(`.try-${activeTry} input`);

    nextTryInput.forEach((input) => {
      input.disabled = false;
    });

    nextTryInput[0].focus();
  }
}

window.onload = function () {
  generateInput();
};
