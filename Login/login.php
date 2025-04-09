<?php
	include 'user.inc.php';
	session_start();
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		$login=$_POST['login'];
		$mdp=$_POST['mdp'];
		if (exist($login)){
			if (loginOk($login,$mdp)){
				header('Location: ../index.php');
			}
			else{
				echo '<p style="color:red;">Identifiant ou mot de passe incorrect. Veuillez réessayer.</p>';
			}
		}
		else {
			echo '<p style="color:red;">Aucun compte ne correspond, veuillez réesayer ou vous inscrire </p>';
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
		?>

		<div class="container">
			<div class="heading">Connexion</div>
			<form  action="login.php" method="post" class="form">
			  <input required class="input" type="text" name="login" id="login" placeholder="Nom d'utilisateur">
			  <input required class="input" type="password" name="mdp" id="mdp" placeholder="Mot de passe">
			  <span class="forgot-password"><a href="#">Mot de passe oublié ?</a></span>
			  <input class="login-button" type="submit" value="Connexion">
			  <a href="register.php"<button id="inscription">Inscription</button><a>
			</form>
		  </div>
		
		
	</body>
</html>
