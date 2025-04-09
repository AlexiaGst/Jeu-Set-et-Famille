<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Jeu, Set et Famille - Jeu des 7 familles</title>
    <meta charset="utf-8"/>
    <link rel="icon" href="images/logo.ico" type="image/x-icon">
    <link rel="stylesheet" href="style/waiting_room.css">
    <link href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,800&display=swap" rel="stylesheet">
</head>

<body>

<div class="main">
    <div class="deck">
        <div class="card"></div>
    </div>

    <div class="text">
        <p class="title"> En attente d'autres joueurs</p>
        <p class="desc">Veuillez attendre la venue des autres joueurs</p>
    </div>
</div>

<script>
    function startSpinning() {
        const card = document.querySelector(".card"); 
        card.classList.add("spinning-extra-slow"); 
    }

    window.onload = startSpinning;
</script>

</body>
</html>
