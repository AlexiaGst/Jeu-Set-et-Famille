//####################################################################################################

//Animations de la pioche

//####################################################################################################

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

//####################################################################################################

//Demandes de cartes

//####################################################################################################


// MOI AUX AUTRES JOUEURS
function meRequestCard(joueurE, joueurR) {
  const joueurEnvoi = document.querySelector(`.player-info[data-joueur="${joueurE}"]`);
  const joueurRecu = document.querySelector(`.player-info[data-joueur="${joueurR}"]`);
    
  const emplacementJoueurEnvoi = joueurEnvoi.querySelector(".cards1").getBoundingClientRect();
  const emplacementJoueurRecu = joueurRecu.querySelector(".cards").getBoundingClientRect();

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
  const joueurRecu = document.querySelector(`.player-info[data-joueur="${joueurR}"]`);

  const emplacementJoueurRecu = joueurRecu.querySelector(".cards1")
  let emplacementJoueurEnvoi = joueurEnvoi.querySelector(".cards1")
  if (!emplacementJoueurEnvoi){
	  emplacementJoueurEnvoi = joueurEnvoi.querySelector(".cards")
  }
  
  
  emplacementJoueurRecu.getBoundingClientRect();
  emplacementJoueurEnvoi.getBoundingClientRect();
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



//####################################################################################################

//Affichage specifique

//####################################################################################################

function showCountFamilles(joueur,score) {// Affiche le compteur de familles
	let joueurAvecFamille;
	if (joueur==="me"){
		joueurAvecFamille = document.getElementById('me');
	}else{
		joueurAvecFamille = document.querySelector(`.player-info[data-joueur="${joueur}"]`);
	}
	console.log(joueur,joueurAvecFamille);
    const elem = joueurAvecFamille.getElementsByClassName('family-count')[0]; 
    elem.querySelector('span').innerHTML = "Familles: " + score;
    elem.style.display = 'flex'; 
}

function afficherClassement(classement) {// Affiche le classement des joueurs à la fin de la partie
	const wrapper=document.getElementById("wrapper_fin");
    const fin = document.createElement("div");
    fin.className = "fin";
    fin.innerHTML = "<h2>Classement final</h2>";

    const box_fin = document.createElement("div");
    box_fin.className = "box_fin";

    const trophe = document.createElement("img");
    trophe.src = "images/coupe.png";
    trophe.className = "trophe";
	
	//Adapte la taille en fonction du nombre de joueurs à classer
    if (classement.length > 3) {
        const conteneurColonnes = document.createElement("div");
        conteneurColonnes.className = "colonnes-classement";

        const ulGauche = document.createElement("ul");
        ulGauche.className = "colonne gauche";

        const ulDroite = document.createElement("ul");
        ulDroite.className = "colonne droite";

        classement.forEach(({ joueur, score }, index) => {
            const li = document.createElement("li");
            const img = document.createElement("img");
            img.className = index < 3 ? "classement" : "classement2";
            img.src = index === 0 ? "images/first.png"
                   : index === 1 ? "images/second.png"
                   : index === 2 ? "images/third.png"
                   : "images/argent.png";
            li.appendChild(img);

            const texte = document.createTextNode(`${joueur} : ${score} famille${score > 1 ? "s" : ""}`);
            li.appendChild(texte);

            if (index < 3) {
                ulGauche.appendChild(li);
            } else {
                ulDroite.appendChild(li);
            }
        });

        conteneurColonnes.appendChild(ulGauche);
        conteneurColonnes.appendChild(ulDroite);
        box_fin.appendChild(trophe);
        box_fin.appendChild(conteneurColonnes);
    } else {
        const ul = document.createElement("ul");
        classement.forEach(({ joueur, score }, index) => {
            const li = document.createElement("li");
            const img = document.createElement("img");
            img.className = index < 3 ? "classement" : "classement2";
            img.src = index === 0 ? "images/first.png"
                   : index === 1 ? "images/second.png"
                   : index === 2 ? "images/third.png"
                   : "images/argent.png";
            li.appendChild(img);

            const texte = document.createTextNode(`${joueur} : ${score} famille${score > 1 ? "s" : ""}`);
            li.appendChild(texte);
            ul.appendChild(li);
        });
        box_fin.appendChild(trophe);
        box_fin.appendChild(ul);
    }
	
	//Bontons pour quitter ou rejouer
	
	const box_boutons = document.createElement("div");
	box_boutons.className = "box_boutons";
	
    const bouton_replay = document.createElement("button");
	bouton_replay.textContent="Nouvelle partie";
	bouton_replay.className="btn_fin";
	bouton_replay.id = "rejouer";
	
	const bouton_menu = document.createElement("button");
	bouton_menu.textContent="Menu";
	bouton_menu.className="btn_fin";
	bouton_menu.id = "menu";
	
    box_boutons.appendChild(bouton_replay);
	box_boutons.appendChild(bouton_menu);

	box_fin.appendChild(box_boutons);
	
    fin.appendChild(box_fin);
    wrapper.appendChild(fin);
	
	document.getElementById("menu").addEventListener("click", () => {
		socket.send(JSON.stringify({ type:"exit", id_partie: idPartie, joueur: monNom }));
		window.location.href = "index.php";
	});

	document.getElementById("rejouer").addEventListener("click", () => {
		socket.send(JSON.stringify({ type:"exit", id_partie: idPartie, joueur: monNom }));
		window.location.href = "ongoing_games.php";
	});
}

function clore_menu(){//ferme le menu de demande de carte
	const menu=document.getElementById("menu-cartes");
	menu.style.display="none";
}

function afficheMenu(){ //ouvre le menu de demande de carte
	const menu=document.getElementById("menu-cartes");
	menu.innerHTML = "";
	
	const box_cartes=document.createElement("div");
	box_cartes.id="box_cartes";
	const titre = document.createElement("p");
	titre.textContent = "Choisissez une carte";
	titre.className = "titre_menu";
	box_cartes.appendChild(titre);
	const fermer = document.createElement("p");
	fermer.textContent = "x";
	fermer.className = "close";
	fermer.addEventListener("click", clore_menu);
	box_cartes.appendChild(fermer);

	const grid = document.createElement("div");
	grid.id="grille_cartes";
	
	//N'affiche que les familles dont on possède au moins une carte
	const mesfamilles = [];
    for (const carte of mesCartes) {
        for (const nomFamille in familles) {
            if (familles[nomFamille].includes(carte)&& !(mesfamilles.includes(nomFamille))) {
                mesfamilles.push(nomFamille);
                break;
            }
        }
    }
	const ordreFamilles = Object.keys(familles);
	mesfamilles.sort((a, b) => ordreFamilles.indexOf(a) - ordreFamilles.indexOf(b));
	mesfamilles.forEach(nomFamille => {
		familles[nomFamille].forEach(carte => {
			const divCarte = document.createElement("div");
			divCarte.style.backgroundImage = `url(${carte})`;
			divCarte.className = "choix";
			divCarte.setAttribute("data-carte", carte);
			
			//Envoie la demande de carte
			divCarte.addEventListener("click", () => {
				if (!nomCible) {
					console.warn("Aucun joueur cible sélectionné !");
					return;
				}
				socket.send(JSON.stringify({
					type: "demande_carte",
					id_partie: idPartie,
					demandeur: monNom,
					cible: nomCible,
					carte: carte
				}));

				nomCible = null;
				document.getElementById("menu-cartes").style.display = "none";
			});

			grid.appendChild(divCarte);
		});
	});
	
	box_cartes.appendChild(grid);
	menu.appendChild(box_cartes);
	menu.style.display="block";
}

function showChatBubble(message, duration) {
    const container = document.getElementById('chat-container');
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = message;
    container.appendChild(bubble);

  //lance l'animation
	requestAnimationFrame(() => {
		bubble.style.opacity = '1';
	});

	setTimeout(() => {
		bubble.style.animation = 'fadeOut 0.5s ease forwards';

		bubble.addEventListener('animationend', () => {
			bubble.remove();
		}, { once: true });
	}, duration);
}


window.addEventListener("load", () => {
	showChatBubble("Bienvenue ! La partie va commencer !", 2000);
});




function clore_mesCartes(){//Ferme l'affichage des cartes du joueur
	const mes_cartes=document.getElementById("mes-cartes");
	mes_cartes.style.display="none";
}

function afficheMesCartes(){ //Ouvre l'affichage des cartes du joueur
	const mes_cartes=document.getElementById("mes-cartes");
	mes_cartes.innerHTML = "";
	
	const box_cartes=document.createElement("div");
	box_cartes.id="box_cartes";
	const titre = document.createElement("p");
	titre.textContent = "Mes Cartes";
	titre.className = "titre_menu";
	box_cartes.appendChild(titre);
	const fermer = document.createElement("p");
	fermer.textContent = "x";
	fermer.className = "close";
	fermer.addEventListener("click", clore_mesCartes);
	box_cartes.appendChild(fermer);

	const grid = document.createElement("div");
	grid.id="grille_cartes";
	
	//N'affiche que les familles dont on possède au moins une carte
	const mesfamilles = [];
	const mesCartesTriees=mesCartes.slice().sort((a, b) => getOrdreCarte(a) - getOrdreCarte(b));
    for (const carte of mesCartesTriees.slice(0,-1)) {
        const divCarte = document.createElement("div");
		divCarte.style.backgroundImage = `url(${carte})`;
		divCarte.className = "choix";
		grid.appendChild(divCarte);
    }	
	box_cartes.appendChild(grid);
	mes_cartes.appendChild(box_cartes);
	mes_cartes.style.display="block";
}


//####################################################################################################

//Gestion de l'affichage des cartes

//####################################################################################################


function removeFamily(cartesFamille) {// RETIRER CARTES QUAND FAMILLE COMPLETE
  const cartesARetirer = document.querySelectorAll(".bottom-section .cards .card");
  const cartesContainer = document.querySelector(".bottom-section .cards");

  let cartesRetirees = 0;

  cartesARetirer.forEach(cardDiv => {
    const bgImage = cardDiv.style.backgroundImage;
    const match = /url\("?(.*?)"?\)/.exec(bgImage);

    if (match && cartesFamille.includes(match[1])) {
      cartesRetirees++;

      cardDiv.style.animation = 'none';
      cardDiv.offsetHeight; //Force un reflow

      cardDiv.style.transition = "transform 0.5s ease, opacity 0.5s ease";
      cardDiv.style.transform = "translateY(-100px)";
      cardDiv.style.opacity = "0";

      setTimeout(() => {
        cartesContainer.removeChild(cardDiv);
        cartesRetirees--;

        if (cartesRetirees === 0) {
          mesCartes = mesCartes.filter(carte => !cartesFamille.includes(carte));
		  console.log(mesCartes,cartesContainer);
		  trierMain();
        }
      }, 500);
    }
  });
}

function realignerCartes() { //replace correctement les cartes
	const cartesDivs = document.querySelectorAll(".bottom-section .cards .card");
	Array.from(cartesDivs).forEach((div, index) => {
		const decalageX = -50 * index;
		div.style.setProperty('--index', index);
		div.style.setProperty('--final-x', `${decalageX}%`);
		div.style.transform = `translateX(${decalageX}%)`;
	});
}


function addCardMainPlayer(carte) {
  const cardsContainer = document.querySelector('.cards');
  const cardCount = cardsContainer.children.length;
  const newCard = document.createElement('div');
  newCard.classList.add('card');

  const index = cardCount;
  const decalageX = -50 * index;

  newCard.style.setProperty('--index', index);
  newCard.style.setProperty('--final-x', `${decalageX}%`);
  newCard.style.transform = `translateX(${decalageX}%)`;
  newCard.style.opacity = '0';
  newCard.style.animation = `flyInFromCenterWide 0.6s ease-out forwards`;

  newCard.style.animationDelay = `${0.1 * index}s`;
	newCard.style.backgroundImage = `url('${carte}')`;
  newCard.style.backgroundSize = "cover";
  newCard.style.backgroundPosition = "center";

  cardsContainer.appendChild(newCard);
}

function trierMain() {//Remet les cartes du joueur dans l'ordre après l'obtention d'une nouvelle carte
	const cartesContainer = document.querySelector(".bottom-section .cards");
	let cartesTriees = mesCartes.slice().sort((a, b) => getOrdreCarte(a) - getOrdreCarte(b));
	if (mesCartes.length >10){cartesTriees=cartesTriees.slice(-10);}
	
	cartesContainer.innerHTML = "";
	cartesTriees.forEach((img, index) => {
		const newCard = document.createElement('div');
		newCard.classList.add('card');
		const decalageX = -50 * index;
		newCard.style.setProperty('--index', index);
		newCard.style.setProperty('--final-x', `${decalageX}%`);
		newCard.style.transform = `translateX(${decalageX}%)`;
		newCard.style.opacity = '1';
		if (img==="special"){
			newCard.style.backgroundColor="#7cd0cf";
			const txt = document.createElement('p');
			txt.textContent="Voir mes cartes";
			txt.id="voir_plus";
			newCard.appendChild(txt);
			newCard.addEventListener("click", () => {
				afficheMesCartes();
			});
		}
		else{
			newCard.style.backgroundImage = `url('${img}')`;
			newCard.style.backgroundSize = "cover";
			newCard.style.backgroundPosition = "center";
		}
		cartesContainer.appendChild(newCard);
	});
}

function retirerCarte(carte) { // retire la carte de l'affichage du joueur
	const cartesDivs = document.querySelectorAll(".bottom-section .cards .card");
	for (let card of cartesDivs) {
		const bg = card.style.backgroundImage;
		if (bg.includes(carte)) {
			card.style.animation = 'none';
			card.offsetHeight;
			card.style.animation = 'disappear 0.8s ease forwards';

			setTimeout(() => {
				card.remove();
				realignerCartes();
			}, 800);
			break;
		}
	}
}

//####################################################################################################

//Autres fonctions

//####################################################################################################

function startTimer(duration, circle) {//Démarre l'animation du timer 
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
  
    let start = Date.now();
    let end = start + duration;
  
    function update() {
		const now = Date.now();
		const timeLeft = Math.max(0, end - now);
		const percent = timeLeft / duration;
		const offset = circumference * (1 - percent);
		circle.style.strokeDashoffset = offset;
	  
		if (percent > 0.5) {
			circle.setAttribute("stroke", "green");
		} else if (percent > 0.2) {
			circle.setAttribute("stroke", "orange");
		} else {
			circle.setAttribute("stroke", "red");
		}
	  
		if (timeLeft > 0) {
			requestAnimationFrame(update);
		}
    }
    update();
}

function removePlayer(joueur) {//Retire un joueur qui a quitté la partie
  const joueurARetirer = document.querySelector(`.player-info[data-joueur="${joueur}"]`);
  if (joueurARetirer) {
    joueurARetirer.remove(); 
    console.log(`Joueur ${joueur} retiré.`);
  } 
}

function getOrdreCarte(carte) {
	let ordre = 1000; // très grand par défaut
	let index = 0;
	if (carte==="special"){
		return 43;
	}
	for (const famille in familles) {
		for (const img of familles[famille]) {
			if (img === carte) return index;
			index++;
		}
	}
	return ordre;
}