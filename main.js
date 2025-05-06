const gameArea = document.getElementById('gameArea');
// const target = document.getElementById('target');
// const bomb = document.getElementById('bomb');
const scoreBoard = document.getElementById('scoreBoard');
const setupForm = document.getElementById('setupForm');

let score = 0;
let nextExpected = 1;

// function bombTarget() {
//   const gameAreaRect = gameArea.getBoundingClientRect();
//   const maxX = gameAreaRect.width - bomb.offsetWidth;
//   const maxY = gameAreaRect.height - bomb.offsetHeight;

//   const randomX = Math.floor(Math.random() * maxX);
//   const randomY = Math.floor(Math.random() * maxY);

//   bomb.style.left = `${randomX}px`;
//   bomb.style.top = `${randomY}px`;
// }

// function moveTarget() {
//   const gameAreaRect = gameArea.getBoundingClientRect();
//   const maxX = gameAreaRect.width - target.offsetWidth;
//   const maxY = gameAreaRect.height - target.offsetHeight;

//   const randomX = Math.floor(Math.random() * maxX);
//   const randomY = Math.floor(Math.random() * maxY);

//   target.style.left = `${randomX}px`;
//   target.style.top = `${randomY}px`;
// }

// Function to increase the score
function increaseScore() {
  score++;
  scoreBoard.innerHTML = "Score: " + score;
}

// Function to decrease the score
function decreaseScore() {
  score--;
  scoreBoard.innerHTML = "Score: " + score;
}

// Function to reset the score
function resetScore() {
  score = 0;
  scoreBoard.innerHTML = "Score: " + 0;
}

// Function to create new targets
function createTargets(quantity) {
  gameArea.innerHTML = '';  // Clear old targets
  nextExpected = 1;  // Reset the expected number

  // Create new targets
  for (let i = 0; i < quantity; i++) { 
    const circle = document.createElement('div');
    circle.classList.add('target');
    circle.textContent = i + 1;  

    // Random position within gameArea
    const x = Math.random() * (gameArea.clientWidth - 50);
    const y = Math.random() * (gameArea.clientHeight - 50);

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    // Add event listener to handle clicking the circle
    circle.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      const clickedNumber = parseInt(circle.textContent);

      // If clicked number matches the expected one
      if (clickedNumber === nextExpected) {
        increaseScore();
        circle.remove(); 
        nextExpected++;

        // If no more targets remain, generate new targets
        const remaining = document.querySelectorAll('.target').length;
        if (remaining === 0) {
          setTimeout(() => {
            createTargets(quantity);  // Restart with the same quantity of targets
          }, 500);  // slight delay so player sees the last one disappear
        }
      } else {
        decreaseScore();  // Decrease score for wrong click
      }
    });

    gameArea.appendChild(circle);
  }
}

// Listen for Spacebar to reset the game
const spacebarListener = window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    resetScore();  
    gameArea.innerHTML = ''; 
    nextExpected = 1;
  }
});

// Listen for form submission to create targets
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('setupForm');
  const gameArea = document.getElementById('gameArea');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const quantity = parseInt(document.getElementById('quantity').value);

    if (quantity < 1 || quantity > 5) {
      alert("Please enter a number between 1 and 5.");
      return;  // Prevent if input is invalid
    }

    createTargets(quantity);  // Create targets
  });
});
