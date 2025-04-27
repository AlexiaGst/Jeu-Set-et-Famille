var mesCartes=[];
var joueurs=[];

function afficherClassement(classement) {
	const wrapper=document.getElementById("wrapper_fin");
    const fin = document.createElement("div");
    fin.className = "fin";
    fin.innerHTML = "<h2>Classement final</h2>";

    const box = document.createElement("div");
    box.className = "box";

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
        box.appendChild(trophe);
        box.appendChild(conteneurColonnes);
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
        box.appendChild(trophe);
        box.appendChild(ul);
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

	box.appendChild(box_boutons);
	
    fin.appendChild(box);
    wrapper.appendChild(fin);
	
	document.getElementById("menu").addEventListener("click", () => {
		window.location.href = "index.php";
	});

	document.getElementById("rejouer").addEventListener("click", () => {
		window.location.href = "ongoing_games.php";
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
				startTimer(20000, circle); // 20 secondes
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
			}
			console.log(joueur, "->", position);
		});
	}


    if (data.type === 'distribution') {
        const myCards = data.cartes;
        console.log("🃏 Cartes reçues :", myCards);
		mesCartes.push(myCards);
        // Affichage
    }
	
	if (data.type === 'pioche_animation') {
		if (data.pourMoi && data.carte) {
			console.log("J'ai pioché :", data.carte);
			mesCartes.push(data.carte);
			if (data.bonne_pioche) {
				console.log("🎯 Bonne pioche ! Je rejoue.");
				// Peut-être afficher un message sympa ici ?
			}

			// TODO : ajoute la carte à ta main locale
		} else {
			console.log("Un autre joueur a pioché !");
			if (document.querySelector(`.player-info[data-joueur="${data.joueur}"]`).dataset.position ==="haut"){
				animatePiocheToTop();
			}
		}
		console.log("Pioche restante:",data.compteur); //Nbr de cartes restantes dans la pioche
		// TODO : lance l'animation de pioche ici
		//lancerAnimationPioche();
	}
	
	if (data.type === 'forcer_pioche') {
		console.log("🚨 Pioche forcée !");
		socket.send(JSON.stringify({ type: "pioche", id_partie: idPartie }));
	}


	if (data.type === 'pioche_vide') {
		alert("La pioche est vide !");
	}
	if (data.type === "info_demande") {
		console.log(data.texte);
		
		// animation / message visible
		//afficherMessage(data.texte);

		if (data.succes && data.pourMoi) {
			// Tu peux aussi mettre data.destinataire === monNom pour sécuriser
			console.log("Carte reçue :", data.carte);
			mesCartes.push(data.carte);
			// ajoute la carte à ta main ici
		}
	}
	
	
	if (data.type === 'famille_complete') {
		const message = `${data.joueur} a complété la famille ${data.famille}`;
		console.log("🎉", message);
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
    const joueurs = document.querySelectorAll(".player-info");
    //const menuCartes = document.getElementById("menu-cartes");
    //const choix = document.querySelectorAll(".choix");


    boutonPioche.addEventListener("click", () => {
		console.log("pioooooche");
        socket.send(JSON.stringify({ type: "pioche", id_partie: idPartie }));
    });

    joueurs.forEach(joueur => {
        joueur.addEventListener("click", () => {
            nomCible = joueur.dataset.joueur;
            console.log("Cible sélectionnée :", nomCible);
            //menuCartes.style.display = "block";
        });
    });
/*
    choix.forEach(carte => {
        carte.addEventListener("click", () => {
            const nomCarte = carte.dataset.carte;

            if (!nomCible) {
                console.warn("Aucun joueur cible sélectionné !");
                return;
            }

            socket.send(JSON.stringify({
                type: "demande_carte",
                id_partie: idPartie,
                demandeur: monNom,
                cible: nomCible,
                carte: nomCarte
            }));

            nomCible = null;
        });
    });
	*/
});
