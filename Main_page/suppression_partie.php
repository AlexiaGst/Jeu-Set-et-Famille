<?php
	include 'Login/bd_user.php';

	if (isset($_GET['id_partie'])) {
		$id_partie = intval($_GET['id_partie']);

		// Supprimer les entrées de la table "jeu"
		$sql1 = "DELETE FROM jeu WHERE id_partie = $id_partie";
		mysqli_query($bdd, $sql1);

		// Supprimer la partie
		$sql2 = "DELETE FROM parties WHERE id_partie = $id_partie";
		mysqli_query($bdd, $sql2);

		echo "Suppression terminée pour la partie $id_partie.";
	} else {
		echo "ID de partie manquant.";
	}
?>
