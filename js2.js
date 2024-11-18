//Stats personnage A
let aHealth = 100; // Niveau de santé initial du personnage A
let aDamage = 27; // Niveau de dégats du personnage A
let aSpeed = 100; // Vitesse du personnage A

//Stats personnage B
let bHealth = 100; // Niveau de santé initial du personnage B
let bDamage = 50; // Niveau de dégats du personnage B
let bSpeed = 101; // Vitesse du personnage B

// Fonction pour précharger les images
function preloadImages(imagePaths) {
  return Promise.all(
    imagePaths.map((path) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.src = path;
      });
    })
  );
}

// Appel de la fonction de préchargement des images dès que la page est chargée
window.addEventListener("load", () => {
  preloadImages([
    "B.png",
    "A1.png",
    "AKO.png",
    "BWIN.png",
    "AHIT.png",
    "ASMASH.png",
    "BKO.png",
    "BHIT.png",
    "BSMASH.png",
  ]).then(() => {
    // Lancer le jeu une fois les images préchargées
    document.body.addEventListener("click", handleClick);
  });
});

// Appel de la fonction de préchargement des images dès que la page est chargée
window.addEventListener("load", preloadImages);

// Récupérer les éléments DOM pour les personnages
const characterA = document.getElementById("character-a");
const characterB = document.getElementById("character-b");
const topRightB = document.getElementById("top-right-b");
var koContainer = document.getElementById("ko-container");
var startContainer = document.getElementById("start-container");
var characterako = document.getElementById("character-a-ko");
var characterako = document.getElementById("character-a-hit");
var characterako = document.getElementById("character-a-smash");

//sons du jeu
var soundEffect = new Audio("smash.mp3");
var soundEffect2 = new Audio("smash2.mp3");
var soundstart = new Audio("start.mp3");
var soundko = new Audio("ko.mp3");
var sounda = new Audio("a.mp3");
var soundb = new Audio("b.mp3");

const victoryMessage = document.getElementById("victory-message");
victoryMessage.style.color = "white";
victoryMessage.style.textAlign = "center";
victoryMessage.style.fontSize = "40px";
victoryMessage.style.fontWeight = "bold";

const replayMessage = document.createElement("p");
replayMessage.textContent = "Click to replay";
replayMessage.style.textAlign = "center";
replayMessage.style.fontSize = "30px";

// Définir les positions initiales
let aPosition = 200;
let bPosition = 500;

const characterABar = document.getElementById("character-a-bar");
function getCharacterAHealthBars() {
  return characterABar.querySelectorAll(".health-bar");
}

// Créer des éléments pour les barres de vie
const healthBarA = document.createElement("div");
healthBarA.classList.add("health-bar");
characterA.appendChild(healthBarA);

const healthBarB = document.createElement("div");
healthBarB.classList.add("health-bar");
characterB.appendChild(healthBarB);

// Positionner les barres de vie
const healthBarHeight = 10;
const healthBarWidth = characterA.offsetWidth / 3;
healthBarA.style.top = -healthBarHeight + "px";
healthBarA.style.width = healthBarWidth + "px";
healthBarB.style.top = -healthBarHeight + "px";
healthBarB.style.width = healthBarWidth + "px";

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
// Variable pour indiquer quelle image de A utiliser
let alternateAImage = false;

function moveCharacter(character, start, end, speed, images, callback) {
  let position = start;
  let direction = start < end ? 1 : -1; // Move left or right
  let alternateImage = false;

  const animationInterval = setInterval(() => {
    position += direction * speed;
    character.style.left = position + "px";

    // Alternate between images
    character.style.backgroundImage = `url('${
      alternateImage ? images[0] : images[1]
    }')`;
    alternateImage = !alternateImage;

    if (
      (direction === 1 && position >= end) ||
      (direction === -1 && position <= end)
    ) {
      clearInterval(animationInterval);
      if (callback) callback(); // Trigger next step (attack, move back, etc.)
    }
  }, 50);
}

function handleVictory(winner) {
  soundko.play();
  koContainer.style.display = "block";
  if (winner === characterA) {
    SwapImageAWin();
  } else {
    SwapImageBWin();
  }
  animationLaunched = false; // Stop animation
  document.body.addEventListener("click", handleClick); // Allow restarting the game
}

