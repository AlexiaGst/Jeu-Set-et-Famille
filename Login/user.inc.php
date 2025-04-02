<?php
	include ('bd_user.php');
	session_start();

	function exist($login){
		global $bdd;
		$requete = $bdd->prepare("SELECT id FROM utilisateurs WHERE nom_utilisateur = ?");
		$requete->bind_param("s", $login);
		$requete->execute();
		$requete->store_result();

		$exists = $requete->num_rows > 0;

		$requete->close();
		return $exists;
	}
	
	
	function loginOk($login,$mdp){
		global $bdd;
		$requete = $bdd->prepare("SELECT mot_de_passe FROM utilisateurs WHERE nom_utilisateur = ?");
		$requete->bind_param("s", $login);
		$requete->execute();
		$requete->store_result();
		$requete->bind_result($hashed_password);
		$requete->fetch();

		if ($requete->num_rows > 0 && password_verify($mdp, $hashed_password)) {
			$requete->close();
			return true;
		} else {
			$requete->close();
			return false; 
		}
	}
	
	function addUser($login, $mdp) {
		global $bdd;
		$hashed_password = password_hash($mdp, PASSWORD_BCRYPT);

		$requete = $bdd->prepare("INSERT INTO inscription (nom_utilisateur, mot_de_passe) VALUES (?, ?)");
		$requete->bind_param("ss", $login, $hashed_password);

		if ($requete->execute()) {
			$requete->close();
			return True;
		} else {
			$requete->close();
			return False;
		}
	}
	
?>