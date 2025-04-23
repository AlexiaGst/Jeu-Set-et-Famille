function afficherClassement(classement) {
    const overlay = document.createElement("div");
    overlay.className = "fin-overlay";

    const box = document.createElement("div");
    box.className = "fin-box";
    box.innerHTML = "<h2>Classement final</h2>";

    const ul = document.createElement("ul");
    classement.forEach(({ joueur, score }, index) => {
        const li = document.createElement("li");
        li.innerText = `${index + 1}. ${joueur} – ${score} famille${score > 1 ? "s" : ""}`;
        ul.appendChild(li);
    });

    box.appendChild(ul);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
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

	if (data.type==='profil'){
		const profils=data.profils;
		console.log("profils des joueurs reçus !",profils);

		const blocs = document.querySelectorAll('.player-info');

		let i = 0;
		for (const [nom, photo] of Object.entries(profils)) {
			const bloc = blocs[i];
			if (!bloc) continue;

			const img = bloc.querySelector('.profile-pic');
			const span = bloc.querySelector('.player-name');

			if (img) img.src = photo;
			if (span) span.textContent = nom;

			bloc.dataset.joueur = nom;

			i++;
		}

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
			// TODO : ajoute la carte à ta main locale
		} else {
			console.log("Un autre joueur a pioché !");
		}

		// TODO : lance l'animation de pioche ici
		//lancerAnimationPioche();
		console.log("Animatiooooooon");
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
		console.log("Stooooooooop");
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

    const boutonPioche = document.getElementById("bouton-pioche");
    const joueurs = document.querySelectorAll(".joueur");
    const menuCartes = document.getElementById("menu-cartes");
    const choix = document.querySelectorAll(".choix");

    boutonPioche.addEventListener("click", () => {
        socket.send(JSON.stringify({ type: "pioche", id_partie: idPartie }));
    });

    joueurs.forEach(joueur => {
        joueur.addEventListener("click", () => {
            nomCible = joueur.dataset.nom;
            console.log("Cible sélectionnée :", nomCible);
            menuCartes.style.display = "block";
        });
    });

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
});