/* function animateA() {
  let aAnimationInterval = setInterval(function() {
    aPosition += 15; // Augmenter la position de 10 pixels à chaque frame
    characterA.style.left = aPosition + 'px'; // Déplacer le personnage A vers la droite

    // Alternance des images de A
    if (alternateAImage) {
      characterA.style.backgroundImage = "url('A1.png')";
    } else {
      characterA.style.backgroundImage = "url('A2.png')";
    }
    alternateAImage = !alternateAImage; // Inverser la variable de commutation

    if (aPosition >= bPosition - 50) { // Arrêter l'animation lorsque le personnage A atteint le personnage B
      clearInterval(aAnimationInterval);
      SwapImageASmash();
      SwapImageBhit();
      reduceAHealth(); // reduire des HP du concurrent
      if (aHealth > 0 && bHealth > 0) {
        // Ajouter un délai d'une demi-seconde avant d'exécuter animateBackA()
        setTimeout(() => {
          animateBackA(); // Faire revenir le personnage A à sa position initiale
        }, 500); // Délai d'une demi-seconde (en millisecondes)
      } else {  
        soundko.play();
        koContainer.style.display = "block";
        SwapImageAWin(); // Change character image
        animationLaunched = false;
        document.body.addEventListener('click', handleClick);
      }
    }
  }, 50);
} */

function animateA() {
  moveCharacter(
    characterA,
    aPosition,
    bPosition - 50,
    15,
    ["A1.png", "A2.png"],
    () => {
      SwapImageASmash();
      SwapImageBhit();
      reduceAHealth();
      if (aHealth > 0 && bHealth > 0) {
        setTimeout(() => animateBackA(), 500); // Delay before returning A
      } else {
        handleVictory(characterA);
      }
    }
  );
}

// Animer le personnage A pour revenir à sa position initiale
function animateBackA() {
  SwapImageBStart();
  let backAnimationInterval = setInterval(function () {
    aPosition -= 15; // Diminuer la position de 10 pixels à chaque frame
    characterA.style.left = aPosition + "px"; // Déplacer le personnage A vers la gauche

    // Alternance des images de A
    if (alternateAImage) {
      characterA.style.backgroundImage = "url('A1.png')";
    } else {
      characterA.style.backgroundImage = "url('A2.png')";
    }
    alternateAImage = !alternateAImage; // Inverser la variable de commutation

    if (aPosition <= 200) {
      // Arrêter l'animation lorsque le personnage A est revenu à sa position initiale
      SwapImageAStart();
      clearInterval(backAnimationInterval);
      animateB(); // Appeler la fonction animateB une fois que le personnage A est revenu à sa position initiale
    }
  }, 50);
}

// Animer le personnage B pour se déplacer vers le personnage A
/* function animateB() {
  let bStart = bPosition;
  let bEnd = aPosition + 50; // Ajouter un petit décalage pour que les personnages ne se chevauchent pas
  let bDirection = bStart < bEnd ? 1 : -1; // Déterminer la direction de l'animation
  let bAnimationInterval = setInterval(function () {
    bPosition += bDirection * 15; // Augmenter ou diminuer la position de 10 pixels à chaque frame en fonction de la direction
    characterB.style.left = bPosition + 'px'; // Déplacer le personnage B

    // Alternance des images de BB
    if (alternateAImage) {
      characterB.style.backgroundImage = "url('B1.png')";
    } else {
      characterB.style.backgroundImage = "url('B2.png')";
    }
    alternateAImage = !alternateAImage; // Inverser la variable de commutation

    if ((bDirection === 1 && bPosition >= bEnd) || (bDirection === -1 && bPosition <= bEnd)) { // Arrêter l'animation lorsque le personnage B atteint le personnage A
      clearInterval(bAnimationInterval);
      SwapImageBSmash();
      SwapImageAhit();
      reduceBHealth(); // reduire des HP du concurrent
      if (aHealth > 0 && bHealth > 0) {
        // Ajouter un délai d'une seconde avant d'exécuter animateBackA()
        setTimeout(() => {
          animateBackB(); // Faire revenir le personnage A à sa position initiale
        }, "500"); // Délai d'une seconde (en millisecondes)
      } else {
        //victoryMessage.textContent = "B WON!";
        //victoryMessage.appendChild(replayMessage);
        soundko.play();
        koContainer.style.display = "block";
        SwapImageBWin(); // Change character image
        animationLaunched = false;
        document.body.addEventListener('click', handleClick);
      }
    }
  }, 50);
} */

