// Récupérer les éléments DOM pour les personnages
const characterA = document.getElementById('character-a');
const characterB = document.getElementById('character-b');
const topRightB = document.getElementById('top-right-b');
var koContainer = document.getElementById("ko-container");
var startContainer = document.getElementById("start-container");
var characterako = document.getElementById("character-a-ko");

 

//sons du jeu 
var soundEffect = new Audio("smash.mp3");
var soundEffect2 = new Audio("smash2.mp3");
var soundstart = new Audio("start.mp3");
var soundko = new Audio("ko.mp3");
var sounda = new Audio("a.mp3");
var soundb = new Audio("b.mp3");



const victoryMessage = document.getElementById('victory-message');
victoryMessage.style.color = "white";
victoryMessage.style.textAlign = 'center';
victoryMessage.style.fontSize = '40px';
victoryMessage.style.fontWeight = 'bold';

const replayMessage = document.createElement('p');
replayMessage.textContent = "Click to replay";
replayMessage.style.textAlign = 'center';
replayMessage.style.fontSize = '30px';


// Définir les positions initiales
let aPosition = 200;
let bPosition = 600;

const characterABar = document.getElementById('character-a-bar');
function getCharacterAHealthBars() {
  return characterABar.querySelectorAll('.health-bar');
}


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

//Stats personnage A
let aHealth = 100;  // Niveau de santé initial du personnage A
let aDamage = 25;  // Niveau de dégats du personnage A
let aSpeed = 102; // Vitesse du personnage A

//Stats personnage B
let bHealth = 100; // Niveau de santé initial du personnage B
let bDamage = 50;  // Niveau de dégats du personnage B
let bSpeed = 101; // Vitesse du personnage B


// Définir une variable pour savoir si l'animation a déjà été lancée
let animationLaunched = false;

//Afficher message tap to start
startContainer.style.display = "block";


// PERSONNAGE A COMMENCE A JOUER 
// PERSONNAGE A COMMENCE A JOUER 
// PERSONNAGE A COMMENCE A JOUER 
// PERSONNAGE A COMMENCE A JOUER 
// PERSONNAGE A COMMENCE A JOUER 
// PERSONNAGE A COMMENCE A JOUER 
// PERSONNAGE A COMMENCE A JOUER 
// PERSONNAGE A COMMENCE A JOUER 
// PERSONNAGE A COMMENCE A JOUER 

// Animer le personnage A
function animateA() {
  let aAnimationInterval = setInterval(function() {
  aPosition += 15; // Augmenter la position de 10 pixels à chaque frame
  characterA.style.left = aPosition + 'px'; // Déplacer le personnage A vers la droite

  if (aPosition >= bPosition - 185) { // Arrêter l'animation lorsque le personnage A atteint le personnage B
    clearInterval(aAnimationInterval);
    reduceAHealth(); // reduire des HP du concurrent
    if (aHealth > 0 && bHealth > 0) {
      animateBackA(); // Faire revenir le personnage A à sa position initiale
    }else {  
      //victoryMessage.textContent = "A WON!";
      //victoryMessage.appendChild(replayMessage);
      soundko.play();
      koContainer.style.display = "block";
      changeCharacterAImage(); // Change character image
      animationLaunched = false;
      document.body.addEventListener('click', handleClick);
    }
  }
}, 50);
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
      reduceBHealth(); // reduire des HP du concurrent
      if (aHealth > 0 && bHealth > 0) {
        animateBackB(); // Faire revenir le personnage B à sa position initiale
      }else {  
        //victoryMessage.textContent = "B WON!";
        //victoryMessage.appendChild(replayMessage);
        soundko.play();
        koContainer.style.display = "block";
        changeCharacterBImage(); // Change character image
        animationLaunched = false;
        document.body.addEventListener('click', handleClick);
      }
    }
  }, 50);
}


// Animer le personnage B pour revenir à sa position initiale
function animateBackB() {
  let backAnimationInterval = setInterval(function() {
    bPosition += 15; // Diminuer la position de 10 pixels à chaque frame
    characterB.style.left = bPosition + 'px'; // Déplacer le personnage B vers la gauche
    if (bPosition >= 500) { // Arrêter l'animation lorsque le personnage B est revenu à sa position initiale
      clearInterval(backAnimationInterval);
      bPosition = 600;
      animateA();
    }
  }, 50);


}


