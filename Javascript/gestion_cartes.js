//--------------------------------------------------------------------------------------
//Variables d'initialisation

const urlParams = new URLSearchParams(window.location.search);
const idPartie = urlParams.get('id_partie');

// Connexion WebSocket
const socket = new WebSocket('ws://localhost:8080');

var special=false;//La carte "Voir mes cartes"

var mesCartes=[];

let monTour = false;

var familles={
    combat: [
    "images/boxe.png",
    "images/judo.png",
    "images/karate.png",
    "images/taekwondo.png",
    "images/lutte.png",
	"images/mma.png"
  ],
    aquatique: [
	"images/natation.png",
    "images/wakeboard.png",
	"images/surf.png",
    "images/waterpolo.png",
	"images/kitesurf.png",
    "images/aviron.png"
  ],
    mobilite: [
    "images/vtt.png",
	"images/roller.png",
    "images/skateboard.png",
    "images/trottinette.png",
	"images/cyclisme.png",
	"images/monocycle.png"
  ],
    aventure: [
    "images/escalade.png",
    "images/randonnee.png",
	"images/slackline.png",
    "images/trail.png",
	"images/alpinisme.png",
	"images/parapente.png"
  ],
    hiver: [
    "images/snowboard.png",
	"images/patinage.png",
	"images/hockey.png",
	"images/ski.png",
    "images/bobsleigh.png",
    "images/curling.png"
  ],
    precision: [
    "images/arc.png",
	"images/golf.png",
	"images/petanque.png",
    "images/flechettes.png",
    "images/bowling.png",
	"images/javelot.png"
  ],
    ballons: [
    "images/basket.png",
	"images/tennis.png",
	"images/football.png",
	"images/rugby.png",
	"images/volleyball.png",
    "images/baseball.png"
  ]
};

//--------------------------------------------------------------------------------------
//Listener de la websocket

// Rejoindre la partie
socket.addEventListener('open', () => {
	console.log("WebSocket ouvert, envoi de join pour la partie", idPartie);
	socket.send(JSON.stringify({ type: 'join', id_partie: idPartie, nom_utilisateur: monNom }));
});

