<?php
include("bdconnect.php");
session_start();

    $nom_utilisateur = $_REQUEST["nom_utilisateur"];
    $mot_de_passe = $_REQUEST["mot_de_passe"];

    $requete = "SELECT nom_utilisateur, mot_de_passe FROM inscription WHERE nom_utilisateur='$nom_utilisateur' AND mot_de_passe='$mot_de_passe'";
    $curseur = mysqli_query($bdd, $requete);

    $num = mysqli_num_rows($curseur);

    if ($num == 1) {
        $_SESSION["nom_utilisateur"] = $nom_utilisateur; 
        echo '<script>alert("Connection réussie!")</script>';
        header("Refresh: 0; URL='../index.php'");
    } else {
        echo '<script>alert("Échec: ' . mysqli_error($bdd) . '")</script>';
    }

?>
