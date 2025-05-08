<?php
	include 'user.inc.php';
	if (session_status() === PHP_SESSION_NONE) {
		session_start();
	}


	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		$login=$_POST['login'];
		$mdp=$_POST['mdp'];
		if (exist($login)){
			if (loginOk($login,$mdp)){
				header('Location: ../index.php');
			}
			else{
				$error="Identifiant ou mot de passe incorrect. Veuillez réessayer.";
			}
		}
		else {
			$error="Aucun compte ne correspond, veuillez réesayer ou vous inscrire";
		}
	}

?>

<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="UTF-8">
		<title>login</title>
		<link rel="stylesheet" type="text/css" href="../style/login_css.css">
	</head>
	<body>
		<?php
			if (isset ($_GET['message'])){
				echo "<p> $message </p>";
			}
			if (isset($_GET['error'])){
				echo "<p style='color:red;'>$error</p>";
			}
		?>

		<div class="container">
			<div class="heading">Connexion</div>
			<form  action="login.php" method="post" class="form">
			  <input required class="input" type="text" name="login" id="login" placeholder="Nom d'utilisateur">
			  <input required class="input" type="password" name="mdp" id="mdp" placeholder="Mot de passe">
			  <input class="login-button" type="submit" value="Connexion">
			  <a href="register.php"<button id="inscription">Inscription</button><a>
			</form>
		  </div>
		
		
	</body>
</html>
