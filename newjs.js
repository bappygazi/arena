// Récupérer les éléments DOM pour les personnages
const characterA = document.getElementById('character-a');
const characterB = document.getElementById('character-b');


const characterABar = document.getElementById('character-a-bar');
function getCharacterAHealthBars() {
  return characterABar.querySelectorAll('.health-bar');
}

const characterAHealthBars = getCharacterAHealthBars();


var fight = true;

// Définir les positions initiales
let aPosition = 200;
let bPosition = 600;

// Créer des éléments pour les barres de vie
const healthBarA = document.createElement('div');
healthBarA.classList.add('health-bar');
characterA.appendChild(healthBarA);

const healthBarB = document.createElement('div');
healthBarB.classList.add('health-bar');
characterB.appendChild(healthBarB);

// Positionner les barres de vie
const healthBarHeight = 10;
const healthBarWidth = characterA.offsetWidth / 3;
healthBarA.style.top = -healthBarHeight + 'px';
healthBarA.style.width = healthBarWidth + 'px';
healthBarB.style.top = -healthBarHeight + 'px';
healthBarB.style.width = healthBarWidth + 'px';




function startFight() {
  let aHealth = 100;
  let bHealth = 100;
  
  const message = document.createElement('div');
  message.classList.add('message');
  message.innerHTML = 'Fight starts in 3 seconds!';
  document.body.appendChild(message);

  setTimeout(() => {
    message.style.display = 'none';
    animateA();
  }, 1000);

  function animateA() {
    const elem = document.getElementById('characterA');
    let pos = 0;
    const id = setInterval(frame, 20);
    function frame() {
      if (pos === 550) {
        clearInterval(id);
        reduceBHealth();
      } else {
        pos++;
        elem.style.left = pos + 'px';
      }
    }
  }

  function reduceBHealth() {
    bHealth -= 10;
    document.getElementById('healthBarB').style.width = bHealth + '%';
    if (bHealth <= 0) {
      endFight('A');
      return;
    }
    animateBackA();
  }

  function animateBackA() {
    const elem = document.getElementById('characterA');
    let pos = 550;
    const id = setInterval(frame, 20);
    function frame() {
      if (pos === 0) {
        clearInterval(id);
        animateB();
      } else {
        pos--;
        elem.style.left = pos + 'px';
      }
    }
  }

  function animateB() {
    const elem = document.getElementById('characterB');
    let pos = 550;
    const id = setInterval(frame, 20);
    function frame() {
      if (pos === 0) {
        clearInterval(id);
        reduceAHealth();
      } else {
        pos--;
        elem.style.left = pos + 'px';
      }
    }
  }

  function reduceAHealth() {
    aHealth -= 10;
    document.getElementById('healthBarA').style.width = aHealth + '%';
    if (aHealth <= 0) {
      endFight('B');
      return;
    }
    animateBackB();
  }

  function animateBackB() {
    const elem = document.getElementById('characterB');
    let pos = 0;
    const id = setInterval(frame, 20);
    function frame() {
      if (pos === 550) {
        clearInterval(id);
        animateA();
      } else {
        pos++;
        elem.style.left = pos + 'px';
      }
    }
  }

  function endFight(winner) {
    const message = document.createElement('div');
    message.classList.add('message');
    message.innerHTML = `The winner is ${winner}!`;
    document.body.appendChild(message);
  }
}

startFight();
