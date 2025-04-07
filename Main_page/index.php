<?php
session_start();
$isConnected = !isset($_SESSION['nom_utilisateur']);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Jeu, Set et Famille</title>
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
            <li><a href="">Jouer une Partie</a></li>
            <li><a href="">Règles du jeu</a></li>
            <li><a href="">Les familles</a></li>
            <li><a href="Login/login.php">Connexion</a></li>
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
    <img src="images/logo.png">
    <div class="text"></div>

</div>
<button onclick="handle_play_button()">Jouer</button>
</div>
<script>
	function handle_play_button() {
		<?php if (!$isConnected): ?>
			window.location.href = "Login/login.php";
		<?php else: ?>
			window.location.href = "create_game.php";
		<?php endif; ?>
	}
</script>
<script src="script.js"></script>

<div class="footer">
        <footer>
            <ul>
                <li><a href=""> Accueil </a></li>
                <li><a href=""> Jouer une Partie </a></li>
                <li><a href="">Règles du jeu</a></li>
                <li><a href="">Les familles</a></li>
                <li><a href="Login/login.php"> Connexion </a></li>
            </ul>
        </footer>
    </div>

</body>
</html>
