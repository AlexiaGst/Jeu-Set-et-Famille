<?php
include("Login/bd_user.php");

// Sélectionner les parties ouvertes
$sql = "SELECT id_partie, mot_de_passe, nbr_joueurs, max_joueurs FROM parties WHERE nbr_joueurs < max_joueurs AND mot_de_passe IS NULL";
$result = $bdd->query($sql);

// Sélectionner les parties privées (mot de passe défini)
$sql2 = "SELECT id_partie, mot_de_passe, nbr_joueurs, max_joueurs FROM parties WHERE nbr_joueurs < max_joueurs AND mot_de_passe IS NOT NULL";
$result2 = $bdd->query($sql2);

session_start();
$isConnected = isset($_SESSION['nom_utilisateur']);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Jeu, Set et Famille - Jeu des 7 familles</title>
    <meta charset="utf-8"/>
    <link rel="icon" href="images/logo.ico" type="image/x-icon">
    <link rel="stylesheet" href="style/header_css.css">
    <link rel="stylesheet" href="style/ongoing_games.css">
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
<div class="parties">
    <div class="bouton-switch">
        <div id="btn"></div>
        <button type="button" class="toggle-btn" onclick="showPublicGames()">Parties Ouvertes</button>
        <button type="button" class="toggle-btn" onclick="showPrivateGames()">Parties Privées</button>
    </div>
    
    <div class="game-list">
        <div id="public">
            <?php
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    echo "<div class='game-item'>
                            <img src='images/logo.png'>
                            <p>Joueurs: " . $row["nbr_joueurs"] . " / " . $row["max_joueurs"] . "</p>";
                    if ($row["max_joueurs"] - $row["nbr_joueurs"] > 1) {
                        echo "<a href='waiting_room.php?id_partie=" . $row["id_partie"] . "'>Rejoindre</a>";
                    } else {
                        echo "<a href='game.php?id_partie=" . $row["id_partie"] . "'>Rejoindre</a>";
                    }
                    echo "</div>";
                }
            } else {
                echo "<p>Aucun jeu public en cours.</p>";
            }
            ?>
        </div>

        <div id="private" style="display: none;">
            <?php
            if ($result2->num_rows > 0) {
                while ($row2 = $result2->fetch_assoc()) {
                    echo "<div class='game-item'>
                            <img src='images/logo.png'>
                            <p>Joueurs: " . $row2["nbr_joueurs"] . " / " . $row2["max_joueurs"] . "</p>
                            <a href='game.php?id_partie=" . $row2["id_partie"] . "'>Rejoindre</a>
                          </div>";
                }
            } else {
                echo "<p>Aucun jeu privé en cours.</p>";
            }
            ?>
        </div>
    </div>
</div>
</main>

<script>
    function showPublicGames() {
        document.getElementById("public").style.display = "block";
        document.getElementById("private").style.display = "none";
        document.getElementById("btn").style.left = "0";
    }

    function showPrivateGames() {
        document.getElementById("public").style.display = "none";
        document.getElementById("private").style.display = "block";
        document.getElementById("btn").style.left = "300px";
    }
</script>

</body>
</html>
