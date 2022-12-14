"use strict";

//////////PROJECT #3: Pig Game

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//declared outside function but without values
let scores, currentScore, activePlayer, playing;

//reset function
const init = function () {
  //not inside handler function because every time we roll a dice score will RESET!
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};
init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggle - if there is a class removes it or if it is not there adds a class
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//////////implementing game functionality - rolling the dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1.Generating a random dice roll
    //variable should be inside function because we want to generate new number each time we roll a dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display the dice
    diceEl.classList.remove("hidden");
    //manipulate src attribute
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //add dice to the current score
      currentScore += dice;
      //dynamically selecting id for active player
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. add current score to the score of the active player
    scores[activePlayer] += currentScore;
    //display the score
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if score is 100
    if (scores[activePlayer] >= 100) {
      //3. finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //switch player if it's not 100
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
