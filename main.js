const gameArea = document.getElementById('gameArea');
const target = document.getElementById('target');
const bomb = document.getElementById('bomb');
const scoreBoard = document.getElementById('scoreBoard');

let score = 0;

function bombTarget() {
  const gameAreaRect = gameArea.getBoundingClientRect();
  const maxX = gameAreaRect.width - bomb.offsetWidth;
  const maxY = gameAreaRect.height - bomb.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  bomb.style.left = `${randomX}px`;
  bomb.style.top = `${randomY}px`;
}

function moveTarget() {
  const gameAreaRect = gameArea.getBoundingClientRect();
  const maxX = gameAreaRect.width - target.offsetWidth;
  const maxY = gameAreaRect.height - target.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  target.style.left = `${randomX}px`;
  target.style.top = `${randomY}px`;
}

function increaseScore() {
  score ++;
  scoreBoard.innerHTML = "Score: " + score;
}

function decreaseScore() {
  score --;
  scoreBoard.innerHTML = "Score: " + score;
}

function resetScore() {
  score = 0;
  scoreBoard.innerHTML = "Score: " + 0;
}
// Initial target position
moveTarget();
bombTarget();

const ball_listener = target.addEventListener("contextmenu", (e)=> {
  e.preventDefault();
  moveTarget();
  increaseScore();
})

const bomb_listener = bomb.addEventListener("contextmenu", (e)=> {
  e.preventDefault();
  bombTarget();
  decreaseScore();
})

setInterval(() => {
  bombTarget();
}, 750);

const spacebarListener = window.addEventListener("keydown", (e)=> {
  if (e.code === "Space") {
    e.preventDefault();
    resetScore();  
}
})