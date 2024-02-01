easyMode = () => {
  window.location.href = "start.html";
  sessionStorage.setItem("difficulty", "easy");
  window.location.href = "start.html";
};

normalMode = () => {
  window.location.href = "start.html";
  sessionStorage.setItem("difficulty", "normal");
  window.location.href = "start.html";
};

returnHome = () => {
  window.location.href = "index.html";
};

restartGame = () => {
  window.location.reload();
  // startGame()
};

startGame = () => {
  difficulty = sessionStorage.getItem("difficulty");
  answer = Math.floor(Math.random() * 100);
  // ----------- SHOW ANSWER -----------------------
  // let display_answer = document.getElementById("answer");
  // display_answer.innerText = answer;
  // console.log(answer + " | type : " + typeof answer);
  round = 1;
  lowest = 0;
  highest = 99;
  if (difficulty == "easy") {
    hp = 10;
    hintText.innerText = `Hint : It's between ${lowest} - ${highest}`;
  } else if (difficulty == "normal") {
    hp = 5;
  }
  updateHearts();
};

addLog = () => {
  let displayLog = document.getElementById("content");
  // let displayLog = document.getElementById("displayLog");
  let playerAnswer = document.getElementById("playerInput");
  let hintText = document.getElementById("hintText");
  hintText.innerText = `Hint : It's between ${lowest} - ${highest}`;
  if (playerAnswer.value < 0 || playerAnswer.value > 99) {
    console.log("Enter number between 0 - 99 only!");
  } else if (playerAnswer.value.includes(" ")) {
    console.log("value contain space!");
  } else if (playerAnswer.value == "") {
    console.log("type something");
  } else if (isNaN(playerAnswer.value)) {
    console.log("type only number");
  } else {
    if (playerAnswer.value > lowest && playerAnswer.value < answer) {
      lowest = playerAnswer.value;
    } else if (playerAnswer.value < highest && playerAnswer.value > answer) {
      highest = playerAnswer.value;
    }
    if (playerAnswer.value > answer) {
      var logDiv = `<div class="log">
                <div class="round">
                  <h5>${round}</h5>
                </div>
                <div class="detail-log">
                  <h5>You Answer : ${playerAnswer.value} | Guess Lower!</h5>
                   <img class="icon" src="img/down-arrow (1).png">
                  </div>
                </div>`;
      if (difficulty == "easy") {
        hintText.innerText = `Hint : It's between ${lowest} - ${highest}`;
      } else {
        hintText.innerText = "";
      }
      displayLog.innerHTML += logDiv;
    } else if (playerAnswer.value < answer) {
      var logDiv = `<div class="log">
                <div class="round">
                  <h5>${round}</h5>
                </div>
                <div class="detail-log">
                  <h5>You Answer : ${playerAnswer.value} | Guess Higher!</h5>
                   <img class="icon" src="img/up-arrow.png">
                  </div>
                </div>`;
      if (difficulty == "easy") {
        hintText.innerText = `Hint : It's between ${lowest} - ${highest}`;
      } else {
        hintText.innerText = "";
      }
      displayLog.innerHTML += logDiv;
    } else if (playerAnswer.value == answer) {
      // hintText.innerText = `You Win!`; //temp
      playerWin();
      return 0;
    }
    if (
      (round >= 10 && difficulty == "easy") ||
      (round >= 5 && difficulty == "normal")
    ) {
      // hintText.innerText = `You Lose!`; //temp
      playerLose();
    }
    round++;
    removeHp();
    var contentLog = document.getElementById("content");
    contentLog.scrollTop = contentLog.scrollHeight;
  }
  playerAnswer.value = "";
};

removeHp = () => {
  if (hp > 0) {
    hp--;
    updateHearts();
  }
};
updateHearts = () => {
  const hpContainer = document.getElementById("hpContainer");
  hpContainer.innerHTML = ""; // Clear previous hearts

  for (let i = 0; i < hp; i++) {
    let hpIcon = `<img class="icon" src="img/heart.png" alt="heart">`;
    hpContainer.innerHTML += hpIcon;
  }
};

playerWin = () => {
  displayAnswer = document.getElementById("displayAnswer");
  popUp = document.getElementById("popUp");
  cheerText = document.getElementById("cheerText");
  cheerText.innerText = "Great work";
  overlayText.innerText = "You guess correctly!";
  displayAnswer.innerText = answer;
  popUp.classList.toggle("popup-hidden");
  popUp.classList.toggle("popup-visible");
  displayAnswer.value = answer;
};

playerLose = () => {
  popUp = document.getElementById("popUp");
  overlayHeader = document.getElementById("overlayHeader");
  displayAnswer = document.getElementById("displayAnswer");
  overlayText = document.getElementById("overlayText");
  cheerText = document.getElementById("cheerText");
  cheerText.innerText = "Unfortunately";
  overlayText.innerText = "You lose the game!";
  displayAnswer.innerText = answer;
  overlayHeader.classList.toggle("overlay-header-lose");
  displayAnswer.classList.toggle("answer-lose");
  overlayText.classList.toggle("overlay-text-lose");
  popUp.classList.toggle("popup-hidden");
  popUp.classList.toggle("popup-visible");
};

openPopUp = () => {
  aboutPopUp = document.getElementById("popUp");
  aboutPopUp.classList.toggle("popup-visible");
  aboutPopUp.classList.toggle("popup-hidden");
};

closePopUp = () => {
  aboutPopUp = document.getElementById("popUp");
  aboutPopUp.classList.toggle("popup-visible");
  aboutPopUp.classList.toggle("popup-hidden");
};
