<?php
	include 'user.inc.php';
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		$login = $_POST['login'];
		$mdp = $_POST['mdp'];
		$mdp_confirm = $_POST['mdp_confirm'];
		$email = $_POST['mail'];
		if(exist($login)){
			echo "<p style='color:red;'>Le nom d'utilisateur existe déjà</p>";
		}
		elseif ($mdp!=$mdp_confirm){
			echo "<p style='color:red;'>Veuillez saisir des mots de passe identiques</p>";
		}
		else{
			addUser($login,$mdp,$email);
			$message="Inscription réussie. Vous pouvez maintenant vous connecter.";
			header('Location: login.php');
		}
		
	}
?>


<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="UTF-8">
		<title>register</title>
		<link rel="stylesheet" type="text/css" href="../style/login_css.css">
	</head>
	<body>

			<div class="container">
				<div class="heading">Inscription</div>
				<form action="register.php" method="POST" class="form">
				  <input required class="input" type="text" name="login" id="login" placeholder="Nom d'utilisateur">
				  <input required class="input" type="email" name="mail" id="mail" placeholder="E-mail">
				  <input required class="input" type="password" name="mdp" id="mdp" placeholder="Mot de passe">
				  <input required class="input" type="password" name="mdp_confirm" id="mdp_confirm" placeholder="Mot de passe">
				  <input class="login-button" type="submit" value="Inscription">
				  <a href="login.php"<button id="inscription">Connexion</button><a>
				</form>
			</div>
			<!--
			<?php
				if (isset($error)){
					echo "<p style='color=red;'>$error</p>";
				}
			?>-->
		</form>
	</body>
</html>
