const choice_button = document.getElementById("player-choice");
const reset_button = document.getElementById("reset-button");
const cpu_choice = document.getElementById("computer-choice");
const graphic = document.getElementById("player-svg");
choice_button.addEventListener("click", cycle_signs);
reset_button.addEventListener("click", reset);

const announcer = document.getElementById("announcer");

function cycle_signs() {
  // Get list of classes of the button to check which sign is currently selected
  const sign = choice_button.classList;
  // Check which sign is currently selected and cycle to the next on click
  
  if (sign[1] === "rock" || sign[2] === "rock") {
    sign.remove("rock");
    sign.add("scissors");
    
    graphic.src = "images/scissors.svg"
  }
  else if (sign[1] === "scissors" || sign[2] === "scissors") {
    sign.remove("scissors");
    sign.add("paper");
    graphic.src = "images/paper.svg"
  }
  else if (sign[1] === "paper" || sign[2] === "paper") {
    sign.remove("paper");
    sign.add("rock");
    graphic.src = "images/rock.svg"
  }
}

const c_graphic = document.getElementById("cpu-svg");
const play_button = document.getElementById("play");
play_button.addEventListener("click", play_round);

function play_round() {

  play_button.disabled = true;
  cpu_choice.classList.remove("winner");
  choice_button.classList.remove("winner");

  let cpu_pick = Math.floor(Math.random() * 3);
  
  if (cpu_pick == 0) c_graphic.src = "images/rock.svg";
  if (cpu_pick == 1) c_graphic.src = "images/scissors.svg";
  if (cpu_pick == 2) c_graphic.src = "images/paper.svg";
  
  const sign = choice_button.classList;
  const p_score = document.getElementById("p-score");
  const c_score = document.getElementById("cpu-score");

  if (sign[1] == "rock") {
    if (cpu_pick == 2) cpu_win();
    if (cpu_pick == 1) p_win();
    if (cpu_pick == 0) draw();
  }

  if (sign[1] == "paper") {
    if (cpu_pick == 2) draw();
    if (cpu_pick == 1) cpu_win();
    if (cpu_pick == 0) p_win();
  }

  if (sign[1] == "scissors") {
    if (cpu_pick == 2) p_win();
    if (cpu_pick == 1) draw();
    if (cpu_pick == 0) cpu_win();
  }

  function cpu_win() {
    c_score.textContent = Number(c_score.textContent) + 1;
    cpu_choice.classList.add("winner");
    announcer.textContent = "ROUND TO CPU"
  }

  function p_win() {
    p_score.textContent = Number(p_score.textContent) + 1;
    choice_button.classList.add("winner");
    announcer.textContent = "ROUND TO YOU";
  }

  function draw() {
    cpu_choice.classList.remove("winner");
    choice_button.classList.remove("winner");
    announcer.textContent = "Draw!"
  }

  play_button.disabled = false;

  if (Number(p_score.textContent) == 5) {
    play_button.disabled = true;
    announcer.textContent = "YOU WON!"
    return;
  }

  if (Number(c_score.textContent) == 5) {
    play_button.disabled = true;
    announcer.textContent = "YOU LOST!"
    return;
  }
}

function reset() {
  location.reload();
}