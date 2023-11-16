const choice_button = document.getElementById("player-choice");
const reset_button = document.getElementById("reset-button");
const cpu_choice = document.getElementById("computer-choice");
const graphic = document.getElementById("player-svg");
const c_info = document.getElementById("computer-info");
choice_button.addEventListener("click", cycle_signs);
reset_button.addEventListener("click", reset);

const announcer = document.getElementById("announcer");
const excuses = ["I was tired!", "I looked away!", "Luck!", "Who are you?!", "I was changing tires!", "It's cold over here!", "I wasn't trying!", "I'm just warming up..", "Did we start already?", "Neo, is that you?", "I was doing my nails!", "I wasn't ready!", "My water just broke..", "I dropped my taco..", "What are the rules again?", "Im not a real CPU..", "I wasn't given an AI..", "You're just guessing!", "I'm depressed. Mortgage.. kids.. WIFE!"];
const mocking = ["You need a tissue?", "You are bad at this..", "Damn, I'm good.", "Why are you still here?", "I can do this all day!", "I pity the fool!", "PAIN!", "Cry me a river!", "Aww, you gonna cry?", "I've been training for years!", "I never lose!", "Are you trolling?", "I'm so good I'm scary.", "Hah! I'm reading your mind!", "Yo momma's not here!"]

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
  const history = document.getElementById("history");

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
    announcer.textContent = "ROUND TO CPU >"
    c_info.textContent = mocking[Math.floor(Math.random() * mocking.length)];
    history.innerHTML += `<span class="loss">L </span>`;
  }

  function p_win() {
    p_score.textContent = Number(p_score.textContent) + 1;
    choice_button.classList.add("winner");
    announcer.textContent = "< ROUND TO YOU";
    c_info.textContent = excuses[Math.floor(Math.random() * excuses.length)];
    history.innerHTML += `<span class="win">W </span>`;
  }

  function draw() {
    cpu_choice.classList.remove("winner");
    choice_button.classList.remove("winner");
    announcer.textContent = "< Draw! >"
    c_info.textContent = "Boring!";
    history.innerHTML += `<span class="draw">D </span>`;
  }

  play_button.disabled = false;

  if (Number(p_score.textContent) == 5) {
    play_button.disabled = true;
    announcer.textContent = "YOU WON!"
    c_info.textContent = "I don't like this game :(";
    play_button.textContent = "GAME OVER";
    return;
  }

  if (Number(c_score.textContent) == 5) {
    play_button.disabled = true;
    announcer.textContent = "YOU LOST!"
    c_info.textContent = "Get rekt noob!";
    play_button.textContent = "GAME OVER";
    return;
  }
}

function reset() {
  location.reload();
}