function animateB() {
  moveCharacter(
    characterB,
    bPosition,
    aPosition + 50,
    15,
    ["B1.png", "B2.png"],
    () => {
      SwapImageBSmash();
      SwapImageAhit();
      reduceBHealth();
      if (aHealth > 0 && bHealth > 0) {
        setTimeout(() => animateBackB(), 500); // Delay before returning B
      } else {
        handleVictory(characterB);
      }
    }
  );
}

// Animer le personnage B pour revenir à sa position initiale
function animateBackB() {
  SwapImageAStart();
  let backAnimationInterval = setInterval(function () {
    bPosition += 15; // Diminuer la position de 10 pixels à chaque frame
    characterB.style.left = bPosition + "px"; // Déplacer le personnage B vers la gauche

    // Alternance des images de B
    if (alternateAImage) {
      characterB.style.backgroundImage = "url('B1.png')";
    } else {
      characterB.style.backgroundImage = "url('B2.png')";
    }
    alternateAImage = !alternateAImage; // Inverser la variable de commutation

    if (bPosition >= 500) {
      // Arrêter l'animation lorsque le personnage B est revenu à sa position initiale
      SwapImageBStart();
      clearInterval(backAnimationInterval);
      bPosition = 500;
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
      healthBar.style.backgroundColor = "lightgreen"; // Modifier la couleur de la barre de vie du personnage B
    }

    if (aHealth <= 50) {
      const healthBar = healthBarB;
      healthBar.style.backgroundColor = "yellow"; // Modifier la couleur de la barre de vie du personnage B
    }

    if (aHealth <= 25) {
      // Le personnage A est vaincu
      const healthBar = healthBarB;
      healthBar.style.backgroundColor = "orange"; // Modifier la couleur de la barre de vie du personnage B
    }
    if (aHealth <= 0) {
      // Le personnage A est vaincu
      const healthBar = healthBarB;
      healthBar.style.backgroundColor = "red"; // Modifier la couleur de la barre de vie du personnage B
    }
  }
}

function reduceBHealth() {
  if (bHealth > 0) {
    // Joue le son d'effet
    soundEffect2.play();
    soundb.play();
    bHealth -= bDamage;

    const healthBar = healthBarA;

    if (aHealth > 75) {
      healthBar.style.background = "green";
      healthBar.style.border = "1px solid green";
    } else if (aHealth > 0) {
      healthBar.style.background = "transparent";
      healthBar.style.border = "1px solid red";
    } else {
      // aHealth <= 0
      healthBar.style.background = "linear-gradient(to right, black, darkred)";
      healthBar.style.border = "1px solid black";
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
let alternateBImage = false;

function RanimateB() {
  let bStart = bPosition;
  let bEnd = aPosition + 50; // Ajouter un petit décalage pour que les personnages ne se chevauchent pas
  let bDirection = bStart < bEnd ? 1 : -1; // Déterminer la direction de l'animation
  let bAnimationInterval = setInterval(function () {
    bPosition += bDirection * 15; // Augmenter ou diminuer la position de 10 pixels à chaque frame en fonction de la direction
    characterB.style.left = bPosition + "px"; // Déplacer le personnage B

    // Alternance des images de B
    if (alternateBImage) {
      characterB.style.backgroundImage = "url('B1.png')";
    } else {
      characterB.style.backgroundImage = "url('B2.png')";
    }
    alternateBImage = !alternateBImage; // Inverser la variable de commutation

    if (
      (bDirection === 1 && bPosition >= bEnd) ||
      (bDirection === -1 && bPosition <= bEnd)
    ) {
      // Arrêter l'animation lorsque le personnage B atteint le personnage A
      clearInterval(bAnimationInterval);
      SwapImageBSmash();
      SwapImageAhit();
      RreduceBHealth(); // reduire des HP du concurrent
      if (aHealth > 0 && bHealth > 0) {
        // Ajouter un délai d'une demi-seconde avant d'exécuter animateBackA()
        setTimeout(() => {
          RanimateBackB(); // Faire revenir le personnage B à sa position initiale
        }, 500); // Délai d'une demi-seconde (en millisecondes)
      } else {
        //victoryMessage.textContent = "B WON!";
        //victoryMessage.appendChild(replayMessage);
        soundko.play();
        koContainer.style.display = "block";
        SwapImageBWin(); // Change character image
        animationLaunched = false;
        document.body.addEventListener("click", handleClick);
      }
    }
  }, 50);
}

// Animer le personnage A pour revenir à sa position initiale
function RanimateBackB() {
  SwapImageAStart();
  let backAnimationInterval = setInterval(function () {
    bPosition += 15; // Diminuer la position de 10 pixels à chaque frame

    // Alternance des images de B
    if (alternateBImage) {
      characterB.style.backgroundImage = "url('B1.png')";
    } else {
      characterB.style.backgroundImage = "url('B2.png')";
    }
    alternateBImage = !alternateBImage; // Inverser la variable de commutation

    characterB.style.left = bPosition + "px"; // Déplacer le personnage B vers la gauche
    if (bPosition >= 500) {
      // Arrêter l'animation lorsque le personnage B est revenu à sa position initiale
      SwapImageBStart();
      clearInterval(backAnimationInterval);
      bPosition = 500;
      RanimateA();
    }
  }, 50);
}

// Animer le personnage B pour se déplacer vers le personnage A
function RanimateA() {
  let aAnimationInterval = setInterval(function () {
    aPosition += 15; // Augmenter la position de 10 pixels à chaque frame
    characterA.style.left = aPosition + "px"; // Déplacer le personnage A vers la droite

    if (alternateBImage) {
      characterA.style.backgroundImage = "url('A1.png')";
    } else {
      characterA.style.backgroundImage = "url('A2.png')";
    }
    alternateBImage = !alternateBImage; // Inverser la variable de commutation

    if (aPosition >= bPosition - 50) {
      // Arrêter l'animation lorsque le personnage A atteint le personnage B
      clearInterval(aAnimationInterval);
      SwapImageASmash();
      SwapImageBhit();
      RreduceAHealth(); // reduire des HP du concurrent
      if (aHealth > 0 && bHealth > 0) {
        // Ajouter un délai d'une seconde avant d'exécuter animateBackA()
        setTimeout(() => {
          RanimateBackA(); // Faire revenir le personnage A à sa position initiale
        }, "500"); // Délai d'une seconde (en millisecondes)
      } else {
        //victoryMessage.textContent = "A WON!";
        //victoryMessage.appendChild(replayMessage);
        soundko.play();
        koContainer.style.display = "block";
        SwapImageAWin(); // Change character image
        animationLaunched = false;
        document.body.addEventListener("click", handleClick);
      }
    }
  }, 50);
}

// Animer le personnage B pour revenir à sa position initiale
function RanimateBackA() {
  SwapImageBStart();
  let backAnimationInterval = setInterval(function () {
    aPosition -= 15; // Diminuer la position de 10 pixels à chaque frame
    characterA.style.left = aPosition + "px"; // Déplacer le personnage A vers la gauche

    if (alternateBImage) {
      characterA.style.backgroundImage = "url('A1.png')";
    } else {
      characterA.style.backgroundImage = "url('A2.png')";
    }
    alternateBImage = !alternateBImage; // Inverser la variable de commutation

    if (aPosition <= 200) {
      // Arrêter l'animation lorsque le personnage A est revenu à sa position initiale
      SwapImageAStart();
      clearInterval(backAnimationInterval);
      animateB(); // Appeler la fonction animateB une fois que le personnage A est revenu à sa position initiale
    }
  }, 50);
}

function RreduceAHealth() {
  if (aHealth > 0) {
    aHealth -= aDamage;
    const healthBar = healthBarB;

    if (aHealth > 75) {
      healthBar.style.background = "green";
      healthBar.style.border = "1px solid green";
    } else if (aHealth > 50) {
      healthBar.style.background =
        "linear-gradient(to right, yellow 50%, #ff00 50%)";
      healthBar.style.border = "1px solid yellow";
    } else if (aHealth > 25) {
      healthBar.style.background =
        "linear-gradient(to right, orange 25%, #ff00 75%)";
      healthBar.style.border = "1px solid orange";
    } else if (aHealth > 0) {
      healthBar.style.background = "transparent";
      healthBar.style.border = "1px solid red";
    } else {
      // aHealth <= 0
      healthBar.style.background = "linear-gradient(to right, black, darkred)";
      healthBar.style.border = "1px solid black";
    }
  }
}

function RreduceBHealth() {
  if (bHealth > 0) {
    bHealth -= bDamage;

    const healthBar = healthBarA;

    if (aHealth > 75) {
      healthBar.style.background =
        "linear-gradient(to right, yellow 50%, #ff00 50%)";
      healthBar.style.border = "1px solid yellow";
    } else if (aHealth > 50) {
      healthBar.style.background =
        "linear-gradient(to right, yellow 50%, #ff00 50%)";
      healthBar.style.border = "1px solid yellow";
    } else if (aHealth > 25) {
      healthBar.style.background =
        "linear-gradient(to right, orange 25%, #ff00 75%)";
      healthBar.style.border = "1px solid orange";
    } else if (aHealth > 0) {
      healthBar.style.background = "transparent";
      healthBar.style.border = "1px solid red";
    } else {
      // aHealth <= 0
      healthBar.style.background = "linear-gradient(to right, black, darkred)";
      healthBar.style.border = "1px solid black";
    }
  }
}

// Function to change character image
function SwapImageAWin() {
  characterA.style.backgroundImage = "url('ASMASH.png')";
  characterB.style.backgroundImage = "url('BKO.png')";
  characterB.style.zIndex = "0"; // Assure que characterB est en dessous
  characterA.style.zIndex = "1"; // Assure que characterA est au-dessus
}
function SwapImageASmash() {
  characterA.style.backgroundImage = "url('ASMASH.png')";
  characterB.style.zIndex = "0"; // Assure que characterB est en dessous
  characterA.style.zIndex = "1"; // Assure que characterA est au-dessus
}
function SwapImageAhit() {
  characterA.style.backgroundImage = "url('AHIT.png')";
}
function SwapImageAStart() {
  characterA.style.backgroundImage = "url('A.png')";
}

function SwapImageBWin() {
  characterA.style.backgroundImage = "url('AKO.png')";
  characterB.style.backgroundImage = "url('BSMASH.png')";
  characterB.style.zIndex = "1"; // Assure que characterB est en dessous
  characterA.style.zIndex = "0"; // Assure que characterA est au-dessus
}
function SwapImageBSmash() {
  characterB.style.backgroundImage = "url('BSMASH.png')";
  characterB.style.zIndex = "1"; // Assure que characterB est en dessous
  characterA.style.zIndex = "0"; // Assure que characterA est au-dessus
}
function SwapImageBhit() {
  characterB.style.backgroundImage = "url('BHIT.png')";
}
function SwapImageBStart() {
  characterB.style.backgroundImage = "url('B.png')";
}

// Fonction à exécuter après le clic
function handleClick() {
  if (!animationLaunched) {
    // Vérifier si l'animation n'a pas encore été lancée

    //Jouer son Start
    soundstart.play();

    // valeur a modifier selon personnage
    aHealth = 100;
    bHealth = 100;

    //init si relance
    aPosition = 200;
    bPosition = 500;
    bStart = bPosition;
    characterA.style.left = aPosition + "px";
    characterB.style.left = 500 + "px";
    characterA.style.backgroundImage = "url('A.png')";
    healthBarB.style.backgroundColor = "green";
    healthBarA.style.backgroundColor = "green";
    victoryMessage.textContent = "";
    koContainer.style.display = "none";
    startContainer.style.display = "none";

    SwapImageAStart();
    SwapImageBStart();

    //lancement animation
    if (aSpeed >= bSpeed) {
      animateA();
      animationLaunched = true;
      // Supprimer l'écouteur d'événements pour éviter l'exécution ultérieure
      document.body.removeEventListener("click", handleClick);
    } else {
      RanimateB();
      animationLaunched = true;
      // Supprimer l'écouteur d'événements pour éviter l'exécution ultérieure
      document.body.removeEventListener("click", handleClick);
    }
  }
}

// Ajouter l'écouteur d'événements
document.body.addEventListener("click", handleClick);
