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
		</div>
	</main>
	<script src="js/familles_script.js"></script>
</body>
</html>