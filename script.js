const otherContainers = document.querySelectorAll(".non-rules");
const body = document.getElementById("body");
const score = document.getElementById("score");
const gameButtons = document.querySelectorAll(".gameButtons");
const gamePage = document.querySelector(".startGame");
const inGamePage = document.querySelector(".inGame");
const userChoice = document.getElementById("userChoice");
const statusField = document.querySelector(".status");
const playAgain = document.getElementById("playAgain");
const houseChoiced = document.getElementById("houseChoice");
const rules = document.getElementById("rules");
const rulesBtn = document.querySelector(".rulesbtn");
const result = document.getElementById("result");
const closeRules = document.getElementById("close");
const choices = ["scissors", "spock", "lizard", "rock", "paper"];
const getComputerChoice = () => choices[Math.floor(Math.random() * 5)];

const changeLayout = (choice) => {
   gamePage.style.display = "none";
   inGamePage.style.display = "flex";
   userChoice.innerHTML = `<img src="images/icon-${choice}.svg">`;
   userChoice.classList.add(choice);
};
const houseChoice = (choice) => {
   houseChoiced.innerHTML = `<img src="images/icon-${choice}.svg">`;
   houseChoiced.classList.add(choice);
};
let userScore = 0;
if (Number(localStorage.getItem("score")) != null)
   userScore = Number(localStorage.getItem("score")); // get the score from the localStorage
score.textContent = userScore;
const scoreTracker = (winStatus) => {
   if (winStatus) {
      userScore++;
   } else {
      userScore--;
   }
   localStorage.setItem("score", userScore.toString());
};
const statusDisplay = () => {
   statusField.style.display = "flex";
   score.textContent = userScore;
};
const gamePlay = (choice) => {
   let isWin;  // tracks the win or lose of the player
   let computerChoice = getComputerChoice();
   if (choice === computerChoice) {
      result.textContent = "You Draw";
   } else if (
      (choice === "paper" &&
         (computerChoice === "rock" || computerChoice === "spock")) ||
      (choice === "rock" &&
         (computerChoice === "scissors" || computerChoice === "lizard")) ||
      (choice === "scissors" &&
         (computerChoice === "paper" || computerChoice === "lizard")) ||
      (choice === "spock" &&
         (computerChoice === "scissors" || computerChoice === "rock")) ||
      (choice === "lizard" &&
         (computerChoice === "paper" || computerChoice === "spock"))
   ) {
      result.textContent = "You Win";
      isWin = true;
      scoreTracker(isWin);
   } else {
      result.textContent = "You Lose";
      isWin = false;
      scoreTracker(isWin);
   }
   return computerChoice;
};
gameButtons.forEach((gameButton, index) => {
   gameButton.onclick = () => {
      changeLayout(choices[index]);
      let computerChoice = gamePlay(choices[index]);
      setTimeout(() => houseChoice(computerChoice), 1000);
      setTimeout(statusDisplay, 2000);
      playAgain.onclick = () => {  // reset the changes and start the game again 
         inGamePage.style.display = "none";
         houseChoiced.innerHTML = ``;
         houseChoiced.classList.remove(computerChoice);
         userChoice.classList.remove(choices[index]);
         statusField.style.display = "none";
         gamePage.style.display = "block";
      };
   };
});
rulesBtn.onclick = () => {
   rules.style.display = "flex";
   otherContainers.forEach(
      (otherContainer) => (otherContainer.style.opacity = "0.5")
   );
   body.classList.add("darkBody");
};
closeRules.onclick = () => {
   rules.style.display = "none";
   otherContainers.forEach(
      (otherContainer) => (otherContainer.style.opacity = "1")
   );
   body.classList.remove("darkBody");
};