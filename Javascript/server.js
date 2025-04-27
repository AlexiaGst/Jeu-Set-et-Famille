var cartes=[
	'images/alpinisme.png', 'images/arc.png', 'images/aviron.png', 'images/basket.png', 'images/baseball.png', 'images/bobsleigh.png',
	'images/bowling.png', 'images/boxe.png', 'images/curling.png', 'images/cyclisme.png', 'images/escalade.png', 'images/flechettes.png',
	'images/football.png', 'images/golf.png', 'images/hockey.png', 'images/javelot.png', 'images/judo.png', 'images/karate.png', 'images/kitesurf.png',
	'images/lutte.png', 'images/mma.png', 'images/monocycle.png', 'images/natation.png', 'images/parapente.png', 'images/patinage.png',
	'images/petanque.png', 'images/randonnee.png', 'images/roller.png', 'images/rugby.png', 'images/skateboard.png', 'images/ski.png',
	'images/slackline.png', 'images/snowboard.png', 'images/surf.png', 'images/taekwondo.png', 'images/tennis.png', 'images/trail.png',
	'images/trottinette.png', 'images/volleyball.png', 'images/vtt.png', 'images/wakeboard.png', 'images/waterpolo.png'
];

var img_profil=[
	'images/profil1.png',
	'images/profil2.png',
	'images/profil3.png',
	'images/profil4.png',
	'images/profil5.png',
	'images/profil6.png'
];

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

var pioche=[];

function distributeCards(id_partie, joueurs) {
    console.log("Distribution des cartes lancée pour la partie", id_partie);

    cartes.sort(() => Math.random() - 0.5);
	/*Pour tester*/
	cartes=["images/boxe.png",
    "images/judo.png",
    "images/karate.png",
    "images/mma.png",
    "images/lutte.png",
	
	"images/aviron.png",
    "images/kitesurf.png",
	"images/taekwondo.png",
    "images/natation.png",
    "images/surf.png",
    "images/wakeboard.png",
    "images/waterpolo.png",
	
	"images/roller.png",
    "images/skateboard.png",
	"images/monocycle.png",
	"images/rugby.png",
    "images/tennis.png",];
	
	
    const distrib = 7;
    mainsJoueurs[id_partie] = {};

    joueurs.forEach((joueur, index) => {
        const playerCards = cartes.slice(index * distrib, (index + 1) * distrib);
        const nom = joueur.nom_joueur;

        if (nom) {
            mainsJoueurs[id_partie][nom] = {};
			playerCards.forEach(carte => ajouterCarte(nom, carte, id_partie));
        }

        console.log(`Joueur ${nom || "(inconnu)"} reçoit :`, playerCards);

        if (joueur.readyState === WebSocket.OPEN) {
            joueur.send(JSON.stringify({ type: "distribution", cartes: playerCards, compteur:pioche.length }));
        } else {
            console.log("Socket fermé pour joueur", index + 1);
        }
    });

    pioche = cartes.slice(joueurs.length * distrib);
    console.log("Pioche restante :", pioche.length, "cartes");
}

function initJoueurs(id_partie,joueurs){
	const profils = {};
	img_profil.sort(() => Math.random() - 0.5);

	joueurs.forEach((joueur, index) => {
		const nom = joueur.nom_joueur;
		profils[nom] = img_profil[index] || "images/profil_defaut.png"; // au cas où

		console.log(`Joueur ${nom} reçoit photo`, profils[nom]);
	});

	joueurs.forEach((joueur) => {
		if (joueur.readyState === WebSocket.OPEN) {
			joueur.send(JSON.stringify({ type: "profil", profils }));
		}
	});
}

function afficherMains(id_partie) {
    const mains = mainsJoueurs[id_partie];
    console.log(`Mains des joueurs pour la partie ${id_partie} :`);

    if (!mains) {
        console.log("Aucune main enregistrée pour cette partie.");
        return;
    }

    for (const joueur in mains) {
        const cartes = getMainPlate(joueur, id_partie);
        console.log(`${joueur} : ${cartes.length} carte(s)`);
        cartes.forEach(c => console.log(`      - ${c}`));
    }
}

function passerAuJoueurSuivant(id_partie, initial = false) {
	if (partiesTerminees[id_partie]) return;
    const data = toursData[id_partie];
    if (!data) return;

    if (!initial) {
        data.indexTour = (data.indexTour + 1) % data.joueurs.length;
    }

    const suivant = data.joueurs[data.indexTour];
    tours[id_partie] = suivant;

    console.log(`🔁 Nouveau tour pour la partie ${id_partie} : ${suivant}`);

    parties[id_partie].forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: "info_tour",
                joueur: suivant
            }));
        }
    });

    // Redémarrer le timer
    if (timersTours[id_partie]) clearTimeout(timersTours[id_partie]);
    timersTours[id_partie] = setTimeout(() => {
        console.log(`Temps écoulé pour ${suivant}, passage au suivant.`);
        passerAuJoueurSuivant(id_partie);
    }, 20000);
}


