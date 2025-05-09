<?php
	include 'Login/bd_user.php';
	session_start();
	if (isset($_GET['id_partie'])) {
		$id_partie = $_GET['id_partie'];
		
		if (isset($_GET['action']) && $_GET['action'] == 'increment') {
			$sql = "SELECT mot_de_passe, nbr_joueurs, max_joueurs FROM parties WHERE id_partie=$id_partie";
			$res = mysqli_query($bdd, $sql);
			$row = mysqli_fetch_assoc($res);
			
			if ($row['nbr_joueurs'] >= $row['max_joueurs']) {
				mysqli_close($bdd);
				echo "<script>alert('La partie est déjà pleine !'); window.location.href = 'ongoing_games.php';</script>";
				exit();
			}
			
			$nouveau_nbr_joueurs = $row['nbr_joueurs'] + 1;
			$update_sql = "UPDATE parties SET nbr_joueurs = $nouveau_nbr_joueurs WHERE id_partie = $id_partie";
			mysqli_query($bdd, $update_sql);

			if ($nouveau_nbr_joueurs >= $row['max_joueurs']) {
		
				$data = json_encode([
					'type' => 'start',
					'id_partie' => $id_partie
				]);
				file_put_contents("start_msg.json", $data);

				sleep(1); // laisser le temps aux clients de se connecter
				$full_path = realpath(__DIR__ . "/js/send_start.js");
				exec("node \"$full_path\"");
			}

			if(isset($_GET['mode'])&&$_GET['mode']=== 'prive'){
				header("Location: waiting_room.php?id_partie=" . $id_partie . "&mode=prive");
			}
			else{
				$nom_utilisateur = $_SESSION['nom_utilisateur'];

				$sql = "SELECT id_client FROM utilisateurs WHERE nom_utilisateur = '$nom_utilisateur'";
				$res = mysqli_query($bdd, $sql);
				$row_joueur = mysqli_fetch_assoc($res);
				$id_joueur= $row_joueur['id_client'];
				header("Location: waiting_room.php?id_partie=" . $id_partie . "&id_joueur=" . $nom_utilisateur . "&mode=public");
			}
			
			exit();
		}
	}
?>


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
	<a href='ongoing_games.php?retour=<?php echo $id_partie; ?>' id='retour'>&lt; Retour</a>
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
		<?php if($_GET['mode']=='prive'){
			$sql = "SELECT mot_de_passe FROM parties WHERE id_partie=$id_partie";
			$mdp = mysqli_query($bdd, $sql);
			$mdp = mysqli_fetch_assoc($mdp)['mot_de_passe'];
			mysqli_close($bdd);
			if ($mdp){
				echo "<br><p class='code'>Mot de passe: $mdp</p>";
			}
		}

		?>
				
			
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
    var interval = 5000;
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


	
	const idPartie = <?php echo json_encode($id_partie); ?>;

	fetch('register_ingame.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: 'id_partie=' + encodeURIComponent(idPartie)
	})
	.then(response => {
		if (!response.ok) throw new Error("Erreur enregistrement joueur");
		return response.text();
	})
	.then(result => {
		console.log("✅ Joueur inscrit dans 'jeu' :", result);

		// Ensuite seulement, ouvrir le WebSocket
		const socket = new WebSocket('ws://localhost:8080');

		socket.addEventListener('open', () => {
			socket.send(JSON.stringify({ type: 'join', id_partie: idPartie }));
		});

		socket.addEventListener('message', (event) => {
			const data = JSON.parse(event.data);
			if (data.type === 'start_game') {
				window.location.href = 'partie.php?id_partie=' + idPartie;
			}
		});

		socket.addEventListener('error', (event) => {
			console.error("Erreur WebSocket :", event);
		});
	})
	.catch(error => {
		console.error("❌ Erreur AJAX lors de l'inscription :", error);
	});
</script>

</body>
</html>