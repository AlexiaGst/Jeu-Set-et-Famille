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
        <div class="card">
			<div class="face back">
                <img src="images/dos.png" alt="Face arrière">
            </div>
            <div class="face front">
                <img src="images/ski.png" alt="Face avant">
            </div>
        </div>
    </div>

    <div class="text">
        <p class="title"> En attente d'autres joueurs</p>
        <p class="desc">Veuillez attendre la venue des autres joueurs</p>
    </div>
</div>
<script>
    var faceImage = document.querySelector('.front img');
    var rectoImages = [
        'images/alpinisme.png', 'images/arc.png', 'images/aviron.png', 'images/basket.png', 'images/baseball.png', 'images/bobsleigh.png',
        'images/bowling.png', 'images/boxe.png', 'images/curling.png', 'images/cyclisme.png', 'images/escalade.png', 'images/flechettes.png',
        'images/football.png', 'images/golf.png', 'images/hockey.png', 'images/javelot.png', 'images/judo.png', 'images/karate.png', 'images/kitesurf.png',
        'images/lutte.png', 'images/mma.png', 'images/monocycle.png', 'images/natation.png', 'images/parapente.png', 'images/patinage.png',
        'images/petanque.png', 'images/randonnee.png', 'images/roller.png', 'images/rugby.png', 'images/skateboard.png', 'images/ski.png',
        'images/slackline.png', 'images/snowboard.png', 'images/surf.png', 'images/taekwondo.png', 'images/tennis.png', 'images/trail.png',
        'images/trottinette.png', 'images/volleyball.png', 'images/vtt.png', 'images/wakeboard.png', 'images/waterpolo.png'
    ];


    var index = 0;
    var lastFlipTime = 0;
    var interval = 5000; // 2.5 secondes = dos visible à mi-rotation
    function updateImage(timestamp) {
        if (!lastFlipTime) lastFlipTime = timestamp;

        var elapsed = timestamp - lastFlipTime;

        if (elapsed >= interval) {
            index = (index + 1) % rectoImages.length;
            faceImage.src = rectoImages[index];
            lastFlipTime = timestamp;
        }

        requestAnimationFrame(updateImage);
    }

    requestAnimationFrame(updateImage);
</script>

</body>
</html>
