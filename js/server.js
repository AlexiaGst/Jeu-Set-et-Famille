//--------------------------------------------------------------------------------------
//Initialisation des images

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

//--------------------------------------------------------------------------------------
//Fonctions

function distributeCards(id_partie, joueurs) {//Distribution des cartes

    cartes.sort(() => Math.random() - 0.5);//Mélange des cartes
	/*Pour tester
	cartes=["images/boxe.png",
    "images/judo.png",
    "images/karate.png",
    "images/mma.png",
    "images/lutte.png",
	"images/roller.png",
	
	"images/aviron.png",
    "images/kitesurf.png",
	"images/taekwondo.png",
    "images/natation.png",
    "images/surf.png",
    "images/wakeboard.png",
    "images/waterpolo.png",
	
	
    "images/skateboard.png",
	"images/monocycle.png",
	"images/rugby.png",
    "images/tennis.png"];*/
	
	
	const distrib = 7;//cartes à distribuer
	mainsJoueurs[id_partie] = {};

	const totalDistrib = joueurs.length * distrib;
	pioche = cartes.slice(totalDistrib);

	joueurs.forEach((joueur, index) => {
		const playerCards = cartes.slice(index * distrib, (index + 1) * distrib);
		const nom = joueur.nom_joueur;

		if (nom) {
			mainsJoueurs[id_partie][nom] = {};
			playerCards.forEach(carte => ajouterCarte(nom, carte, id_partie));
		}
		
		//Envoi des cartes aux joueurs
		if (joueur.readyState === WebSocket.OPEN) {
			joueur.send(JSON.stringify({
				type: "distribution",
				cartes: playerCards,
				compteur: pioche.length
			}));
		} else {
			console.log("Socket fermée pour le joueur", index + 1);
		}
	});
}


function initJoueurs(id_partie,joueurs){// Crée le profil de chaque joueur pour la partie
	const profils = {};
	img_profil.sort(() => Math.random() - 0.5);//photo de profil au hasard

	joueurs.forEach((joueur, index) => {
		const nom = joueur.nom_joueur;
		profils[nom] = img_profil[index] || "images/profil1.png"; // profil par défaut au cas où

	});
	//Envoie son profil à chaque joueur
	joueurs.forEach((joueur) => {
		if (joueur.readyState === WebSocket.OPEN) {
			joueur.send(JSON.stringify({ type: "profil", profils }));
		}
	});
}


function passerAuJoueurSuivant(id_partie, initial = false) {//Change le tour actuel pour le joueur suivant
	if (partiesTerminees[id_partie]) return;
    const data = toursData[id_partie];
    if (!data) return;

    if (!initial) {
        data.indexTour = (data.indexTour + 1) % data.joueurs.length;
    }

    const suivant = data.joueurs[data.indexTour];
    tours[id_partie] = suivant;

	//Envoie les infos du nouveau tour aux autres joueurs
    parties[id_partie].forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: "info_tour",
                joueur: suivant
            }));
        }
    });

    // Redémarre le timer
    if (timersTours[id_partie]) clearTimeout(timersTours[id_partie]);
    timersTours[id_partie] = setTimeout(() => {
        passerAuJoueurSuivant(id_partie);
    }, 30000);
}


