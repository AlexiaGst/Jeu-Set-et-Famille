var mesCartes=[];

let monTour = false;

var familles={
    combat: [
    "images/boxe.png",
    "images/judo.png",
    "images/karate.png",
    "images/mma.png",
    "images/lutte.png",
    "images/taekwondo.png"
  ],
    aquatique: [
    "images/aviron.png",
    "images/kitesurf.png",
    "images/natation.png",
    "images/surf.png",
    "images/wakeboard.png",
    "images/waterpolo.png"
  ],
    mobilite: [
    "images/roller.png",
    "images/skateboard.png",
    "images/monocycle.png",
    "images/vtt.png",
    "images/trottinette.png",
    "images/cyclisme.png"
  ],
    aventure: [
    "images/escalade.png",
    "images/randonnee.png",
    "images/parapente.png",
    "images/alpinisme.png",
    "images/trail.png",
    "images/slackline.png"
  ],
    hiver: [
    "images/ski.png",
    "images/snowboard.png",
    "images/patinage.png",
    "images/hockey.png",
    "images/bobsleigh.png",
    "images/curling.png"
  ],
    precision: [
    "images/arc.png",
    "images/flechettes.png",
    "images/javelot.png",
    "images/golf.png",
    "images/petanque.png",
    "images/bowling.png"
  ],
    ballons: [
    "images/basket.png",
    "images/baseball.png",
    "images/football.png",
    "images/volleyball.png",
    "images/rugby.png",
    "images/tennis.png",
  ]
};


