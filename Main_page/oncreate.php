<?php
	include("Login/bd_user.php");
	session_start();
	
	global $bdd;
	$nom = $_POST['nom'];
	$nbr = $_POST['nbr'];
	$reg = "INSERT INTO parties(nom_partie, nbr_joueurs, max_joueurs) VALUES ('$nom', 0, '$nbr')";
	mysqli_query($bdd,$reg);
		
	$mode=$_POST['mode'];
	$id_partie = mysqli_insert_id($bdd);
	if ($mode){
		$mdp=substr(abs(crc32($id_partie)), 0, 6);
		$reg = "UPDATE parties SET mot_de_passe = '$mdp' WHERE id_partie = $id_partie";
		mysqli_query($bdd,$reg);
		mysqli_close($bdd);
		header("Location: waiting_room.php?id_partie=" . $id_partie . "&action=increment&mode=prive");
		exit();
	}
	mysqli_close($bdd);
	header("Location: waiting_room.php?id_partie=" . $id_partie . "&action=increment&mode=public");
	exit();
?>