<?php
include("Login/bd_user.php");

$search = "";
if (isset($_GET['search'])) {
    $search = $bdd->real_escape_string($_GET['search']);
}

// Construire la condition de recherche si un terme est saisi
$where_search = "";
if ($search != "") {
    $where_search = " AND nom_partie LIKE '%" . $search . "%'";
}

// Sélectionner les parties ouvertes
$sql = "SELECT id_partie,nom_partie, mot_de_passe, nbr_joueurs, max_joueurs FROM parties WHERE nbr_joueurs < max_joueurs AND mot_de_passe IS NULL". $where_search;
$result = $bdd->query($sql);

// Sélectionner les parties privées (mot de passe défini)
$sql2 = "SELECT id_partie, nom_partie, mot_de_passe, nbr_joueurs, max_joueurs FROM parties WHERE nbr_joueurs < max_joueurs AND mot_de_passe IS NOT NULL". $where_search;
$result2 = $bdd->query($sql2);

session_start();
$isConnected = isset($_SESSION['nom_utilisateur']);
$nom=$_SESSION['nom_utilisateur'];

if (isset($_GET['retour'])) {
    $id_partie = intval($_GET['retour']);
	if (isset($_GET['quit'])){//Retire le joueur de la partie en cours
		$id=$_GET['quit'];
		$sql_supp="DELETE FROM jeu WHERE id_partie = '$id_partie' AND id_joueur = '$id'";
		mysqli_query($bdd, $sql_supp);
	}else{//Désinscrit le joueur de la partie et décrémente le nombre de joueurs
		$sql = "SELECT id_client FROM utilisateurs WHERE nom_utilisateur = '$nom'";
		$res = mysqli_query($bdd, $sql);
		$row_joueur = mysqli_fetch_assoc($res);
		$id_joueur=$row_joueur['id_client'];
		$id_joueur = $row_joueur['id_client'];
		$sql2="DELETE FROM jeu WHERE id_partie = $id_partie AND id_joueur=$id_joueur";
		mysqli_query($bdd, $sql2);
		$sql = "UPDATE parties SET nbr_joueurs = nbr_joueurs - 1 WHERE id_partie = $id_partie";
		mysqli_query($bdd, $sql);
	}
    header("Location: ongoing_games.php");
    exit();
}
?>


<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Jeu, Set et Famille - Jeu des 7 familles</title>
    <meta charset="utf-8"/>
    <link rel="icon" href="images/logo.ico" type="image/x-icon">
    <link rel="stylesheet" href="style/header_css.css">
    <link rel="stylesheet" href="style/ongoing_games.css">
	<script src="js/ongoing_games_script.js"></script>
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
            <li><a href="play_game.php">Jouer une Partie</a></li>
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
	<a href='play_game.php' id='retour'>&lt; Retour</a>

	<!--Barre de recherche-->
    <form method="GET" action="ongoing_games.php" class="recherche">
        <input type="text" name="search" placeholder="Rechercher par nom de partie..."
               value="<?php echo isset($_GET['search']) ? htmlspecialchars($_GET['search']) : ''; ?>">
        <button id="rech_btn" type="submit">Rechercher</button>
    </form>


	<div class="parties">
		<div class="bouton-switch">
			<div id="btn"></div>
			<button type="button" class="toggle-btn" onclick="showPublicGames()">Parties Ouvertes</button>
			<button type="button" class="toggle-btn" onclick="showPrivateGames()">Parties Privées</button>
		</div>
		
		<div class="game-list">
			<div id="public">
				<?php
				//Selectionne les parties publiques
				if ($result->num_rows > 0) {
					while ($row = $result->fetch_assoc()) {
						echo "<div class='game-item'><img src='images/logo.png'><p>| ". $row["nom_partie"] ." |&emsp;Joueurs: " . $row["nbr_joueurs"] . " / " . $row["max_joueurs"] . "</p>";
						echo "<a href='waiting_room.php?id_partie=" . $row["id_partie"] . "&action=increment'>Rejoindre</a>";

						echo "</div>";
					}
				} else {
					echo "<p>Aucun jeu public en cours.</p>";
				}
				?>
			</div>

			<div id="private" style="display: none;">
				<?php
				//Selectionne les parties privées
				if ($result2->num_rows > 0) {
					while ($row2 = $result2->fetch_assoc()) {
						echo "<div class='game-item'>
						<img src='images/logo.png'>
						<p>| " . $row2["nom_partie"] . " |&emsp;Joueurs: " . $row2["nbr_joueurs"] . " / " . $row2["max_joueurs"] . "</p>
						<a href='validator.php?id_partie=" . $row2["id_partie"] . "'>Rejoindre</a>
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
</body>
</html>