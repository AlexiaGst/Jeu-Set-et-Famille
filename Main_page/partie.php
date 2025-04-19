<?php
	include '../Login/bd_user.php';
	session_start();
?>


<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Jeu, Set et Famille - Jeu des 7 familles</title>
    <meta charset="utf-8"/>
    <link rel="icon" href="../images/logo.ico" type="image/x-icon">
    <link rel="stylesheet" href="../style/game.css">
    <link href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,800&display=swap" rel="stylesheet">
</head>

<body>

<main>
    <a href='ongoing_games.php?retour=<?php echo $id_partie; ?>' id='retour'>&lt; Retour</a>

<div class="grid-layout">
  <div class="top-section">
  <div class="cards1">
        <div class="card1">

        </div>
        <div class="card1">
            
        </div>
        <div class="card1">
            
        </div>
        <div class="card1">

        </div>
    </div>
  </div>
  <div class="middle-section">
    <div class="box">
    <div class="cards1">
        <div class="card1">

        </div>
        <div class="card1">
            
        </div>
        <div class="card1">
            
        </div>
        <div class="card1">

        </div>
    </div>
    </div>
    <div class="box">
    <div class="pioche-cards">
        <div class="card2">

        </div>
        <div class="card2">
            
        </div>
        <div class="card2">
            
        </div>
        <div class="card2">

        </div>
        <div class="card2">

        </div>
    </div>


    
    </div>
    <div class="box">
    <div class="cards1">
        <div class="card1">

        </div>
        <div class="card1">
            
        </div>
        <div class="card1">
            
        </div>
        <div class="card1">

        </div>
    </div>
    </div>
  </div>
  <div class="bottom-section">
    <div class="cards">
        <div class="card">

        </div>
        <div class="card">
            
        </div>
        <div class="card">
            
        </div>
        <div class="card">

        </div>
        <div class="card">
            
        </div>
        <div class="card">
            
        </div>
        <div class="card">
            
        </div>
    </div>
  </div>
</div>



</main>


</body>
</html>
