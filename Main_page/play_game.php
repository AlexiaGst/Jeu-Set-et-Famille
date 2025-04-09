<?php
	if (session_status() === PHP_SESSION_NONE) {
		session_start();
	}

	$isConnected = isset($_SESSION['nom_utilisateur']);
?>

<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="UTF-8">
		<title>Choix</title>
		<link rel="stylesheet" type="text/css" href="style/style_play_game.css">
		<link rel="stylesheet" type="text/css" href="style/header_css.css">
		<link href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,800&display=swap" rel="stylesheet">
	</head>
	<body>
		
		<header>
			<a href="../index.php">
				<img src="images/logo.png" alt="Jeu-Set-et-Famille logo" class="logo">
			</a>
			<input type="checkbox" id="nav_check" hidden>
			<nav>
				<ul> 
			            <li><a href="play_game.php">Jouer une Partie</a></li>
			            <li><a href="rules.php">Règles du jeu</a></li>
			            <li><a href="">Les familles</a></li>
			    	    <?php if (!$isConnected): ?>
			                <li><a href="login.php">Connexion</a></li>
			    	    <?php else: ?>
			    	    <li><a onclick="logout.php">Déconnexion</a></li>
			    	    <?php endif; ?>
			        </ul>
			</nav>
			<label for="nav_check" class="hamburger">
				<div></div>
				<div></div>
				<div></div>
			</label>
		</header>
		
		
		<div class="main">
		<a href='index.php' id='retour'>&lt; Retour</a>
		
		<div class="button_container">
			
			<button class="reveal-button">
				Créer
				<div class="mini-cards-wrapper">
					<div class="mini-cards">
						<div class="mini-card card1"></div>
						<div class="mini-card card2"></div>
						<div class="mini-card card3"></div>
					</div>
				</div>
			</button>
			<button class="reveal-button">
				Rejoindre
				<div class="mini-cards-wrapper">
					<div class="mini-cards">
						<div class="mini-card card1"></div>
						<div class="mini-card card2"></div>
						<div class="mini-card card3"></div>
					</div>
				</div>
			</button>
			</div>
		</div>
		
		
	</body>
</html>
