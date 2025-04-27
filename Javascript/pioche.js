// ANIMATION CARTE VERS LE JOUEUR DU HAUT

function animatePiocheToTop() {
  const cards = document.querySelectorAll(".pioche-cards .card2");
  const lastCard = cards[0];

  lastCard.classList.remove("fly-to-top");
  void lastCard.offsetWidth; // Force reflow
  lastCard.classList.add("fly-to-top");

  setTimeout(() => {
    lastCard.classList.remove("fly-to-top");
    lastCard.style.opacity = "1";
    lastCard.style.transform = "translate(0, 0)";
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
    lastCard.style.opacity = "1";
    lastCard.style.transform = "translate(0, 0) rotate(0)";
  }, 3000);
}

function animatePiocheToTopRight() {
  const cards = document.querySelectorAll(".pioche-cards .card2");
  const lastCard = cards[2];

  lastCard.classList.remove("fly-to-topright");
  void lastCard.offsetWidth;
  lastCard.classList.add("fly-to-topright");

  setTimeout(() => {
    lastCard.classList.remove("fly-to-topright");
    lastCard.style.opacity = "1";
    lastCard.style.transform = "translate(0, 0) rotate(0)";
  }, 5000);
}

function animatePiocheToMiddleLeft() {
  const cards = document.querySelectorAll(".pioche-cards .card2");
  const lastCard = cards[3];

  lastCard.classList.remove("fly-to-middleleft");
  void lastCard.offsetWidth;
  lastCard.classList.add("fly-to-middleleft");

  setTimeout(() => {
    lastCard.classList.remove("fly-to-middleleft");
    lastCard.style.opacity = "1";
    lastCard.style.transform = "translate(0, 0) rotate(0)";
  }, 7000);
}

function animatePiocheToMiddleRight() {
  const cards = document.querySelectorAll(".pioche-cards .card2");
  const lastCard = cards[4];

  lastCard.classList.remove("fly-to-middleright");
  void lastCard.offsetWidth;
  lastCard.classList.add("fly-to-middleright");

  setTimeout(() => {
    lastCard.classList.remove("fly-to-middleright");
    lastCard.style.opacity = "1";
    lastCard.style.transform = "translate(0, 0) rotate(0)";
  }, 9000);
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
    lastCard.style.opacity = "1";
    lastCard.style.transform = "translate(0, 0) rotate(0)";
  }, 1200);
}