function ajouterCarte(joueurNom, carte, id_partie) {//Ajoute une carte à la main du joueur
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

function verifierFinPartie(id_partie) {//Vérifie si la partie doit se terminer
	const totalFamilles = Object.keys(familles).length;
	let totalCompletes = 0;

	for (const joueur in mainsJoueurs[id_partie]) {
		if (scores[joueur]) {
			totalCompletes += scores[joueur];
		}
	}
	//Si la pioche est vide ou que les joueurs ont toutes les familles, fin de la partie
	if (totalCompletes >= totalFamilles || pioche.length === 0) {
		terminerPartie(id_partie);
	}
}

function verifierFamilles(joueurNom, id_partie) {//Vérifie si une famille est complète
	const main = mainsJoueurs[id_partie][joueurNom];
	for (const nomFamille in main) {
		if (main[nomFamille].length === 6) {//Si la famille est complète
			delete main[nomFamille];
			if (!scores[joueurNom]) scores[joueurNom] = 0;
			scores[joueurNom] += 1;
			
			//Envoi aux joueurs
			parties[id_partie].forEach(client => {
				if (client.readyState === WebSocket.OPEN) {
				    client.send(JSON.stringify({
						type: 'famille_complete',
						joueur: joueurNom,
						famille: nomFamille,
						score:scores[joueurNom]
				    }));
				}
			});
		}
    }
	verifierFinPartie(id_partie);
}


function terminerPartie(id_partie) {//Fin de partie
	if (partiesTerminees[id_partie]) return;
	partiesTerminees[id_partie] = true; 
	
	console.log(`Partie ${id_partie} terminée.`);

	//Création du classement
	const joueursPartie = parties[id_partie].map(ws => ws.nom_joueur);
	const classement = joueursPartie.map(nom => ({
		joueur: nom,
		score: scores[nom] || 0
	})).sort((a, b) => b.score - a.score);

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


//--------------------------------------------------------------------------------------
//Variables d'initialisation

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

var pioche=[];
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

//--------------------------------------------------------------------------------------
//Ecoute sur la websocket

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);

        if (data.type === 'join') {//Inscrit les joueurs dans la partie
            const id = data.id_partie;
			const nom = data.nom_utilisateur;
            ws.id_partie = id;
			ws.nom_joueur = nom;

            if (!parties[id]) parties[id] = [];
            parties[id].push(ws);

            // Si la partie est déjà lancée, envoie directement start_game
            if (partiesLancees[id]) {
                ws.send(JSON.stringify({ type: 'start_game' }));
            }
        }
			
        if (data.type === 'start') {// Lance la partie
            const id = data.id_partie;
            partiesLancees[id] = true;

            if (parties[id]) {
                parties[id].forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'start_game' }));
                    }
                });
				//Temps de sécurité
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
		
	if (data.type === 'exit') {// En cas d'abandon de la partie
		const id_partie = data.id_partie;
		const joueur = data.joueur;

		console.log(`Joueur ${joueur} a quitté la partie ${id_partie}`);

		// Récupération et suppression des cartes du joueur
		if (mainsJoueurs[id_partie]?.[joueur]) {
			const cartes = Object.values(mainsJoueurs[id_partie][joueur]).flat();
			pioche.push(...cartes);
			pioche = pioche.sort(() => Math.random() - 0.5);
			delete mainsJoueurs[id_partie][joueur];
		}

		// Retirer le joueur du tableau des tours
		if (toursData[id_partie]) {
			const quit = tours[id_partie] === joueur;
			toursData[id_partie].joueurs = toursData[id_partie].joueurs.filter(nom => nom !== joueur);
			if (quit) {
				if (timersTours[id_partie]) clearTimeout(timersTours[id_partie]);
				passerAuJoueurSuivant(id_partie);
			}
		}

		// Envoi aux autres joueurs
		(parties[id_partie] || []).forEach(j => {
			if (j.readyState === WebSocket.OPEN) {
				j.send(JSON.stringify({ type: 'exit', joueur:joueur, pioche:pioche.length }));
			}
		});

		// S'il ne reste qu'un joueur, on termine la partie
		const restants = Object.keys(mainsJoueurs[id_partie] || {});
		if (restants.length === 1 && !partiesTerminees[id_partie]) {
			const gagnant = restants[0];
			console.log(`Un seul joueur restant (${gagnant}) : fin automatique de la partie.`);
			partiesTerminees[id_partie] = true;

			parties[id_partie].forEach(client => {
				if (client.nom_joueur === gagnant && client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify({
						type: "fin_partie",
						classement: [{ joueur: gagnant, score: scores[gagnant] || 0 }]
					}));
				}
			});

			if (timersTours[id_partie]) clearTimeout(timersTours[id_partie]);
		}

		// Si tous les sockets sont fermés, on déclenche la suppression de la partie dans la base de données
		
		const clientsActifs = (parties[id_partie] || []).filter(j => j.readyState === WebSocket.OPEN);
		if (clientsActifs.length === 1) {
			console.log("Tous les joueurs ont quitté, suppression en base.");
			fetch(`http://localhost/Jeu_Set_Famille/suppression_partie.php?id_partie=${id_partie}`)
				.then(res => res.text())
				.then(console.log)
				.catch(console.error);
		}
	}

		
		if (data.type === 'pioche') {//Quand un joueur pioche
			const id = ws.id_partie;
			if (partiesTerminees[id]) return;
			const joueur = ws.nom_joueur;
			
			//Bloque les actions du joueur si ce n'est pas son tour
			if (tours[id] !== joueur) {
				return;
			}
			if (!pioche || pioche.length === 0) {
				console.log("Pioche vide !");
				ws.send(JSON.stringify({ type: 'pioche_vide' }));
				return;
			}

			const carte = pioche.shift(); // retire la première carte
			let bonnePioche = false;
			if (carteDemandee[id] && joueurQuiDemande[id]) {
				// Après une pioche forcée
				if (carte === carteDemandee[id]) {
					bonnePioche = true;
				}

				delete carteDemandee[id];
				delete joueurQuiDemande[id];
			}
			if (parties[id]) {//Envoie aux autres joueurs de lancer l'animation
				parties[id].forEach(client => {
					if (client.readyState === WebSocket.OPEN) {
						const isJoueur = client === ws;
						client.send(JSON.stringify({
							type: "pioche_animation",
							pourMoi: isJoueur,
							joueur:joueur,
							carte: isJoueur ? carte : null,
							bonne_pioche:bonnePioche,
							compteur:pioche.length
						}));
						
						if (isJoueur) {
							const nom = client.nom_joueur;

							if (!mainsJoueurs[id]) mainsJoueurs[id] = {};
							if (!mainsJoueurs[id][nom]) mainsJoueurs[id][nom] = [];

							ajouterCarte(nom, carte, id);// Ajoute la carte à la main
							verifierFamilles(nom, id); //Vérifie si une famille est complète
						}
					}
				});
				if (timersTours[id]) clearTimeout(timersTours[id]);
				if (bonnePioche) {//Si le joueur fait une bonne pioche, on recommence son tour
					parties[id].forEach(client => {
						if (client.readyState === WebSocket.OPEN) {
							client.send(JSON.stringify({
								type: "info_tour",
								joueur:joueur
							}));
						}
					});
					
					// Redémarrer son timer
					timersTours[id] = setTimeout(() => {
						console.log(`Temps écoulé pour ${joueur}, passage au suivant.`);
						passerAuJoueurSuivant(id);
					}, 30000);
				} else {
					// Sinon tour suivant
					passerAuJoueurSuivant(id);
				}
			}
		}

		if (data.type === 'demande_carte') {//Quand un joueur demande une carte
			const { id_partie, demandeur, cible, carte } = data;
			if (partiesTerminees[id_partie]) return;
			//Bloque les actions du joueur si ce n'est pas son tour
			if (tours[id_partie] !== demandeur) {
				return;
			}

			const mainDemandeur = mainsJoueurs[id_partie]?.[demandeur];
			const mainCible = mainsJoueurs[id_partie]?.[cible];

			if (!mainCible || !mainDemandeur) {
				console.log("Joueur introuvable dans les mains");
				return;
			}

			let carteTrouvee = false;
			for (const fam in mainCible) {
				const index = mainCible[fam].indexOf(carte);
				if (index !== -1) {// Si le joueur cible possède la carte demandée
					mainCible[fam].splice(index, 1);
					ajouterCarte(demandeur, carte, id_partie);
					carteTrouvee = true;
					break;
				}
			}

			if (parties[id_partie]) {// Informe tous les joueurs
				parties[id_partie].forEach(client => {
					if (client.readyState === WebSocket.OPEN) {
						client.send(JSON.stringify({
							type: "info_demande",
							texte: `${demandeur} a demandé \"${carte.split('/').pop().replace('.png', '')}\" à ${cible}`,
							succes: carteTrouvee,
							pourMoi: client.nom_joueur === demandeur,
							carte: carteTrouvee ? carte : null,
							joueurE:cible,
							joueurR:demandeur
						}));
					}
				});
			}
			
			if (carteTrouvee) {
				if (timersTours[id_partie]) clearTimeout(timersTours[id_partie]);
				passerAuJoueurSuivant(id_partie);
				verifierFamilles(demandeur, id_partie);
			}
			else{// Si la carte n'est pas trouvée, le joueur doit piocher
				carteDemandee[id_partie] = carte;
				joueurQuiDemande[id_partie] = demandeur;

				parties[id_partie].forEach(client => {
					if (client.nom_joueur === demandeur && client.readyState === WebSocket.OPEN) {
						client.send(JSON.stringify({ type: "forcer_pioche" }));
					}
				});
			}			
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
