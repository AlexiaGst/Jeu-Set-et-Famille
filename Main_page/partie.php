<?php
	include 'Login/bd_user.php';
	session_start();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Jeu, Set et Famille - Jeu</title>
    <meta charset="utf-8"/>
    <link rel="icon" href="images/logo.ico" type="image/x-icon">
    <link rel="stylesheet" href="style/game.css">
    <link href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,800&display=swap" rel="stylesheet">
</head>

<body>

<main>
    <a href='ongoing_games.php?retour=<?php echo $id_partie; ?>' id='retour'>&lt; Retour</a>

<div class="grid-layout">
  <div class="top-section">
  <div class="player-info">
  <div class="profile-timer">
    <svg class="progress-ring" width="80" height="80">
      <circle class="progress-ring__circle" stroke="green" stroke-width="5" fill="transparent" r="35" cx="40" cy="40"/>
    </svg>
    <img src="images/profil1.png" alt="Profil" class="profile-pic">
  </div>
  <span class="player-name">Joueur 1</span>
</div>

    <div class="cards1">
        <div class="card1"></div>
        <div class="card1"></div>
        <div class="card1"></div>
        <div class="card1"></div>
    </div>
  </div>

  <div class="middle-section">
    <div class="box">
    <div class="two-player">
    <div class="player-info">
  <div class="profile-timer">
    <svg class="progress-ring" width="80" height="80">
      <circle class="progress-ring__circle" stroke="green" stroke-width="5" fill="transparent" r="35" cx="40" cy="40"/>
    </svg>
    <img src="images/profil1.png" alt="Profil" class="profile-pic">
  </div>
  <span class="player-name">Joueur 1</span>


      <div class="cards1">
          <div class="card1"></div>
          <div class="card1"></div>
          <div class="card1"></div>
          <div class="card1"></div>
      </div>
      </div>

      <div class="player-info">
  <div class="profile-timer">
    <svg class="progress-ring" width="80" height="80">
      <circle class="progress-ring__circle" stroke="green" stroke-width="5" fill="transparent" r="35" cx="40" cy="40"/>
    </svg>
    <img src="images/profil1.png" alt="Profil" class="profile-pic">
  </div>
  <span class="player-name">Joueur 1</span>


      <div class="cards1">
          <div class="card1"></div>
          <div class="card1"></div>
          <div class="card1"></div>
          <div class="card1"></div>
      </div>
      </div>

      
    </div>
    </div>


<!-- PIOCHE -->
    <div class="box">
      <div class="pioche-cards">
          <div class="card2"></div>
          <div class="card2"></div>
          <div class="card2"></div>
          <div class="card2"></div>
          <div class="card2"></div>
          <div class="card2"></div>
          <div class="card2"></div>
          <div class="card2"></div>
          <div class="card2"></div>
          <div class="card2"></div>
      </div>
    </div>

<!-- -->

<div class="box">
  <div class="two-player">
    <div class="player-info">
  <div class="profile-timer">
    <svg class="progress-ring" width="80" height="80">
      <circle class="progress-ring__circle" stroke="green" stroke-width="5" fill="transparent" r="35" cx="40" cy="40"/>
    </svg>
    <img src="images/profil1.png" alt="Profil" class="profile-pic">
  </div>
  <span class="player-name">Joueur 1</span>


      <div class="cards1">
          <div class="card1"></div>
          <div class="card1"></div>
          <div class="card1"></div>
          <div class="card1"></div>
      </div>
      </div>

      <div class="player-info">
  <div class="profile-timer">
    <svg class="progress-ring" width="80" height="80">
      <circle class="progress-ring__circle" stroke="green" stroke-width="5" fill="transparent" r="35" cx="40" cy="40"/>
    </svg>
    <img src="images/profil1.png" alt="Profil" class="profile-pic">
  </div>
  <span class="player-name">Joueur 1</span>


      <div class="cards1">
          <div class="card1"></div>
          <div class="card1"></div>
          <div class="card1"></div>
          <div class="card1"></div>
      </div>
      </div>

      
    </div>
    </div>
  </div>

  <div class="bottom-section">
  <div class="player-info">
  <div class="profile-timer">
    <svg class="progress-ring" width="80" height="80">
      <circle class="progress-ring__circle" stroke="green" stroke-width="5" fill="transparent" r="35" cx="40" cy="40"/>
    </svg>
    <img src="images/profil1.png" alt="Profil" class="profile-pic">
  </div>
  <span class="player-name">Joueur 1</span>
</div>

    <div class="cards">
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
    </div>
  </div>
</div>

</main>
<script src="game_script.js"></script>




</body>
</html>