function reduceAHealth() {
  if (aHealth > 0) {
    // Joue le son d'effet
    soundEffect.play();
    sounda.play();
    aHealth -= aDamage;
    
    if (aHealth <= 75) {
    const healthBar = healthBarB;
    healthBar.style.backgroundColor = 'lightgreen'; // Modifier la couleur de la barre de vie du personnage B
    }

    if (aHealth <= 50) {
      const healthBar = healthBarB;
      healthBar.style.backgroundColor = 'yellow'; // Modifier la couleur de la barre de vie du personnage B
      }

    if (aHealth <= 25) {
    // Le personnage A est vaincu
    const healthBar = healthBarB;
    healthBar.style.backgroundColor = 'orange'; // Modifier la couleur de la barre de vie du personnage B
    }
    if (aHealth <= 0) {
      // Le personnage A est vaincu
      const healthBar = healthBarB;
      healthBar.style.backgroundColor = 'red'; // Modifier la couleur de la barre de vie du personnage B
      }
  }
}

function reduceBHealth() {
  if (bHealth > 0) {
    // Joue le son d'effet
    soundEffect2.play();
    soundb.play();
    bHealth -= bDamage;

    if (bHealth <= 75) {
    const healthBar = healthBarA;
    healthBar.style.backgroundColor = 'lightgreen'; // Modifier la couleur de la barre de vie du personnage A
    }

    if (bHealth <= 50) {
      const healthBar = healthBarA;
      healthBar.style.backgroundColor = 'yellow'; // Modifier la couleur de la barre de vie du personnage A
      }

    if (bHealth <= 25) {
    // Le personnage A est vaincu
    const healthBar = healthBarA;
    healthBar.style.backgroundColor = 'orange'; // Modifier la couleur de la barre de vie du personnage A
    }
    if (bHealth <= 0) {
      // Le personnage A est vaincu
      const healthBar = healthBarA;
      healthBar.style.backgroundColor = 'red'; // Modifier la couleur de la barre de vie du personnage A
      }
  }
}



// PERSONNAGE B COMMENCE A JOUER 
// PERSONNAGE B COMMENCE A JOUER 
// PERSONNAGE B COMMENCE A JOUER 
// PERSONNAGE B COMMENCE A JOUER 
// PERSONNAGE B COMMENCE A JOUER 
// PERSONNAGE B COMMENCE A JOUER 
// PERSONNAGE B COMMENCE A JOUER 
// PERSONNAGE B COMMENCE A JOUER 
// PERSONNAGE B COMMENCE A JOUER 

// Animer le personnage B
function RanimateB() {
  let bStart = bPosition;
  let bEnd = aPosition + 85; // Ajouter un petit décalage pour que les personnages ne se chevauchent pas
  let bDirection = bStart < bEnd ? 1 : -1; // Déterminer la direction de l'animation
  let bAnimationInterval = setInterval(function() {
    bPosition += bDirection * 15; // Augmenter ou diminuer la position de 10 pixels à chaque frame en fonction de la direction
    characterB.style.left = bPosition + 'px'; // Déplacer le personnage B
    if ((bDirection === 1 && bPosition >= bEnd) || (bDirection === -1 && bPosition <= bEnd)) { // Arrêter l'animation lorsque le personnage B atteint le personnage A
      clearInterval(bAnimationInterval);
      RreduceBHealth(); // reduire des HP du concurrent
      if (aHealth > 0 && bHealth > 0) {
        RanimateBackB(); // Faire revenir le personnage B à sa position initiale
      }else {  
        //victoryMessage.textContent = "B WON!";
        //victoryMessage.appendChild(replayMessage);
        soundko.play();
        koContainer.style.display = "block";
        changeCharacterBImage(); // Change character image
        animationLaunched = false;
        document.body.addEventListener('click', handleClick);
      }
    }
  }, 50);
}

// Animer le personnage A pour revenir à sa position initiale
function RanimateBackB() {
  let backAnimationInterval = setInterval(function() {
    bPosition += 15; // Diminuer la position de 10 pixels à chaque frame
    characterB.style.left = bPosition + 'px'; // Déplacer le personnage B vers la gauche
    if (bPosition >= 500) { // Arrêter l'animation lorsque le personnage B est revenu à sa position initiale
      clearInterval(backAnimationInterval);
      bPosition = 600;
      RanimateA();
    }
  }, 50);
}

