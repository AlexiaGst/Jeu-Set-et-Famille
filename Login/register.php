<?php
	include 'user.inc.php'
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
	</head>
	<body>
		
		<form action="register.php" method="post">
			<label for="login">Nom d'utilisateur</label>
			<input type="text" name="login" id="login" required>
			<br>
			
			<label for="mdp">Mot de passe</label>
			<input type="password" name="mdp" id="mdp" required>
			<br>
			
			<label for="mdp_confirm">Mot de passe</label>
			<input type="password" name="mdp_confirm" id="mdp_confirm" required>
			<br>
			
			<label for="mail">Mail</label>
			<input type="email" name="mail" id="mail" required>
			<br>
			
			<button type="submit">Inscription</button>
			
			<?php
				if (isset($error)){
					echo "<p style='color=red;'>$error</p>";
				}
			?>
		</form>
	</body>
</html>