// Réception des messages
socket.addEventListener('message', (event) => {
	console.log("Message reçu :", event.data);
    const data = JSON.parse(event.data);

	if (data.type === 'info_tour') {//Donne les informations pour le nouveau
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
			if (circle) {
				startTimer(30000, circle); // 30 secondes
			}
		} else {
			console.warn(`Impossible de trouver le bloc du joueur ${joueur}`);
		}
	}


	if (data.type === 'profil') {// Information nécessaires à l'initialisation des profils joueurs	
		const profils = data.profils;
		console.log("Profils des joueurs reçus :", profils);
		
		const joueurs = Object.keys(profils); // ordre envoyé par le serveur
		const nbJoueurs = joueurs.length;
		const indexMoi = joueurs.indexOf(monNom);

		// Créer la liste d'affichage circulaire tournée pour "moi"
		const joueursTournes = joueurs.slice(indexMoi).concat(joueurs.slice(0, indexMoi));
		
		// Positions fixes selon le point de vu joueur
		let positionsUtiles = [];
		if (nbJoueurs === 2) {
			positionsUtiles = ["haut"];
		} else if (nbJoueurs === 3) {
			positionsUtiles = ["gauche", "droite"];
		} else if (nbJoueurs === 4) {
			positionsUtiles = ["gauche", "haut", "droite"];
		} else if (nbJoueurs === 5) {
			positionsUtiles = ["gauche_b","gauche_h", "haut", "droite_h"];
		} else if (nbJoueurs === 6) {
			positionsUtiles = ["gauche_b","gauche_h", "haut", "droite_h", "droite_b"];
		}

		// initialisation du joueur principal
		const blocMoi = document.getElementById('me');
		if (blocMoi) {
			const img = blocMoi.querySelector('.profile-pic');
			const span = blocMoi.querySelector('.player-name');
			if (img) img.src = profils[monNom];
			if (span) span.textContent = monNom;
			blocMoi.dataset.joueur = monNom;
			showCountFamilles("me",0);
		}


		// initialisation des autres joueurs
		joueursTournes.slice(1).forEach((joueur, i) => {
			const position = positionsUtiles[i];
			const bloc = document.querySelector(`.player-info[data-position="${position}"]`);
			if (bloc) {
				const img = bloc.querySelector('.profile-pic');
				const span = bloc.querySelector('.player-name');
				if (img) img.src = profils[joueur];
				if (span) span.textContent = joueur;
				bloc.dataset.joueur = joueur;
				
				//Cliques qui affichent le menu de choix
				bloc.addEventListener("click", () => {
					if (!monTour) {
						showChatBubble("Ce n'est pas ton tour !",4000);
						return;
					}else{
						nomCible = joueur;
						afficheMenu();
					}
				});
				showCountFamilles(joueur,0);
			}
		});
		
		const loader=document.getElementsByClassName("loader_box")[0]; 
		loader.style.animation='disappear 0.8s ease forwards';
		
		setTimeout(() => loader.style.display="none", 800);
	}


    if (data.type === 'distribution') { //Distribue les cartes en début de partie
        const myCards = data.cartes;
        console.log("Cartes reçues :", myCards);
		mesCartes.push(...myCards);
		const cartesTriees = myCards.slice().sort((a, b) => getOrdreCarte(a) - getOrdreCarte(b));

		
		//Affiche les cartes du joueur principal
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
		//Affiche les cartes des autres joueurs
		document.querySelectorAll('.player-info').forEach(playerDiv => {
			if (playerDiv.dataset.joueur !== monNom) {
				const cartes = playerDiv.querySelectorAll('.cards1 .card1');
				cartes.forEach(divCarte => {
					divCarte.style.backgroundImage = "url('images/dos.png')";
					divCarte.style.backgroundSize = "cover";
				});
			}
		});
		//Affiche la pioche
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
	
	if (data.type === 'pioche_animation') { //Animation lorsqu'un joueur pioche
		if (data.pourMoi && data.carte) {
			mesCartes.push(data.carte);
			if (data.bonne_pioche) {
				showChatBubble("Bonne pioche ! Rejoue !",4000);
				
				const piocheCount = document.getElementById('pioche-count');

				console.log("pioche",piocheCount);
				piocheCount.classList.add('fire');
				setTimeout(() => {
					piocheCount.classList.remove('fire');
					void piocheCount.offsetWidth;
				}, 1500);
				
			}
			animatePiocheToBottom()
			addCardMainPlayer(data.carte);
			if (mesCartes.length===10 && special===false){
				mesCartes.push("special");
				special=true;
			}
			setTimeout(()=>{//tri à chaque ajout de carte
					trierMain();
				},1000);
			
		} else {
			showChatBubble(data.joueur+" a pioché !",4000);
			const position=document.querySelector(`.player-info[data-joueur="${data.joueur}"]`).dataset.position
			position==="haut" ?animatePiocheToTop():
			position==="gauche"?animatePiocheToMiddleLeft():
			position==="droite"?animatePiocheToMiddleRight():
			position==="gauche_h"?animatePiocheToTopLeft():
			position==="droite_h"?animatePiocheToTopRight():console.warn("Animation introuvable");
			
		}
		const compte=document.getElementById("pioche-count");
		compte.textContent=data.compteur;
	}
	
	if (data.type==='exit'){
		showChatBubble(`Le joueur ${data.joueur} a quitté la partie`,4000);
		showChatBubble("Les cartes ont été remises en jeu",4000);
		removePlayer(data.joueur); //Réorganise quand un joueur quitte la partie
		const compte=document.getElementById("pioche-count");
		compte.textContent=data.pioche;
	}
	
	if (data.type === 'forcer_pioche') {//Quand une demande de carte échoue, le joueur doit piocher
		socket.send(JSON.stringify({ type: "pioche", id_partie: idPartie }));
	}


	if (data.type === 'pioche_vide') {
		showChatBubble("La pioche est vide !",2000);
	}
	
	if (data.type === "info_demande") {	//En cas de demande carte	
		showChatBubble(data.texte,4000);
		console.log(data.succes);
		if (data.succes){
			if (data.pourMoi) {// Si la carte est pour le joueur principal
				mesCartes.push(data.carte);
				meRequestCard(data.joueurE,data.joueurR);
				addCardMainPlayer(data.carte);
				if (mesCartes.length===10 && special===false){
					mesCartes.push("special");
					special=true;
				}
				setTimeout(()=>{
					trierMain();
				},1000);
			}
			else if (data.joueurE===monNom){// Si la carte vient du joueur principal
				const index = mesCartes.indexOf(data.carte);
				if (index !== -1) {
					mesCartes.splice(index, 1);
				}
				retirerCarte(data.carte);
			}
			else{
				othersRequestCard(data.joueurE,data.joueurR);
			}
		}else{
			showChatBubble(`Raté! ${data.joueurE} ne possède pas cette carte !`,4000);
		}
	}
	
	if (data.type === 'famille_complete') {
		const message = `${data.joueur} a complété la famille ${data.famille} !`;
		showChatBubble(message,2000);
		showCountFamilles(data.joueur,data.score);
		
		if (data.joueur === monNom) {	
			  setTimeout(() => {
				removeFamily(familles[data.famille]);
			  }, 2000);
		}
	}
	
	if (data.type === "fin_partie") { // Affiche le classement à la fin de la partie
		console.log("Classement reçu :", data.classement);
		afficherClassement(data.classement);
	}
	
});

// Gestion d'erreur
socket.addEventListener('error', (event) => {
    console.error("Erreur WebSocket :", event);
});

//--------------------------------------------------------------------------------------
//Listener du DOM

document.addEventListener("DOMContentLoaded", () => {
    let nomCible = null;

	const boutonPioche = document.querySelector(".pioche-cards");
	const exit=document.getElementById("retour");


	exit.addEventListener("click",()=>{// Envoie au server le joueur qui a quitté
		socket.send(JSON.stringify({ type:"exit", id_partie: idPartie, joueur: monNom }));
	});

    boutonPioche.addEventListener("click", () => {// Envoie au server le joueur qui a pioché
        socket.send(JSON.stringify({ type: "pioche", id_partie: idPartie }));
    });
	
});
