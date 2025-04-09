<?php
	include 'bd_user.php';
	session_start();

	function exist($login){
		global $bdd;
		$requete = "SELECT * FROM utilisateurs WHERE nom_utilisateur = '$login'";
		$curseur = mysqli_query($bdd, $requete);
		$num = mysqli_num_rows($curseur);
		return $num;
		mysqli_close($bdd);
	}
	
	
	function loginOk($login,$mdp){
		global $bdd;
		$requete = "SELECT mot_de_passe FROM utilisateurs WHERE nom_utilisateur = '$login'";
		$curseur = mysqli_query($bdd, $requete);
		$row = mysqli_fetch_assoc($curseur);
		$hashed_password = $row['mot_de_passe'];
		
		if (password_verify($mdp, $hashed_password)) {
			mysqli_free_result($curseur);
			mysqli_close($bdd);
			return 1;
		} else {
			mysqli_free_result($curseur);
			mysqli_close($bdd);
			return 0;
		}
	}
	
	function addUser($login, $mdp, $email) {
		global $bdd;
		$hashed_password = password_hash($mdp, PASSWORD_BCRYPT);
		$reg = "INSERT INTO utilisateurs(nom_utilisateur, mot_de_passe, adresse_mail_utilisateur) VALUES ('$login', '$hashed_password','$email')";
		mysqli_query($bdd,$reg);
		mysqli_close($bdd);
	}

?>