function ajouterCarte(joueurNom, carte, id_partie) {
  if (!mainsJoueurs[id_partie][joueurNom]) mainsJoueurs[id_partie][joueurNom] = {};
  const main = mainsJoueurs[id_partie][joueurNom];

  for (const famille in familles) {
    if (familles[famille].includes(carte)) {
      if (!main[famille]) main[famille] = [];
      main[famille].push(carte);
      break;
    }
  }

}

function verifierFinPartie(id_partie) {
	const totalFamilles = Object.keys(familles).length;
	let totalCompletes = 0;

	for (const joueur in mainsJoueurs[id_partie]) {
		if (scores[joueur]) {
			totalCompletes += scores[joueur];
		}
	}

	if (totalCompletes >= totalFamilles || pioche.length === 0) {
		terminerPartie(id_partie);
	}
}

function verifierFamilles(joueurNom, id_partie) {
	const main = mainsJoueurs[id_partie][joueurNom];
	for (const nomFamille in main) {
		if (main[nomFamille].length === 6) {
			delete main[nomFamille];
			if (!scores[joueurNom]) scores[joueurNom] = 0;
			scores[joueurNom] += 1;
			afficherScores();
			parties[id_partie].forEach(client => {
				if (client.readyState === WebSocket.OPEN) {
					console.log(`✅ Envoi du message 'famille_complete' à ${client.nom_joueur}`);
				  client.send(JSON.stringify({
					type: 'famille_complete',
					joueur: joueurNom,
					famille: nomFamille
				  }));
				}
			});
		}
    }
	verifierFinPartie(id_partie);
}

function getMainPlate(joueurNom, id_partie) {
  return Object.values(mainsJoueurs[id_partie][joueurNom] || {}).flat();
}

function afficherScores() {
    console.log("🎯 Scores des joueurs (familles complètes) :");
    for (const [joueur, score] of Object.entries(scores)) {
        console.log(`${joueur} : ${score} famille(s)`);
    }
}

function terminerPartie(id_partie) {
	if (partiesTerminees[id_partie]) return;
	partiesTerminees[id_partie] = true; 
	
	console.log(`🏁 Partie ${id_partie} terminée.`);

	const joueursPartie = parties[id_partie].map(ws => ws.nom_joueur);
	const classement = joueursPartie.map(nom => ({
		joueur: nom,
		score: scores[nom] || 0
	})).sort((a, b) => b.score - a.score);

	console.log("Classement calculé :", classement);

	parties[id_partie].forEach(client => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({
				type: "fin_partie",
				classement: classement
			}));
		}
	});

	if (timersTours[id_partie]) clearTimeout(timersTours[id_partie]);
}


//_______________________________________________________________________________________

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let parties = {}; // Liste des sockets par id_partie
let partiesLancees = {}; 
let mainsJoueurs = {};
let tours = {};
let timersTours = {};
let scores = {};
let toursData = {};
let partiesTerminees = {};
let carteDemandee = {};
let joueurQuiDemande = {}; 

wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);

        if (data.type === 'join') {
            const id = data.id_partie;
			const nom = data.nom_utilisateur;
            ws.id_partie = id;
			ws.nom_joueur = nom;

            if (!parties[id]) parties[id] = [];
            parties[id].push(ws);

            // Si la partie est déjà lancée on envoie directement "start_game"
            if (partiesLancees[id]) {
                ws.send(JSON.stringify({ type: 'start_game' }));
            }
        }
			
        if (data.type === 'start') {
			
            const id = data.id_partie;
            partiesLancees[id] = true;

            if (parties[id]) {
                console.log(`Joueurs enregistrés pour la partie ${id} :`, parties[id].length);
                parties[id].forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'start_game' }));
                    }
                });
				setTimeout(() => {
					initJoueurs(id,parties[id]);
					distributeCards(id,parties[id]);
					const nomsJoueurs = parties[id]
						.map(ws => ws.nom_joueur)
						.filter(Boolean); // évite les undefined

					toursData[id] = {
						joueurs: nomsJoueurs,
						indexTour: 0
					};
					passerAuJoueurSuivant(id, true);

				}, 3000); 
            } else {
                console.log(`Aucune partie avec l'id ${id} dans parties[]`);
            }
			

        }
		
		if (data.type === 'pioche') {
			const id = ws.id_partie;
			if (partiesTerminees[id]) return;
			const joueur = ws.nom_joueur;

			if (tours[id] !== joueur) {
				console.log(`Ce n'est pas le tour de ${joueur}`);
				return;
			}
			if (!pioche || pioche.length === 0) {
				console.log("Pioche vide !");
				ws.send(JSON.stringify({ type: 'pioche_vide' }));
				return;
			}

			const carte = pioche.shift(); // retire la première carte
			console.log(`Carte piochée : ${carte}`);
			console.log("Pioche restante :", pioche.length, "cartes");

			let bonnePioche = false;
			if (carteDemandee[id] && joueurQuiDemande[id]) {
				// Il y avait une pioche forcée
				if (carte === carteDemandee[id]) {
					bonnePioche = true;
					console.log("Bonne pioche !");
				}

				// Nettoyer
				delete carteDemandee[id];
				delete joueurQuiDemande[id];
			}

			if (parties[id]) {
				parties[id].forEach(client => {
					if (client.readyState === WebSocket.OPEN) {
						const isJoueur = client === ws;
						client.send(JSON.stringify({
							type: "pioche_animation",
							pourMoi: isJoueur,
							carte: isJoueur ? carte : null
						}));
						
						if (isJoueur) {
							const nom = client.nom_joueur;

							if (!mainsJoueurs[id]) mainsJoueurs[id] = {};
							if (!mainsJoueurs[id][nom]) mainsJoueurs[id][nom] = [];

							ajouterCarte(nom, carte, id);
							/*afficherMains(id);*/
							console.log("mainsJoueurs[", id, "] :", mainsJoueurs[id]);
							verifierFamilles(nom, id);
						}
					}
				});
				if (timersTours[id]) clearTimeout(timersTours[id]);
				if (bonnePioche) {
					// Ne rien faire, il rejoue direct (on renverra un "info_tour" pour rester sur lui si besoin)
					parties[id].forEach(client => {
						if (client.readyState === WebSocket.OPEN) {
							client.send(JSON.stringify({
								type: "bonne_pioche",
								joueur: joueur
							}));
						}
					});
					// Redémarrer juste son timer
					timersTours[id] = setTimeout(() => {
						console.log(`Temps écoulé pour ${joueur}, passage au suivant.`);
						passerAuJoueurSuivant(id);
					}, 20000);
				} else {
					// Sinon tour suivant
					passerAuJoueurSuivant(id);
				}
			}
		}

		if (data.type === 'demande_carte') {
			const { id_partie, demandeur, cible, carte } = data;
			if (partiesTerminees[id_partie]) return;
			if (tours[id_partie] !== demandeur) {
				console.log(`Ce n'est pas le tour de ${demandeur}`);
				return;
			}

			const mainDemandeur = mainsJoueurs[id_partie]?.[demandeur];
			const mainCible = mainsJoueurs[id_partie]?.[cible];

			console.log("Demandeur :", demandeur, "| Cible :", cible);

			if (!mainCible || !mainDemandeur) {
				console.log("Joueur introuvable dans les mains");
				return;
			}

			let carteTrouvee = false;
			for (const fam in mainCible) {
				const index = mainCible[fam].indexOf("images/" + carte + ".png");
				if (index !== -1) {
					mainCible[fam].splice(index, 1);
					ajouterCarte(demandeur, "images/" + carte + ".png", id_partie);
					carteTrouvee = true;
					console.log(`${demandeur} a récupéré ${carte} depuis ${cible}`);
					verifierFamilles(demandeur, id_partie);
					break;
				}
			}


			if (parties[id_partie]) {
				parties[id_partie].forEach(client => {
					if (client.readyState === WebSocket.OPEN) {
						client.send(JSON.stringify({
							type: "info_demande",
							texte: `${demandeur} a demandé \"${carte}\" à ${cible}`,
							succes: carteTrouvee,
							pourMoi: client.nom_joueur === demandeur,
							carte: carteTrouvee ? carte : null
						}));
					}
				});
			}
			
			if (carteTrouvee) {
				if (timersTours[id_partie]) clearTimeout(timersTours[id_partie]);
				passerAuJoueurSuivant(id_partie);
				console.log("mainsJoueurs[", id_partie, "] :", mainsJoueurs[id_partie]);
			}
			else{
				console.log(`${cible} ne possède pas ${carte}`);
				carteDemandee[id_partie] = "images/" + carte + ".png";
				joueurQuiDemande[id_partie] = demandeur;

				// Forcer le joueur demandeur à piocher
				parties[id_partie].forEach(client => {
					if (client.nom_joueur === demandeur && client.readyState === WebSocket.OPEN) {
						client.send(JSON.stringify({ type: "forcer_pioche" }));
					}
				});
			}

			/*afficherMains(id_partie);*/
			
		}
    });

    ws.on('close', () => {
        const id = ws.id_partie;
        if (id && parties[id]) {
            parties[id] = parties[id].filter(c => c !== ws);
        }
    });
});

console.log("WebSocket server running at ws://localhost:8080");
