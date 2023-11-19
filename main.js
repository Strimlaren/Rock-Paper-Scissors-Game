// Object to organize all elements needed to manipulate DOM
const elements = {
choice_button:  document.getElementById("player-choice"),
cpu_choice:     document.getElementById("computer-choice"),
reset_button:   document.getElementById("reset-button"),
graphic:        document.getElementById("player-svg"),
c_info:         document.getElementById("computer-info"),
c_graphic:      document.getElementById("cpu-svg"),
c_score:        document.getElementById("cpu-score"),
p_score:        document.getElementById("p-score"),
play_button:    document.getElementById("play"),
history:        document.getElementById("history"),
announcer:      document.getElementById("announcer")
}
// Eventlisteners
elements.play_button.addEventListener("click", play_round);
elements.choice_button.addEventListener("click", cycle_signs);
elements.reset_button.addEventListener("click", reset);
// Lists of excuses and taunts the CPU will use
const excuses = ["I was tired!", "I looked away!", "Luck!", "Who are you?!", "I was changing tires!", "It's cold over here!", "I wasn't trying!", "I'm just warming up..", "Did we start already?", "Neo, is that you?", "I was doing my nails!", "I wasn't ready!", "My water just broke..", "I dropped my taco..", "What are the rules again?", "Im not a real CPU..", "I wasn't given an AI..", "You're just guessing!", "I'm depressed. Mortgage.. kids.. WIFE!"];
const mocking = ["You need a tissue?", "You are bad at this..", "Damn, I'm good.", "Why are you still here?", "I can do this all day!", "I pity the fool!", "PAIN!", "Cry me a river!", "Aww, you gonna cry?", "I've been training for years!", "I never lose!", "Are you trolling?", "I'm so good I'm scary.", "Hah! I'm reading your mind!", "Yo momma's not here!"]


function cycle_signs() {
  // Get list of classes of the button to check which sign is currently selected
  const sign = elements.choice_button.classList;
  // Check which sign is currently selected and cycle to the next on click. Since .winner class might currently be on the sign selector button, the class we are looking for might be in different locations inside the classList array.
  if (sign[1] === "rock" || sign[2] === "rock") {
    sign.remove("rock");
    sign.add("scissors");
    elements.graphic.src = "images/scissors.svg"
  }
  else if (sign[1] === "scissors" || sign[2] === "scissors") {
    sign.remove("scissors");
    sign.add("paper");
    elements.graphic.src = "images/paper.svg"
  }
  else if (sign[1] === "paper" || sign[2] === "paper") {
    sign.remove("paper");
    sign.add("rock");
    elements.graphic.src = "images/rock.svg"
  }
}

function play_round() {
  // Remove winner GFX if there was any winner in the last round
  elements.cpu_choice.classList.remove("winner");
  elements.choice_button.classList.remove("winner");
  // Get the classlist of player sign pick so we can compare signs with CPU
  const sign = elements.choice_button.classList;
  // Decide what the CPU will play
  let cpu_pick = Math.floor(Math.random() * 3);
  // Give the CPU the correct sign based on what he "picked"
  if (cpu_pick == 0) elements.c_graphic.src = "images/rock.svg";
  if (cpu_pick == 1) elements.c_graphic.src = "images/scissors.svg";
  if (cpu_pick == 2) elements.c_graphic.src = "images/paper.svg";
  // Game logic. The player sign pick class will allways be in [1], because we started game round by removing .winner class
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
  // If player or CPU reaches 5 round wins, game is over
  if (Number(elements.p_score.textContent) == 5) {
    elements.play_button.disabled = true;
    elements.announcer.textContent = "YOU WON!"
    elements.c_info.textContent = "I don't like this game :(";
    elements.play_button.textContent = "GAME OVER";
    return;
  }

  if (Number(elements.c_score.textContent) == 5) {
    elements.play_button.disabled = true;
    elements.announcer.textContent = "YOU LOST!"
    elements.c_info.textContent = "Get rekt noob!";
    elements.play_button.textContent = "GAME OVER";
    return;
  }
}

function cpu_win() {
  elements.c_score.textContent = Number(elements.c_score.textContent) + 1;
  elements.cpu_choice.classList.add("winner");
  elements.announcer.textContent = "ROUND TO CPU >"
  elements.c_info.textContent = mocking[Math.floor(Math.random() * mocking.length)];
  elements.history.innerHTML += `<span class="loss">L </span>`;
}

function p_win() {
  elements.p_score.textContent = Number(elements.p_score.textContent) + 1;
  elements.choice_button.classList.add("winner");
  elements.announcer.textContent = "< ROUND TO YOU";
  elements.c_info.textContent = excuses[Math.floor(Math.random() * excuses.length)];
  elements.history.innerHTML += `<span class="win">W </span>`;
}

function draw() {
  elements.cpu_choice.classList.remove("winner");
  elements.choice_button.classList.remove("winner");
  elements.announcer.textContent = "< Draw! >"
  elements.c_info.textContent = "Boring!";
  elements.history.innerHTML += `<span class="draw">D </span>`;
}
// Reset game (browser refresh)
function reset() {
  location.reload();
}