<?php
session_start();
if (!isset($_SESSION['nom_utilisateur'])) {
    echo '<script>alert("Vous devez créer un compte ou vous connecter pour faire une demande d\'essai !")</script>';
    header("Refresh: 0; URL='supercar_connexion.php'");
    exit; 
}

if (!isset($_REQUEST['idvoiture'])) {
  echo '<script>alert("Vous devez choisir un modèle pour faire une demande d\'essai !")</script>';
  header("Refresh: 0; URL='supercar_voiture.php'");
  exit; 
}
  
?>