function retirerCarteVisuellement(carte) {
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

function realignerCartes() {
	const cartesDivs = document.querySelectorAll(".bottom-section .cards .card");
	Array.from(cartesDivs).forEach((div, index) => {
		const decalageX = -50 * index;
		div.style.setProperty('--index', index);
		div.style.setProperty('--final-x', `${decalageX}%`);
		div.style.transform = `translateX(${decalageX}%)`;
	});
}



function clore_menu(){
	const menu=document.getElementById("menu-cartes");
	menu.style.display="none";
}

function afficheMenu(){
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
	
	const mesfamilles = [];
    for (const carte of mesCartes) {
        for (const nomFamille in familles) {
            if (familles[nomFamille].includes(carte)&& !(mesfamilles.includes(nomFamille))) {
                mesfamilles.push(nomFamille);
                break;
            }
        }
    }
	mesfamilles.forEach(nomFamille => {
		familles[nomFamille].forEach(carte => {
			const divCarte = document.createElement("div");
			divCarte.style.backgroundImage = `url(${carte})`;
			divCarte.className = "choix";
			divCarte.setAttribute("data-carte", carte);

			// ⬇️ Ici tu ajoutes le click dès la création de l'élément
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


function showCountFamilles(joueur,score) {
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

function afficherClassement(classement) {
	const wrapper=document.getElementById("wrapper_fin");
    const fin = document.createElement("div");
    fin.className = "fin";
    fin.innerHTML = "<h2>Classement final</h2>";

    const box_fin = document.createElement("div");
    box_fin.className = "box_fin";

    const trophe = document.createElement("img");
    trophe.src = "images/coupe.png";
    trophe.className = "trophe";

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

function getOrdreCarte(carte) {
	let ordre = 1000; // très grand par défaut
	let index = 0;
	for (const famille in familles) {
		for (const img of familles[famille]) {
			if (img === carte) return index;
			index++;
		}
	}
	return ordre;
}

function mettreAJourMainTriee() {
	const cartesContainer = document.querySelector(".bottom-section .cards");

	// On trie mesCartes (les URLs) selon l'ordre défini
	const cartesTriees = mesCartes.slice().sort((a, b) => getOrdreCarte(a) - getOrdreCarte(b));

	// On vide l'affichage actuel
	cartesContainer.innerHTML = "";

	// On réinjecte chaque carte dans le bon ordre
	cartesTriees.forEach((img, index) => {
		const newCard = document.createElement('div');
		newCard.classList.add('card');
		const decalageX = -50 * index;
		newCard.style.setProperty('--index', index);
		newCard.style.setProperty('--final-x', `${decalageX}%`);
		newCard.style.transform = `translateX(${decalageX}%)`;
		newCard.style.opacity = '1';
		newCard.style.backgroundImage = `url('${img}')`;
		newCard.style.backgroundSize = "cover";
		newCard.style.backgroundPosition = "center";
		cartesContainer.appendChild(newCard);
	});
}


const urlParams = new URLSearchParams(window.location.search);
const idPartie = urlParams.get('id_partie');

// Connexion WebSocket
const socket = new WebSocket('ws://localhost:8080');

// Rejoindre la partie
socket.addEventListener('open', () => {
	console.log("WebSocket ouvert, envoi de join pour la partie", idPartie);
	socket.send(JSON.stringify({ type: 'join', id_partie: idPartie, nom_utilisateur: monNom }));
});

// Réception des messages
socket.addEventListener('message', (event) => {
	console.log("Message reçu :", event.data);
    const data = JSON.parse(event.data);

	if (data.type === 'info_tour') {
		const joueur = data.joueur;
		monTour = (joueur === monNom);
		//on réinitialise tous les cercles
		document.querySelectorAll(".progress-ring__circle").forEach(circle => {
			circle.style.strokeDasharray = '';
			circle.style.strokeDashoffset = '';
			circle.setAttribute("stroke", "green");
		});

		//trouver le bloc du joueur concerné
		let bloc;
		if (joueur === monNom) {
			bloc = document.getElementById("me");
		} else {
			bloc = document.querySelector(`.player-info[data-joueur="${joueur}"]`);
		}

		if (bloc) {
			const circle = bloc.querySelector(".progress-ring__circle");
			console.log(circle);
			if (circle) {
				startTimer(30000, circle); // 20 secondes
			}
		} else {
			console.warn(`Impossible de trouver le bloc du joueur ${joueur}`);
		}
	}


	if (data.type === 'profil') {		
		const profils = data.profils;
		console.log("Profils des joueurs reçus :", profils);
		
		const joueurs = Object.keys(profils); // ordre envoyé par le serveur
		const nbJoueurs = joueurs.length;
		console.log("monNom :", monNom);
		console.log("Joueurs dans profils :", joueurs);
		const indexMoi = joueurs.indexOf(monNom);

		// Créer la liste circulaire tournée pour "moi"
		const joueursTournes = joueurs.slice(indexMoi).concat(joueurs.slice(0, indexMoi));
		
		// Positions fixes selon ton point de vue
		let positionsUtiles = [];
		if (nbJoueurs === 2) {
			positionsUtiles = ["haut"];
		} else if (nbJoueurs === 3) {
			positionsUtiles = ["gauche", "haut", "droite"];
		} else if (nbJoueurs === 4) {
			positionsUtiles = ["gauche", "haut", "droite"];
		} else if (nbJoueurs === 5) {
			positionsUtiles = ["gauche_h", "haut", "droite_h", "gauche_b"];
		} else if (nbJoueurs === 6) {
			positionsUtiles = ["gauche_h", "haut", "droite_h", "gauche_b", "droite_b"];
		}

		// 1. Remplir "moi" dans #me
		const blocMoi = document.getElementById('me');
		if (blocMoi) {
			const img = blocMoi.querySelector('.profile-pic');
			const span = blocMoi.querySelector('.player-name');
			if (img) img.src = profils[monNom];
			if (span) span.textContent = monNom;
			blocMoi.dataset.joueur = monNom;
			showCountFamilles("me",0);
		}


		// 2. Remplir les autres joueurs en fonction de joueursTournes
		joueursTournes.slice(1).forEach((joueur, i) => {
			const position = positionsUtiles[i];
			const bloc = document.querySelector(`.player-info[data-position="${position}"]`);
			if (bloc) {
				const img = bloc.querySelector('.profile-pic');
				const span = bloc.querySelector('.player-name');
				if (img) img.src = profils[joueur];
				if (span) span.textContent = joueur;
				bloc.dataset.joueur = joueur;
				
				bloc.addEventListener("click", () => {
					if (!monTour) {
						console.log("Ce n'est pas ton tour !");
						return;
					}else{
						nomCible = joueur;
						console.log("Cible sélectionnée :", nomCible);
						afficheMenu();
					}
				});
				showCountFamilles(joueur,0);
			}
			console.log(joueur, "->", position);
		});
		
		const loader=document.getElementsByClassName("loader_box")[0]; 
		loader.style.animation='disappear 0.8s ease forwards';
		
		setTimeout(() => loader.style.display="none", 800);
	}


    if (data.type === 'distribution') {
        const myCards = data.cartes;
        console.log("Cartes reçues :", myCards);
		mesCartes.push(...myCards);
		function getOrdreCarte(carte) {
			let ordre = 1000; // très grand par défaut
			let index = 0;
			for (const famille in familles) {
				for (const img of familles[famille]) {
					if (img === carte) return index;
					index++;
				}
			}
			return ordre;
		}
		const cartesTriees = myCards.slice().sort((a, b) => getOrdreCarte(a) - getOrdreCarte(b));

		
		//Mes cartes
		const cartesElements = document.querySelectorAll(".bottom-section .cards .card");
		cartesElements.forEach((cardDiv, index) => {
			const carte = cartesTriees[index];
			if (carte) {
				cardDiv.style.backgroundImage = `url(${carte})`;
				cardDiv.style.backgroundRepeat = "no-repeat";
				cardDiv.style.backgroundPosition = "center";
			} else {
				cardDiv.style.display = "none";
			}
		});
		//Cartes des autres joueurs
		document.querySelectorAll('.player-info').forEach(playerDiv => {
			if (playerDiv.dataset.joueur !== monNom) {
				const cartes = playerDiv.querySelectorAll('.cards1 .card1');
				cartes.forEach(divCarte => {
					divCarte.style.backgroundImage = "url('images/dos.png')";
					divCarte.style.backgroundSize = "cover";
				});
			}
		});
		//Pioche
		document.querySelectorAll('.pioche-cards .card2').forEach(divCarte => {
			if (divCarte.id!=="pioche-count"){
				divCarte.style.backgroundImage = "url('images/dos.png')";
				divCarte.style.backgroundSize = "cover";
				divCarte.style.backgroundPosition = "center";
			}
		});
		const compte=document.getElementById("pioche-count");
		compte.textContent=data.compteur;
    }
	
	if (data.type === 'pioche_animation') {
		if (data.pourMoi && data.carte) {
			console.log("J'ai pioché :", data.carte);
			mesCartes.push(data.carte);
			if (data.bonne_pioche) {
				showChatBubble("Bonne pioche ! Rejoue !",4000);
				const fireworks = document.querySelector(".fireworks");
				fireworks.classList.remove("animate"); // reset
				void fireworks.offsetWidth; // reflow
				fireworks.classList.add("animate");
							}
			animatePiocheToBottom()
			mettreAJourMainTriee();
			
		} else {
			console.log("Un autre joueur a pioché !");
			showChatBubble(data.joueur+" a pioché !",4000);
			const position=document.querySelector(`.player-info[data-joueur="${data.joueur}"]`).dataset.position
			console.log(position);
			position==="haut" ?animatePiocheToTop():
			position==="gauche"?animatePiocheToMiddleLeft():
			position==="droite"?animatePiocheToMiddleRight():
			position==="gauche_h"?animatePiocheToTopLeft():
			position==="droite_h"?animatePiocheToTopRight():console.log("aucun des cas");
			
		}
		console.log("Pioche restante:",data.compteur); //Nbr de cartes restantes dans la pioche
		const compte=document.getElementById("pioche-count");
		compte.textContent=data.compteur;
	}
	
	if (data.type==='exit'){
		showChatBubble(`Le joueur ${data.joueur} a quitté la partie`,4000);
		removePlayer(data.joueur);
	}
	
	if (data.type === 'forcer_pioche') {
		console.log("🚨 Pioche forcée !");
		socket.send(JSON.stringify({ type: "pioche", id_partie: idPartie }));
	}


	if (data.type === 'pioche_vide') {
		showChatBubble("La pioche est vide !",2000);
	}
	if (data.type === "info_demande") {		
		showChatBubble(data.texte,4000);

		if (data.succes){
			if (data.pourMoi) {
				console.log("Carte reçue :", data.carte);
				mesCartes.push(data.carte);
				meRequestCard(data.joueurE,data.joueurR);
				mettreAJourMainTriee();
			}
			else if (data.joueurE===monNom){
				const index = mesCartes.indexOf(data.carte);
				if (index !== -1) {
					mesCartes.splice(index, 1);
				}
				retirerCarteVisuellement(data.carte);
			}
			else{
				othersRequestCard(data.joueurE,data.joueurR);
			}
		}
	}
	
	
	if (data.type === 'famille_complete') {
		const message = `${data.joueur} a complété la famille ${data.famille} !`;
		showChatBubble(message,2000);
		showCountFamilles(data.joueur,data.score);
		
		if (data.joueur === monNom) {	
			  setTimeout(() => {
				removeCards(familles[data.famille]);
			  }, 700);
		}

	}
	
	if (data.type === "fin_partie") {
		console.log("Classement reçu :", data.classement);
		afficherClassement(data.classement);
	}
	
});

// Gestion d'erreur
socket.addEventListener('error', (event) => {
    console.error("Erreur WebSocket :", event);
});


document.addEventListener("DOMContentLoaded", () => {
    let nomCible = null;

	const boutonPioche = document.querySelector(".pioche-cards");
	const exit=document.getElementById("retour");


	exit.addEventListener("click",()=>{
		socket.send(JSON.stringify({ type:"exit", id_partie: idPartie, joueur: monNom }));
	});

    boutonPioche.addEventListener("click", () => {
        socket.send(JSON.stringify({ type: "pioche", id_partie: idPartie }));
    });

	
});
