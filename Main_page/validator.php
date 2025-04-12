<?php
	include("Login/bd_user.php");

	session_start();
	$isConnected = isset($_SESSION['nom_utilisateur']);
	$id_partie=$_GET['id_partie'];
	if ($_SERVER['REQUEST_METHOD'] == 'POST' ) {
		$mdp_test=$_POST['mdp'];
		$sql = "SELECT mot_de_passe FROM parties WHERE id_partie=$id_partie";
		$mdp = mysqli_query($bdd, $sql);
		$mdp = mysqli_fetch_assoc($mdp)['mot_de_passe'];
		mysqli_close($bdd);
		if ($mdp_test==$mdp){
			header("Location: waiting_room.php?id_partie=" . $id_partie . "&action=increment&mode=prive");
		}
		else{
			$err="<p style='color:red;'>Mot de passe incorrecte</p>";
		}
	}

?>
<!DOCTYPE html>
<html lang="fr">
	<head>
		<title>Rejoindre</title>
		<meta charset="utf-8"/>
		<link rel="icon" href="images/logo.ico" type="image/x-icon">
		<link rel="stylesheet" href="style/header_css.css">
		<link rel="stylesheet" href="style/style_validator.css">
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
		<a href='ongoing_games.php' id='retour'>&lt; Retour</a>

			<div class="container">
				<h1 class="heading">Entrer le mot de passe:</h1>
				<form  action="validator.php?id_partie=<?php echo $id_partie; ?>" method="post" class="form">
					<input required class="input" type="text" name="mdp" id="mdp">
					<?php
					if (isset($err)){
						echo $err;
					}
					?>
					<button class="submit" type="submit" name="valider">Entrer</button>
				</form>
			</div>
		</main>
	</body>
</html>