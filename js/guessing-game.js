alert("Lets Play A Guessing Game!!!");

// Generates a random number between 1 and 100
function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Fisher-Yates shuffle algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Creates a new game object
function newGame() {
  return {
    playersGuess: null,
    pastGuesses: [],
    winningNumber: generateWinningNumber(),
    difference() {
      return Math.abs(this.playersGuess - this.winningNumber);
    },
    isLower() {
      return this.playersGuess < this.winningNumber;
    },
    checkGuess() {

      if (this.playersGuess === ''){
        return "Please choose a number"
      }
      if (this.playersGuess > 100) {
        return "You have chosen a number greater than 100 please choose again";
      }
      if (this.playersGuess === this.winningNumber) {
        return "You Win!";
      } else if (this.pastGuesses.includes(this.playersGuess)) {
        return "You have already guessed that number.";
      } else {
        this.pastGuesses.push(this.playersGuess);
        if (this.playersGuess === this.winningNumber) {
          winningNumberDiv.innerHTML = `The winning number was ${this.winningNumber}.`;
          return "You Win!";
        } else if (this.pastGuesses.length === 5) {
          winningNumberDiv.innerHTML = `The winning number was ${this.winningNumber}.`;
          return "You Lose.";
        } else if (this.difference() < 10) {
          return "You're burning up!";
        } else if (this.difference() < 25) {
          return "You're lukewarm.";
        } else if (this.difference() < 50) {
          return "You're a bit chilly.";
        } else {
          return "You're ice cold!";
        }
      }
    },

    getHint() {
      // Calculate range based on player's guess and winning number
      let low = Math.min(this.playersGuess, this.winningNumber);
      let high = Math.max(this.playersGuess, this.winningNumber);
      let range = high - low;
      // Generate random number within range
      let hint = Math.floor(Math.random() * range) + low;
      // Return hint as a string
      return `The winning number is between ${hint} and ${high}.`;
    },

    reset() {
      this.playersGuess = null;
      this.pastGuesses = [];
      const guessDivs = document.querySelectorAll("#previous-guesses div");
      for (let i = 0; i < guessDivs.length; i++) {
        guessDivs[i].innerHTML = "";
      }
      // Reset game properties
      winningNumberDiv.innerHTML = "";
      guessInput.value = "";
      resultDiv.innerHTML = "";
      hintDiv.innerHTML = "";
      guessInput.disabled = false;
      guessButton.disabled = false;
      resultDiv.classList.remove("correct");
      resultDiv.classList.remove("incorrect");
      this.winningNumber = generateWinningNumber();
    },
  };
}

const game = newGame();

// Display previous guesses
const guessDivs = document.querySelectorAll("#previous-guesses div");
for (let i = 0; i < game.pastGuesses.length; i++) {
  guessDivs[i].innerHTML = game.pastGuesses[i];
}

// Get DOM elements
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const hintButton = document.getElementById("hint-button");
const resetButton = document.getElementById("reset-button");
const resultDiv = document.getElementById("result");
const hintDiv = document.getElementById("hint");
const winningNumberDiv = document.getElementById("winning-number");

// Add event listener to guess button
guessButton.addEventListener("click", () => {
  // Get player's guess from input field
  const playersGuess = guessInput.value;
  if (this.playersGuess === null) {
    return "Please choose a number.";
  }

  // Check if the value is an empty string
  if (playersGuess == "") {
    // Display an error message
    resultDiv.innerHTML = "Please enter a number.";
  } else {
    // Proceed with the game logic
    game.playersGuess = Number(playersGuess);
    resultDiv.innerHTML = game.checkGuess();
    updatePastGuesses();
  }

  if (playersGuess > 100) {
    resultDiv.innerHTML = "Please enter a number less than 100";
    return;
  }
  // Validate input
  if (playersGuess < 0) {
    resultDiv.innerHTML = "Please enter a positive number";
    return;
  }

  // Update game with player's guess
  game.playersGuess = playersGuess;

  // Check player's guess and display result
  const result = game.checkGuess();
  resultDiv.innerHTML = result;

  // If player wins or loses, disable the input and button
  if (result === "You Win!" || result === "You Lose.") {
    guessInput.disabled = true;
    guessButton.disabled = true;
  }

  // If player's guess is correct, highlight the result
  if (result === "You Win!") {
    resultDiv.classList.add("correct");
    winningNumberDiv.innerHTML = `Winning number: ${game.winningNumber}`;
  } else if (result === "You Lose.") {
    resultDiv.classList.add("incorrect");
    winningNumberDiv.innerHTML = `Winning number: ${game.winningNumber}`;
  } else {
    resultDiv.classList.remove("correct");
    resultDiv.classList.remove("incorrect");
  }

  // Display previous guesses
  for (let i = 0; i < game.pastGuesses.length; i++) {
    guessDivs[i].innerHTML = game.pastGuesses[i];
  }

  // Clear input field
  guessInput.value = "";
});

// Add event listener to input field to detect when enter key is pressed
guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    // Get player's guess from input field
    game.playersGuess = parseInt(guessInput.value);

    // Check player's guess and display result
    const result = game.checkGuess();
    resultDiv.innerHTML = result;

    // If player wins or loses, disable the input and button
    if (result === "You Win!" || result === "You Lose.") {
      guessInput.disabled = true;
      guessButton.disabled = true;
    }

    // If player's guess is correct, highlight the result
    if (result === "You Win!") {
      resultDiv.classList.add("correct");
    } else if (result === "You Lose.") {
      resultDiv.classList.add("incorrect");
    } else {
      resultDiv.classList.remove("correct");
      resultDiv.classList.remove("incorrect");
    }

    // Display previous guesses
    for (let i = 0; i < game.pastGuesses.length; i++) {
      guessDivs[i].innerHTML = game.pastGuesses[i];
    }

    // Clear input field
    guessInput.value = "";
  }
});

// Add event listener to hint button
hintButton.addEventListener("click", () => {
  // Get hint and display it
  const hint = game.getHint();
  hintDiv.innerHTML = hint;
});

// Add event listener to reset button
resetButton.addEventListener("click", () => {
  game.reset();
});
