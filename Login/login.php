<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="UTF-8">
		<title>login</title>
	</head>
	<body>
		<?php
			if (isset($_GET['error']) && $_GET['error'] == 1) {
				echo '<p style="color:red;">Identifiant ou mot de passe incorrect. Veuillez réessayer.</p>';
			}
			
			if (isset($_GET['error']) && $_GET['error'] == 2) {
				echo '<p style="color:red;">Aucun compte ne correspond, veuillez réesayer ou vous inscrire </p>';
			}
		?>
		
		<form action="acces.php" method="post">
			<label for="login">Nom d'utilisateur</label>
			<input type="text" name="login" id="login" required>
			<br>
			
			<label for="mdp">Mot de passe</label>
			<input type="password" name="mdp" id="mdp" required>
			<br>
			
			<button type="submit">Connexion</button>
		</form>
		<a href="register.php"<button id="inscription">Inscription</button><a>
	</body>
</html>
