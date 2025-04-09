<?php
session_start();
$isConnected = isset($_SESSION['nom_utilisateur']);
?>


<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Jeu, Set et Famille - Règles</title>
    <meta charset="utf-8"/>
    <link rel="icon" href="images/logo.ico" type="image/x-icon">
    <link rel="stylesheet" href="style/rules.css">
    <link rel="stylesheet" href="style/header_css.css">

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
<div class="title">Règles du jeu </div>
<div class="text">
<br>
Les 7 familles se joue de 2 à 6 joueurs.
<br>
<p>
Le but du jeu des 7 familles est d’être le joueur ayant, à la fin de la partie, réussi à réunir le plus de familles complètes.
<br>
Le jeu est composé de 42 cartes pour 7 familles.
<br>
1 - Chaque joueur reçoit 6 cartes. Le reste des cartes est placé au centre et fait office de pioche.
<br>
2 - Le joueur dont c'est le tour demande une carte à la personne de son choix. Attention, il ne peut demander une carte d’une famille seulement s’il en possède déjà une dans son jeu.
<br>
3 - Si l'autre joueur possède la carte demandée, il la cède. Aussi longtemps que le joueur reçoit les cartes demandées, son tour continue et il peut demander une nouvelle carte à un joueur.
<br>
4 - Si l'autre joueur ne possède pas la carte demandée, la personne qui jouait pige une carte dans la pioche. Si elle pige la carte qu’elle souhaitait, elle peut rejouer. Sinon, son tour se termine et c’est le tour du joueur suivant.
<br>
5 - Dès qu’un joueur réunit une famille, il la pose devant lui et il poursuit son tour. S’il n’a plus de carte en main après avoir formé la famille, il peut piocher puis poursuivre son tour. S’il n’y a plus de carte à piocher, son tour se termine.
<br>
6 - La partie s’arrête quand toutes les familles sont complétées.
<br>
Le joueur ayant complété le plus de familles remporte la partie!</p>
</div>
</div>
</main>
</body>
</html>
