<?php
	session_start();
	$is_connected=(!isset($_SESSION['nom_utilisateur']));
?>


<button onclick='handle_play_button'>Jouer</button>

<script>
	function handle_play_button() {
		<?php if (!$isConnected): ?>
			window.location.href = "login.php";
		<?php else: ?>
			window.location.href = "create.php";
		<?php endif; ?>
	}
</script>
