<?php
include 'Login/bd_user.php';
session_start();

if (!isset($_SESSION['nom_utilisateur']) || !isset($_POST['id_partie'])) {
    http_response_code(400);
    echo "Données manquantes.";
    exit();
}

$nom_utilisateur = $_SESSION['nom_utilisateur'];
$id_partie = intval($_POST['id_partie']);

// Sécurisation avec requête préparée
$stmt = $bdd->prepare("SELECT id_client FROM utilisateurs WHERE nom_utilisateur = ?");
$stmt->bind_param("s", $nom_utilisateur);
$stmt->execute();
$res = $stmt->get_result();
$row_joueur = $res->fetch_assoc();

if (!$row_joueur) {
    http_response_code(404);
    echo "Utilisateur introuvable.";
    exit();
}

$id_joueur = $row_joueur['id_client'];

// Vérifie si l'entrée existe déjà pour éviter les doublons
$check = $bdd->prepare("SELECT * FROM jeu WHERE id_partie = ? AND id_joueur = ?");
$check->bind_param("ii", $id_partie, $id_joueur);
$check->execute();
$exists = $check->get_result()->fetch_assoc();

if (!$exists) {
    $insert = $bdd->prepare("INSERT INTO jeu (id_partie, id_joueur) VALUES (?, ?)");
    $insert->bind_param("ii", $id_partie, $id_joueur);
    $insert->execute();
}

$bdd->close();
echo "OK";
?>
