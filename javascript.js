// Récupérer les éléments DOM pour les personnages
const characterA = document.getElementById('character-a');
const characterB = document.getElementById('character-b');

const characterABar = document.getElementById('character-a-bar');
function getCharacterAHealthBars() {
  return characterABar.querySelectorAll('.health-bar');
}

const characterAHealthBars = getCharacterAHealthBars();

let aHealth = 3; // Niveau de santé initial du personnage A

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

// Animer le personnage A
function animateA() {
  aPosition += 15; // Augmenter la position de 10 pixels à chaque frame
  characterA.style.left = aPosition + 'px'; // Déplacer le personnage A vers la droite
  if (aPosition >= bPosition - 185) { // Arrêter l'animation lorsque le personnage A atteint le personnage B
    clearInterval(animationInterval);
    animateBackA(); // Faire revenir le personnage A à sa position initiale
    reduceAHealth(); // Réduire la santé du personnage A lorsque le personnage B est atteint
  }
}

function reduceAHealth() {
  if (aHealth > 0) {
    const healthBar = characterAHealthBars[aHealth - 1];
    healthBar.style.backgroundColor = 'red'; // Modifier la couleur de la barre de vie correspondante
    aHealth -= 1;
    if (aHealth === 0) {
      // Le personnage A est vaincu
    }
  }
}

// Animer le personnage A pour revenir à sa position initiale
function animateBackA() {
  let backAnimationInterval = setInterval(function() {
    aPosition -= 15; // Diminuer la position de 10 pixels à chaque frame
    characterA.style.left = aPosition + 'px'; // Déplacer le personnage A vers la gauche
    if (aPosition <= 200) { // Arrêter l'animation lorsque le personnage A est revenu à sa position initiale
      clearInterval(backAnimationInterval);
      animateB(); // Appeler la fonction animateB une fois que le personnage A est revenu à sa position initiale
    }
  }, 50);
}

// Animer le personnage B pour se déplacer vers le personnage A
function animateB() {
  let bStart = bPosition;
  let bEnd = aPosition + 85; // Ajouter un petit décalage pour que les personnages ne se chevauchent pas
  let bDirection = bStart < bEnd ? 1 : -1; // Déterminer la direction de l'animation
  let bAnimationInterval = setInterval(function() {
    bPosition += bDirection * 15; // Augmenter ou diminuer la position de 10 pixels à chaque frame en fonction de la direction
    characterB.style.left = bPosition + 'px'; // Déplacer le personnage B
    if ((bDirection === 1 && bPosition >= bEnd) || (bDirection === -1 && bPosition <= bEnd)) { // Arrêter l'animation lorsque le personnage B atteint le personnage A
      clearInterval(bAnimationInterval);
      animateBackB(); // Faire revenir le personnage B à sa position initiale
    }
  }, 50);
}

// Animer le personnage B pour revenir à sa position initiale
function animateBackB() {
  let backAnimationInterval = setInterval(function() {
    bPosition -= 15; // Diminuer la position de 10 pixels à chaque frame
    characterB.style.left = bPosition + 'px'; // Déplacer le personnage B vers la gauche
    if (bPosition <= 600) { // Arrêter l'animation lorsque le personnage B est revenu à sa position initiale
      clearInterval(backAnimationInterval);
    }
  }, 50);
}

// Lancer l'animation
const animationInterval = setInterval(animateA, 50);
