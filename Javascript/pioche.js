window.addEventListener("load", () => {
  const piocheCards = document.querySelectorAll('.pioche-cards .card2');
  
  // PIOCHE DU DEBUT
  setTimeout(() => animatePiocheToTop(), 200);
  setTimeout(() => animatePiocheToTopLeft(), 400);
  setTimeout(() => animatePiocheToTopRight(), 600);
  setTimeout(() => animatePiocheToMiddleLeft(), 800);
  setTimeout(() => animatePiocheToMiddleRight(), 1000);
  setTimeout(() => animatePiocheToBottom(), 1200);
});

// ANIMATION CARTE VERS LE JOUEUR DU HAUT

function animatePiocheToTop() {
  const cards = document.querySelectorAll(".pioche-cards .card2");
  const lastCard = cards[0];

  lastCard.classList.remove("fly-to-top");
  void lastCard.offsetWidth; // Force reflow
  lastCard.classList.add("fly-to-top");

  setTimeout(() => {
    lastCard.classList.remove("fly-to-top");
  }, 1000);
}



function animatePiocheToTopLeft() {
  const cards = document.querySelectorAll(".pioche-cards .card2");
  const lastCard = cards[1];

  lastCard.classList.remove("fly-to-topleft");
  void lastCard.offsetWidth;
  lastCard.classList.add("fly-to-topleft");

  setTimeout(() => {
    lastCard.classList.remove("fly-to-topleft");
  }, 2000);
}

function animatePiocheToTopRight() {
  const cards = document.querySelectorAll(".pioche-cards .card2");
  const lastCard = cards[2];

  lastCard.classList.remove("fly-to-topright");
  void lastCard.offsetWidth;
  lastCard.classList.add("fly-to-topright");

  setTimeout(() => {
    lastCard.classList.remove("fly-to-topright");
  }, 3000);
}

function animatePiocheToMiddleLeft() {
  const cards = document.querySelectorAll(".pioche-cards .card2");
  const lastCard = cards[3];

  lastCard.classList.remove("fly-to-middleleft");
  void lastCard.offsetWidth;
  lastCard.classList.add("fly-to-middleleft");

  setTimeout(() => {
    lastCard.classList.remove("fly-to-middleleft");
  }, 4000);
}

function animatePiocheToMiddleRight() {
  const cards = document.querySelectorAll(".pioche-cards .card2");
  const lastCard = cards[4];

  lastCard.classList.remove("fly-to-middleright");
  void lastCard.offsetWidth;
  lastCard.classList.add("fly-to-middleright");

  setTimeout(() => {
    lastCard.classList.remove("fly-to-middleright");
  }, 5000);
}

// ANIMATION CARTE VERS LE JOUEUR DU BAS

function animatePiocheToBottom() {
  const cards = document.querySelectorAll(".pioche-cards .card2");
  const lastCard = cards[5];

  lastCard.classList.remove("fly-to-bottom");
  void lastCard.offsetWidth;
  lastCard.classList.add("fly-to-bottom");

  setTimeout(() => {
    lastCard.classList.remove("fly-to-bottom");
  }, 6000);
}


// AJOUTER UNE CARTE AU JOUEUR PRINCIPAL 

function addCardMainPlayer() {
  const cardsContainer = document.querySelector('.cards');

  const cardCount = cardsContainer.children.length;

  const newCard = document.createElement('div');
  newCard.classList.add('card');

  const index = cardCount; 
  const decalageX = -50 * index;

  newCard.style.setProperty('--index', index);
  newCard.style.transform = `translateX(${decalageX}%)`;
  newCard.style.opacity = '0';
  newCard.style.animation = `flyInFromCenterWide 0.6s ease-out forwards`;
  newCard.style.setProperty('--final-x', `${decalageX}%`);
  newCard.style.animationDelay = `${0.1 * index}s`;

  cardsContainer.appendChild(newCard);
}


function removePlayer(joueur) {
  const joueurARetirer = document.querySelector(`.player-info[data-joueur="${joueur}"]`);
  if (joueurARetirer) {
    joueurARetirer.remove(); 
    console.log(`Joueur ${joueur} retiré.`);
  } 
}

// MOI AUX AUTRES JOUEURS

function meRequestCard(joueurE,joueurR) {
  const joueurEnvoi = document.querySelector(`.player-info[data-joueur="${joueurE}"]`);
  const emplacementJoueurEnvoi = joueurEnvoi.querySelector(".cards").getBoundingClientRect();

  const joueurRecu = document.querySelector(`.player-info[data-joueur="${joueurR}"]`);
  const emplacementJoueurRecu = joueurRecu.querySelector(".cards1").getBoundingClientRect();


  const mesCartes = document.querySelector('.cards .card');
  if (!mesCartes) {
    console.error("Erreur : aucune carte à animer.");
    return;
  }

  const carteAnimee = mesCartes.cloneNode(true);
  document.body.appendChild(carteAnimee);

  Object.assign(carteAnimee.style, {
    position: 'fixed',
    left: `${emplacementJoueurEnvoi.left}px`,
    top: `${emplacementJoueurEnvoi.top}px`,
    height: '9rem',
    width: 'calc(9rem * (2/3))',
    transition: 'all 0.8s ease',
    zIndex: 1000,
    transform: 'scale(0.8)',
    opacity: '0.8',
    backgroundImage: "url('images/dos.png')",
    backgroundSize: "cover",
  });

  requestAnimationFrame(() => {
    carteAnimee.style.left = `${emplacementJoueurRecu.left}px`;
    carteAnimee.style.top = `${emplacementJoueurRecu.top}px`;
    carteAnimee.style.transform = 'scale(1)';
    carteAnimee.style.opacity = '1';
  });

  setTimeout(() => {
    carteAnimee.remove();
  }, 800);
}

// AUTRE JOUEUR A AUTRE JOUEUR

function othersRequestCard(joueurE,joueurR) {
  const joueurEnvoi = document.querySelector(`.player-info[data-joueur="${joueurE}"]`);
  const emplacementJoueurEnvoi = joueurEnvoi.querySelector(".cards1").getBoundingClientRect();

  const joueurRecu = document.querySelector(`.player-info[data-joueur="${joueurR}"]`);
  const emplacementJoueurRecu = joueurRecu.querySelector(".cards1").getBoundingClientRect();

  const mesCartes = document.querySelector('.cards1 .card1');
  if (!mesCartes) {
    console.error("Erreur : aucune carte à animer.");
    return;
  }

  const carteAnimee = mesCartes.cloneNode(true);
  document.body.appendChild(carteAnimee);

  Object.assign(carteAnimee.style, {
    position: 'fixed',
    left: `${emplacementJoueurEnvoi.left}px`,
    top: `${emplacementJoueurEnvoi.top}px`,
    width: '5rem',
    height: '7rem',
    transition: 'all 0.8s ease',
    zIndex: 1000,
    transform: 'scale(0.8)',
    opacity: '0.8',
    backgroundImage: "url('images/dos.png')",
    backgroundSize: "cover",
  });

  requestAnimationFrame(() => {
    carteAnimee.style.left = `${emplacementJoueurRecu.left}px`;
    carteAnimee.style.top = `${emplacementJoueurRecu.top}px`;
    carteAnimee.style.transform = 'scale(1)';
    carteAnimee.style.opacity = '1';
  });

  setTimeout(() => {
    carteAnimee.remove();
  }, 800);
}

