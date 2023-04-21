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

let aHealth = 30;
let bHealth = 30;



  function animateA() {
    aPosition += 15; // Augmenter la position de 10 pixels à chaque frame
    characterA.style.left = aPosition + 'px'; // Déplacer le personnage A vers la droite
  
    if (aPosition >= bPosition - 185) { // Arrêter l'animation lorsque le personnage A atteint le personnage B
      clearInterval(animationInterval);
      setTimeout(function() {
        // cette fonction est vide
      }, 1000); // délai de 1000 millisecondes (2 secondes)
    }
  }

  function reduceBHealth() {
    bHealth -= 10;
    //document.getElementById('healthBarB').style.width = bHealth + '%';
    if (bHealth <= 0) {
      endFight('A');
      return;
    }
  }

  function animateBackA() {
    let backAnimationInterval = setInterval(function() {
      aPosition -= 15; // Diminuer la position de 10 pixels à chaque frame
      characterA.style.left = aPosition + 'px'; // Déplacer le personnage A vers la gauche
      if (aPosition <= 200) { // Arrêter l'animation lorsque le personnage A est revenu à sa position initiale
        clearInterval(backAnimationInterval);
      }
    }, 50);
  }

  function animateB() {
    let bStart = bPosition;
    let bEnd = aPosition + 85; // Ajouter un petit décalage pour que les personnages ne se chevauchent pas
    let bDirection = bStart < bEnd ? 1 : -1; // Déterminer la direction de l'animation
    let bAnimationInterval = setInterval(function() {
      bPosition += bDirection * 15; // Augmenter ou diminuer la position de 10 pixels à chaque frame en fonction de la direction
      characterB.style.left = bPosition + 'px'; // Déplacer le personnage B
      if ((bDirection === 1 && bPosition >= bEnd) || (bDirection === -1 && bPosition <= bEnd)) { // Arrêter l'animation lorsque le personnage B atteint le personnage A
        clearInterval(bAnimationInterval);
        if (fight == true){
          setTimeout(function() {
          bPosition = 600;
          setInterval(animateA, 50);
        }, 1000);// Exécuter l'animation A après que l'animation B soit terminée
      }}
    }, 50);
  }

  function reduceAHealth() {
    aHealth -= 10;
    //document.getElementById('healthBarA').style.width = aHealth + '%';
    if (aHealth <= 0) {
      endFight('B');
      return;
    }
  }

  function animateBackB() {
    let backAnimationInterval = setInterval(function() {
      bPosition += 15; // Diminuer la position de 10 pixels à chaque frame
      characterB.style.left = bPosition + 'px'; // Déplacer le personnage B vers la gauche
      if (bPosition >= 500) { // Arrêter l'animation lorsque le personnage B est revenu à sa position initiale
        clearInterval(backAnimationInterval);
      }
    }, 50);
  }

  function endFight(winner) {
    const message = document.createElement('div');
    message.classList.add('message');
    message.innerHTML = `The winner is ${winner}!`;
    document.body.appendChild(message);
  }



function gameLoop() {
  if (aHealth <= 0 || bHealth <= 0) {
    return;
  }
  animateA();
  reduceBHealth();
  animateBackA();
  setTimeout(function() {
    animateB();
    reduceAHealth();
    animateBackB();
    setTimeout(gameLoop, 1000);
  }, 1000);
}

gameLoop();

