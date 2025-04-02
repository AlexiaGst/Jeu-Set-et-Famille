<?php
	include 'users.inc.php';
	
	$login=$_POST['login'];
	$mdp=$_POST['mdp'];
	
	if (exist($login)){
		if (loginOk($login,$mdp)){
			echo "<p> Bienvenu $login ! </p>";
		}
		else{
			header("Location: login.php?error=1");
			exit;
		}
	}
	else {
		header("Location: login.php?error=2");
		exit;
	}

?>