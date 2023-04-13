// Récupérer les éléments DOM pour les personnages
const characterA = document.getElementById('character-a');
const characterB = document.getElementById('character-b');

const characterABar = document.getElementById('character-a-bar');
function getCharacterAHealthBars() {
  return characterABar.querySelectorAll('.health-bar');
}

const characterAHealthBars = getCharacterAHealthBars();

let aHealth = 3 // Niveau de santé initial du personnage A
let bHealth = 3; // Niveau de santé initial du personnage B

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




// Animer le personnage A
function animateA() {
  if (fight == true){
  aPosition += 15; // Augmenter la position de 10 pixels à chaque frame
  characterA.style.left = aPosition + 'px'; // Déplacer le personnage A vers la droite

  if (aPosition >= bPosition - 185) { // Arrêter l'animation lorsque le personnage A atteint le personnage B
    clearInterval(animationInterval);
    if (fight == true){
    reduceAHealth(); // Réduire la santé du personnage A lorsque le personnage B est atteint
    checkhealthA(); // Verifier HP PErsonnage
    if (fight == true){
    animateBackA(); // Faire revenir le personnage A à sa position initiale
    setTimeout(function() {
      // cette fonction est vide
    }, 1000); // délai de 1000 millisecondes (2 secondes)
  }}}
}
}

function reduceAHealth() {
  if (aHealth > 0) {
    aHealth -= 1;
    
    if (aHealth === 2) {
    const healthBar = healthBarB;
    healthBar.style.backgroundColor = 'yellow'; // Modifier la couleur de la barre de vie du personnage A
    }

    if (aHealth === 1) {
      const healthBar = healthBarB;
      healthBar.style.backgroundColor = 'orange'; // Modifier la couleur de la barre de vie du personnage A
      }

    if (aHealth === 0) {
    // Le personnage A est vaincu
    const healthBar = healthBarB;
    healthBar.style.backgroundColor = 'red'; // Modifier la couleur de la barre de vie du personnage A
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
      reduceBHealth(); // Réduire la santé du personnage A lorsque le personnage B est atteint
      checkhealthB(); // Verifier HP PErsonnage
      if (fight == true){
        animateBackB(); // Faire revenir le personnage B à sa position initiale
        setTimeout(function() {
        bPosition = 600;
        setInterval(animateA, 50);
      }, 1000);// Exécuter l'animation A après que l'animation B soit terminée
    }}
  }, 50);
}

function reduceBHealth() {
  if (bHealth > 0) {
    bHealth -= 1;
    
    if (bHealth === 2) {
    const healthBar = healthBarA;
    healthBar.style.backgroundColor = 'yellow'; // Modifier la couleur de la barre de vie du personnage A
    }

    if (bHealth === 1) {
      const healthBar = healthBarA;
      healthBar.style.backgroundColor = 'orange'; // Modifier la couleur de la barre de vie du personnage A
      }

    if (bHealth === 0) {
    // Le personnage A est vaincu
    const healthBar = healthBarA;
    healthBar.style.backgroundColor = 'red'; // Modifier la couleur de la barre de vie du personnage A
    }
  }
}

//verifier HP 
function checkhealthA(){
  if (aHealth > 0 && bHealth > 0) { // Si les deux personnages sont toujours en vie, l'animation doit se répéter

    }else {
      fight = false;
     //alert("Vous avez perdu !");
     // clearInterval(backAnimationInterval);
    }
}

//verifier HP 
function checkhealthB(){
  if (aHealth > 0 && bHealth > 0) { // Si les deux personnages sont toujours en vie, l'animation doit se répéter

    
    }else {
      fight = false;
      //alert("Vous avez perdu !");
     // clearInterval(backAnimationInterval);
    }
}

// Animer le personnage B pour revenir à sa position initiale
function animateBackB() {
  let backAnimationInterval = setInterval(function() {
    bPosition += 15; // Diminuer la position de 10 pixels à chaque frame
    characterB.style.left = bPosition + 'px'; // Déplacer le personnage B vers la gauche
    if (bPosition >= 500) { // Arrêter l'animation lorsque le personnage B est revenu à sa position initiale
      clearInterval(backAnimationInterval);
    }
  }, 50);


}

// Lancer l'animation
const animationInterval = setInterval(animateA, 50);
