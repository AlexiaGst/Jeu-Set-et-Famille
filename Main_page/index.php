<?php
session_start();
$isConnected = isset($_SESSION['nom_utilisateur']);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Jeu, Set et Famille - Jeu des 7 familles </title>
    <link rel="icon" href="images/logo.ico" type="image/x-icon">
    <meta charset="utf-8"/>
    <link rel="stylesheet" type="text/css" href="style/header_css.css">
    <link rel="stylesheet" type="text/css" href="style/footer_css.css">
    <link rel="stylesheet" type="text/css" href="style/style.css">
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
            <li><a href="ongoing_games.php">Jouer une Partie</a></li>
            <li><a href="">Règles du jeu</a></li>
            <li><a href="">Les familles</a></li>
			<?php if ($isConnected): ?>
            <li><a href="">Connexion</a></li>
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
<div class="jeu">

<div class="cards">
<div class="black card">
  </div>
  <div class="red card">
  </div>
  <div class="black card">
  </div>
  <div class="red card">
  </div>
  <div class="red card">
  </div>
</div>


<div class="text"></div>

<script>
	function handle_play_button() {
		<?php if ($isConnected): ?>
			window.location.href = "Login/login.php";
		<?php else: ?>
			window.location.href = "play_game.php";
		<?php endif; ?>
	}
</script>
<script src="script.js"></script>
</div>
</div>

</body>
</html>
