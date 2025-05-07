<?php
session_start();
$isConnected = isset($_SESSION['nom_utilisateur']);

$cartes=[
	'images/alpinisme.png', 'images/arc.png', 'images/aviron.png', 'images/basket.png', 'images/baseball.png', 'images/bobsleigh.png',
	'images/bowling.png', 'images/boxe.png', 'images/curling.png', 'images/cyclisme.png', 'images/escalade.png', 'images/flechettes.png',
	'images/football.png', 'images/golf.png', 'images/hockey.png', 'images/javelot.png', 'images/judo.png', 'images/karate.png', 'images/kitesurf.png',
	'images/lutte.png', 'images/mma.png', 'images/monocycle.png', 'images/natation.png', 'images/parapente.png', 'images/patinage.png',
	'images/petanque.png', 'images/randonnee.png', 'images/roller.png', 'images/rugby.png', 'images/skateboard.png', 'images/ski.png',
	'images/slackline.png', 'images/snowboard.png', 'images/surf.png', 'images/taekwondo.png', 'images/tennis.png', 'images/trail.png',
	'images/trottinette.png', 'images/volleyball.png', 'images/vtt.png', 'images/wakeboard.png', 'images/waterpolo.png'
];
shuffle($cartes);
$cartes_melangees = array_slice($cartes, 0, 5);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Jeu, Set et Famille - Jeu des 7 familles </title>
    <link rel="icon" href="images/logo.ico" type="image/x-icon">
    <meta charset="utf-8"/>
    <link rel="stylesheet" type="text/css" href="style/header_css.css">
    <link rel="stylesheet" type="text/css" href="style/style.css">
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


<div class="main">
<div class="jeu">

<div class="cards">
  <?php foreach ($cartes_melangees as $index => $image): ?>
    <div class="card" style="background-image: url('<?= $image ?>'); background-size: cover; background-position: center;"></div>
  <?php endforeach; ?>
</div>


<div class="text"></div>

<script>
	function handle_play_button() {
		<?php if (!$isConnected): ?>
			window.location.href = "Login/login.php";
		<?php else: ?>
			window.location.href = "play_game.php";
		<?php endif; ?>
	}
</script>
<script src="js/bubble_script.js"></script>
</div>
</div>


</body>
</html>