// Animer le personnage B pour se déplacer vers le personnage A
function RanimateA() {
  let aAnimationInterval = setInterval(function() {
    aPosition += 15; // Augmenter la position de 10 pixels à chaque frame
    characterA.style.left = aPosition + 'px'; // Déplacer le personnage A vers la droite
  
    if (aPosition >= bPosition - 185) { // Arrêter l'animation lorsque le personnage A atteint le personnage B
      clearInterval(aAnimationInterval);
      RreduceAHealth(); // reduire des HP du concurrent
      if (aHealth > 0 && bHealth > 0) {
        RanimateBackA(); // Faire revenir le personnage A à sa position initiale
      }else {  
        //victoryMessage.textContent = "A WON!";
        //victoryMessage.appendChild(replayMessage);
        soundko.play();
        koContainer.style.display = "block";
        changeCharacterAImage(); // Change character image
        animationLaunched = false;
        document.body.addEventListener('click', handleClick);
      }
    }
  }, 50);
}


// Animer le personnage B pour revenir à sa position initiale
function RanimateBackA() {
  let backAnimationInterval = setInterval(function() {
    aPosition -= 15; // Diminuer la position de 10 pixels à chaque frame
    characterA.style.left = aPosition + 'px'; // Déplacer le personnage A vers la gauche
    if (aPosition <= 200) { // Arrêter l'animation lorsque le personnage A est revenu à sa position initiale
      clearInterval(backAnimationInterval);
      animateB(); // Appeler la fonction animateB une fois que le personnage A est revenu à sa position initiale
    }
  }, 50);
}


function RreduceAHealth() {
  if (aHealth > 0) {
    aHealth -= aDamage;
    
    if (aHealth <= 75) {
    const healthBar = healthBarB;
    healthBar.style.backgroundColor = 'lightgreen'; // Modifier la couleur de la barre de vie du personnage B
    }

    if (aHealth <= 50) {
      const healthBar = healthBarB;
      healthBar.style.backgroundColor = 'yellow'; // Modifier la couleur de la barre de vie du personnage B
      }

    if (aHealth <= 25) {
    // Le personnage A est vaincu
    const healthBar = healthBarB;
    healthBar.style.backgroundColor = 'orange'; // Modifier la couleur de la barre de vie du personnage B
    }
    if (aHealth <= 0) {
      // Le personnage A est vaincu
      const healthBar = healthBarB;
      healthBar.style.backgroundColor = 'red'; // Modifier la couleur de la barre de vie du personnage B
      }
  }
}

function RreduceBHealth() {
  if (bHealth > 0) {
    bHealth -= bDamage;

    if (bHealth <= 75) {
    const healthBar = healthBarA;
    healthBar.style.backgroundColor = 'lightgreen'; // Modifier la couleur de la barre de vie du personnage A
    }

    if (bHealth <= 50) {
      const healthBar = healthBarA;
      healthBar.style.backgroundColor = 'yellow'; // Modifier la couleur de la barre de vie du personnage A
      }

    if (bHealth <= 25) {
    // Le personnage A est vaincu
    const healthBar = healthBarA;
    healthBar.style.backgroundColor = 'orange'; // Modifier la couleur de la barre de vie du personnage A
    }
    if (bHealth <= 0) {
      // Le personnage A est vaincu
      const healthBar = healthBarA;
      healthBar.style.backgroundColor = 'red'; // Modifier la couleur de la barre de vie du personnage A
      }
  }
}



// Function to change character image 
function changeCharacterAImage() {
  characterB.style.backgroundImage = "url('B.png')";
  characterA.style.backgroundImage = "url('AKO.png')";
}
function changeCharacterBImage() {
  characterB.style.backgroundImage = "url('BWIN.png')";
  characterA.style.backgroundImage = "url('AKO.png')";
}











// Fonction à exécuter après le clic
function handleClick() {
  if (!animationLaunched) { // Vérifier si l'animation n'a pas encore été lancée

    //Jouer son Start
    soundstart.play();

    // valeur a modifier selon personnage 
    aHealth = 100; 
    bHealth = 100;

    //init si relance 
    aPosition = 200;
    bPosition = 600;
    bStart = bPosition;
    characterA.style.left = aPosition + 'px';
    characterB.style.left = 500 + 'px';
    characterA.style.backgroundImage = "url('A.png')";
    healthBarB.style.backgroundColor = 'green';
    healthBarA.style.backgroundColor = 'green';
    victoryMessage.textContent = "";
    koContainer.style.display = "none";
    startContainer.style.display = "none";

    //lancement animation
    if (aSpeed >= bSpeed){
      animateA();
     animationLaunched = true;
      // Supprimer l'écouteur d'événements pour éviter l'exécution ultérieure
      document.body.removeEventListener('click', handleClick);
    }else{
      RanimateB();
      animationLaunched = true;
      // Supprimer l'écouteur d'événements pour éviter l'exécution ultérieure
      document.body.removeEventListener('click', handleClick);
    }
  }
}

// Ajouter l'écouteur d'événements
document.body.addEventListener('click', handleClick);
