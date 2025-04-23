<?php
session_start();
$isConnected = isset($_SESSION['nom_utilisateur']);
?>


<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Jeu, Set et Famille - Familles</title>
    <meta charset="utf-8"/>
    <link rel="icon" href="images/logo.ico" type="image/x-icon">
    <link rel="stylesheet" href="style/familles.css">
    <link rel="stylesheet" href="style/header_css.css">

    <link href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,800&display=swap" rel="stylesheet">
</head>

<body>

	<header>
		<a href="index.php">
			<img src="images/logo.png" alt="Jeu-Set-et-Famille logo" class="logo">
		</a>
		<input type="checkbox" id="nav_check" hidden>
		<nav>
			<ul> 
            <?php if ($isConnected): ?>
                <li><a href="play_game.php">Jouer une Partie</a></li>
    	    <?php else: ?>
    	    <li><a href="Login/login.php">Jouer une Partie</a></li>
    	    <?php endif; ?>
            <li><a href="rules.php">Règles du jeu</a></li>
            <li><a href="familles.php">Les familles</a></li>
    	    <?php if (!$isConnected): ?>
                <li><a href="Login/login.php">Connexion</a></li>
    	    <?php else: ?>
    	    <li><a href="Login/logout.php">Déconnexion</a></li>
    	    <?php endif; ?>
        </ul>
		</nav>
		<label for="nav_check" class="hamburger">
			<div></div>
			<div></div>
			<div></div>
		</label>
	</header>
	<main>
		<div class="container">
			<h1>Familles</h1>
			<div id="cartes">
			</div>
		<script>
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
				mobilité: [
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
				précision: [
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
			}

			const zone = document.getElementById("cartes");

			Object.entries(familles).forEach(([famille, cartes]) => {
				const fam = document.createElement("div");
				fam.className = "fam";
				fam.setAttribute("id", famille);
				zone.appendChild(fam);
				
				const txt=document.createElement("p");
				txt.textContent = famille.charAt(0).toUpperCase() + famille.slice(1);
				fam.appendChild(txt);
				
				cartes.forEach(carte=>{
					const img = document.createElement("img");
					img.className = "crt";
					img.setAttribute("id", carte.slice(7, -4));
					img.src = carte;
					img.alt=carte.slice(7, -4);
					fam.appendChild(img);
				});
			});
		</script>
		</div>
	</main>
</body>
</html>