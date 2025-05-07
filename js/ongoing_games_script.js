function showPublicGames() {
	document.getElementById("public").style.display = "block";
	document.getElementById("private").style.display = "none";
	document.getElementById("btn").style.left = "0";
}

function showPrivateGames() {
	document.getElementById("public").style.display = "none";
	document.getElementById("private").style.display = "block";
	document.getElementById("btn").style.left = "300px";
}