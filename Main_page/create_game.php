<?php
	
	//IDEE: Faire une barre de recherche dans rejoindre pour trouver plus facilement la partie qu'on veut parmis les autres
	
	
	session_start();
	$isConnected = isset($_SESSION['nom_utilisateur']);


?>

<!DOCTYPE html>
<html lang="fr">
	<head>
		<title>Create</title>
		<meta charset="utf-8"/>
		<link rel="icon" href="images/logo.ico" type="image/x-icon">
		<link rel="stylesheet" href="style/header_css.css">
		<link rel="stylesheet" href="style/style_create_game.css">
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
					<li><a href="ongoing_games.php">Jouer une Partie</a></li>
					<li><a href="rules.php">Règles du jeu</a></li>
					<li><a href="">Les familles</a></li>
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
		<a href='play_game.php' id='retour'>&lt; Retour</a>

			<div class="container">
				<h1 class="heading">Créer une partie:</h1>
				<form  action="oncreate.php" method="post" class="form">
					<input required class="input" type="text" name="nom" id="nom" placeholder="Nom de partie">
					<p id="p_nbr">Nombre de joueurs:</p>
					<input required class="input" type="number" name="nbr" id="nbr" placeholder="Max:6">

					<label class="switch">
					  <input type="checkbox" name="mode">
					  <span class="slider"></span>
					</label>
					<button class="submit" type="submit" >Créer</button>
				</form>
			</div>
		</main>
	</body>
</html>