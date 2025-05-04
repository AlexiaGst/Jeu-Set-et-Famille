<?php
include 'Login/bd_user.php';
session_start();

if (!isset($_SESSION['nom_utilisateur'])) {
    header("Location: Login/login.php");
    exit();
}

if (isset($_GET['id_partie'])) {
	$id_partie = $_GET['id_partie'];
	$id_joueur = $_SESSION['nom_utilisateur'];

	$sql="SELECT id_client FROM utilisateurs WHERE nom_utilisateur='$id_joueur'";
	$res=mysqli_query($bdd, $sql);
	$row=mysqli_fetch_assoc($res);
	$id=$row['id_client'];
	
	
	$sql = "SELECT nbr_joueurs FROM parties WHERE id_partie=$id_partie";
	$res = mysqli_query($bdd, $sql);
	$row = mysqli_fetch_assoc($res);
	$nb_joueurs=$row['nbr_joueurs'];
	$sql = "SELECT u.id_client, u.nom_utilisateur 
			FROM utilisateurs u
			JOIN jeu ON jeu.id_joueur = u.id_client
			WHERE jeu.id_partie = $id_partie
			ORDER BY jeu.id_joueur";

	$res = mysqli_query($bdd, $sql);
	$joueurs = [];
	while ($row = mysqli_fetch_assoc($res)) {
		$joueurs[] = $row;
	}
}


// TABLEAU DES JOUEURS

$stmt_count = $bdd->prepare("SELECT max_joueurs FROM parties WHERE id_partie = ?");
$stmt_count->bind_param("i", $id_partie);
$stmt_count->execute();
$result_count = $stmt_count->get_result();
$row_count = $result_count->fetch_assoc();
$playerCount = intval($row_count['max_joueurs']);

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Jeu, Set et Famille - Jeu</title>
    <meta charset="utf-8"/>
    <link rel="icon" href="images/logo.ico" type="image/x-icon">
    <link rel="stylesheet" href="style/game.css">
    <link href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,800&display=swap" rel="stylesheet">
    <script src="js/chat_bubble.js" defer></script>
	<script src="js/pioche.js" defer></script>
    <script src="js/gestion_cartes.js" defer></script>
    <script src="js/game_script.js" defer></script>
    <script>
		const monNom = <?php echo json_encode($_SESSION['nom_utilisateur']); ?>;
    </script>
     <link rel="stylesheet" href="style/fin_partie.css">
</head>

<body>
	<div class="loader_box">
	    <div class="loader_content">
			<p class="loader_text">Chargement des joueurs</p>
			<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
	    </div>
	</div>
	<div id="chat-container" class="chat-container"></div>



