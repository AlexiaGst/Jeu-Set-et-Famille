<?php

session_start();

include("bdconnect.php");

$nom_utilisateur = $_POST['nom_utilisateur'];
$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$adresse_mail_client = $_POST['adresse_mail_client'];
$telephone = $_POST['telephone'];
$mot_de_passe = $_POST['mot_de_passe'];

$requete = "SELECT * FROM inscription WHERE nom_utilisateur = '$nom_utilisateur'";
$curseur = mysqli_query($bdd, $requete);
$num = mysqli_num_rows($curseur);

if ($num == 1) {
  echo "<script>alert('Ce nom d'utilisateur est deja pris');</script>";
  header("Refresh: 0; URL='../php/supercar_connexion.php'");
} else {
  $reg = "INSERT INTO inscription(nom_utilisateur, nom, prenom, adresse_mail_client, telephone, mot_de_passe) VALUES ('$nom_utilisateur', '$nom', '$prenom', '$adresse_mail_client', '$telephone', '$mot_de_passe')";
  mysqli_query($bdd,$reg);
  echo "<script>alert('Bienvenue, Vous pouvez vous connecter');</script>";
  header("Refresh: 0; URL='../php/supercar_connexion.php'");
}

mysqli_free_result($curseur);
 
mysqli_close($bdd);

?>
