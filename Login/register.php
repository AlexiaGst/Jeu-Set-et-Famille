<?php
	include 'user.inc.php';
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		$login = $_POST['login'];
		$mdp = $_POST['mdp'];
		$mdp_confirm = $_POST['mdp_confirm'];
		$email = $_POST['mail'];
		
		if(exist($login)){
			$error="Le nom d'utilisateur existe déjà";
		}
		elseif ($mdp!=$mdp_confirm){
			$error="Veuillez saisir des mots de passe identiques";
		}
		else{
			addUser($login,$mdp);
			header('Location: login.php?message=Inscription réussie. Vous pouvez maintenant vous connecter.');
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
				<form action="login.php" class="form">
				  <input required class="input" type="text" name="login" id="login" placeholder="Nom d'utilisateur">
				  <input required class="input" type="email" name="mail" id="mail" placeholder="E-mail">
				  <input required class="input" type="password" name="password" id="password" placeholder="Mot de passe">
				  <input required class="input" type="password" name="password" id="password" placeholder="Mot de passe">
				  <input class="login-button" type="submit" value="Inscription">
				  <a href="login.php"<button id="inscription">Connexion</button><a>
				</form>
			</div>
			
			<?php
				if (isset($error)){
					echo "<p style='color=red;'>$error</p>";
				}
			?>
		</form>
	</body>
</html>