<main>
    <a href='ongoing_games.php?retour=<?php echo $id_partie; ?>&quit=<?php echo $id; ?>' id='retour'>&lt; Retour</a>
    <div id="wrapper_fin"></div>
	
	<div id="menu-cartes"></div>
	
    <div class="grid-layout">

        <?php if ($playerCount === 2): ?>
            <!-- Affichage pour 2 joueurs -->
            <div class="top-section">
                <div class="player-info" data-joueur="?" data-position="haut">
					<div class="profile-timer">
					  <svg class="progress-ring" width="80" height="80">
						<circle class="progress-ring__circle" stroke="green" stroke-width="5" fill="transparent" r="35" cx="40" cy="40"/>
					  </svg>
					  <img src="images/profil1.png" alt="Profil" class="profile-pic">
					</div>
					<div class="player-text">
						<span class="player-name">Joueur 1</span>
						<div class="family-count">
						  <span></span>
						</div>
				    </div>
					

				    <div class="cards1">
					    <div class="card1"></div>
					    <div class="card1"></div>
					    <div class="card1"></div>
					    <div class="card1"></div>
				    </div>
                </div>
            </div>
            <!-- Pioche -->
            <div class="middle-section">
                <div class="box">

                </div>
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
						
						<div class="card2" id="pioche-count">
							<span class="card-count">
							</span>
						</div>
					</div>
                </div>
                <div class="box">

                </div>
            </div>

        <?php elseif ($playerCount === 4): ?>
            <!-- Affichage pour 4 joueurs avec middle-section version 1 -->
            <div class="top-section">
                <div class="player-info" data-joueur="?" data-position="haut">
					<div class="profile-timer">
					  <svg class="progress-ring" width="80" height="80">
						<circle class="progress-ring__circle" stroke="green" stroke-width="5" fill="transparent" r="35" cx="40" cy="40"/>
					  </svg>
					  <img src="images/profil1.png" alt="Profil" class="profile-pic">
					</div>
					<div class="player-text">
						<span class="player-name">Joueur 1</span>
						<div class="family-count">
						  <span></span>
						</div>
					</div>
				  

				    <div class="cards1">
					    <div class="card1"></div>
					    <div class="card1"></div>
					    <div class="card1"></div>
					    <div class="card1"></div>
				    </div>
			    </div>
            </div>
            <div class="middle-section">
				<div class="box">
					<div class="player-info" data-joueur="?" data-position="gauche">
						<div class="profile-timer">
						  <svg class="progress-ring" width="80" height="80">
							<circle class="progress-ring__circle" stroke="green" stroke-width="5" fill="transparent" r="35" cx="40" cy="40"/>
						  </svg>
						  <img src="images/profil1.png" alt="Profil" class="profile-pic">
						</div>
						<div class="player-text">
							<span class="player-name">Joueur 1</span>
							<div class="family-count">
							  <span></span>
							</div>
						</div>

						<div class="cards1">
							<div class="card1"></div>
							<div class="card1"></div>
							<div class="card1"></div>
							<div class="card1"></div>
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
						<div class="card2" id="pioche-count">
						<span class="card-count"></span>
						</div>
					</div>
				</div>

          <!-- -->

				<div class="box right">
					<div class="player-info" data-joueur="?" data-position="droite">
					  
					  <div class="profile-timer">
						  <svg class="progress-ring" width="80" height="80">
							<circle class="progress-ring__circle" stroke="green" stroke-width="5" fill="transparent" r="35" cx="40" cy="40"/>
						  </svg>
						  <img src="images/profil1.png" alt="Profil" class="profile-pic">
						</div>
						
						<div class="player-text">
							<span class="player-name">Joueur 1</span>
							<div class="family-count">
							  <span></span>
							</div>
						</div>
						
						<div class="cards1">
						  <div class="card1"></div>
						  <div class="card1"></div>
						  <div class="card1"></div>
						  <div class="card1"></div>
					  </div>
				  
					</div>
				</div>
			</div>

        <?php elseif ($playerCount === 6): ?>
            <!-- Affichage pour 6 joueurs (middle-section complet) -->
            <div class="top-section">
                <div class="player-info" data-joueur="?" data-position="haut">
					<div class="profile-timer">
					  <svg class="progress-ring" width="80" height="80">
						<circle class="progress-ring__circle" stroke="green" stroke-width="5" fill="transparent" r="35" cx="40" cy="40"/>
					  </svg>
					  <img src="images/profil1.png" alt="Profil" class="profile-pic">
					</div>
					<div class="player-text">
						<span class="player-name">Joueur 1</span>
						<div class="family-count">
						  <span></span>
						</div>
					</div>
				  

					<div class="cards1">
						<div class="card1"></div>
						<div class="card1"></div>
						<div class="card1"></div>
						<div class="card1"></div>
					</div>
			    </div>
            </div>
			
			<div class="middle-section">
				<div class="box">
				<div class="two-player">
				
					<div class="player-info" data-joueur="?" data-position="gauche_h">
					  <div class="profile-timer">
						<svg class="progress-ring" width="80" height="80">
						  <circle class="progress-ring__circle" stroke="green" stroke-width="5" fill="transparent" r="35" cx="40" cy="40"/>
						</svg>
						<img src="images/profil1.png" alt="Profil" class="profile-pic">
					  </div>
					  <div class="player-text">
						<span class="player-name">Joueur 1</span>
						<div class="family-count">
						  <span></span>
						</div>
					  </div>

					  <div class="cards1">
						  <div class="card1"></div>
						  <div class="card1"></div>
						  <div class="card1"></div>
						  <div class="card1"></div>
					  </div>
					</div>

				    <div class="player-info" data-joueur="?" data-position="gauche_b">

					  <div class="profile-timer">
						<svg class="progress-ring" width="80" height="80">
						  <circle class="progress-ring__circle" stroke="green" stroke-width="5" fill="transparent" r="35" cx="40" cy="40"/>
						</svg>
						<img src="images/profil1.png" alt="Profil" class="profile-pic">
					  </div>
					  <div class="player-text">
						<span class="player-name">Joueur 1</span>
						<div class="family-count">
						  <span></span>
						</div>
					  </div>
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
						<div class="card2" id="pioche-count">
						<span class="card-count"></span>
						</div>
				  </div>
				</div>

			<!-- -->

				<div class="box">
				  <div class="two-player2">
					<div class="player-info" data-joueur="?" data-position="droite_h">
						
						<div class="profile-timer">
							<svg class="progress-ring" width="80" height="80">
							  <circle class="progress-ring__circle" stroke="green" stroke-width="5" fill="transparent" r="35" cx="40" cy="40"/>
							</svg>
							<img src="images/profil1.png" alt="Profil" class="profile-pic">
						</div>
					    <div class="player-text">
							<span class="player-name">Joueur 1</span>
							<div class="family-count">
								<span></span>
							</div>
						</div>
						
						<div class="cards1">
						  <div class="card1"></div>
						  <div class="card1"></div>
						  <div class="card1"></div>
						  <div class="card1"></div>
					    </div>

					</div>

					<div class="player-info" data-joueur="?" data-position="droite_b">

						<div class="profile-timer">
							<svg class="progress-ring" width="80" height="80">
							  <circle class="progress-ring__circle" stroke="green" stroke-width="5" fill="transparent" r="35" cx="40" cy="40"/>
							</svg>
							<img src="images/profil1.png" alt="Profil" class="profile-pic">
						</div>
						  <div class="player-text">
								<span class="player-name">Joueur 1</span>
								<div class="family-count">
									<span></span>
								</div>
						  </div>
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
        <?php endif; ?>

        <!-- Bas pour TOUS les cas (joueur principal) -->
        <div class="bottom-section">
            <div class="player-info" id="me" data-joueur="?">
                <div class="profile-timer">
                    <svg class="progress-ring" width="80" height="80">
                        <circle class="progress-ring__circle" stroke="green" stroke-width="5" fill="transparent" r="35" cx="40" cy="40"/>
                    </svg>
                    <img src="images/profil1.png" alt="Profil" class="profile-pic">
                </div>
                <div class="player-text">
					<span class="player-name">Moi</span>
					<div class="family-count">
					  <span></span>
					</div>
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

</body>
</html>
