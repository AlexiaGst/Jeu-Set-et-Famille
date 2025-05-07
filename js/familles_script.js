var familles={
	combat: [
	"images/boxe.png",
	"images/judo.png",
	"images/karate.png",
	"images/taekwondo.png",
	"images/lutte.png",
	"images/mma.png"
  ],
	aquatique: [
	"images/natation.png",
	"images/wakeboard.png",
	"images/surf.png",
	"images/waterpolo.png",
	"images/kitesurf.png",
	"images/aviron.png"
  ],
	mobilité: [
	"images/vtt.png",
	"images/roller.png",
	"images/skateboard.png",
	"images/trottinette.png",
	"images/cyclisme.png",
	"images/monocycle.png"
  ],
	aventure: [
	"images/escalade.png",
	"images/randonnee.png",
	"images/slackline.png",
	"images/trail.png",
	"images/alpinisme.png",
	"images/parapente.png"
  ],
	hiver: [
	"images/snowboard.png",
	"images/patinage.png",
	"images/hockey.png",
	"images/ski.png",
	"images/bobsleigh.png",
	"images/curling.png"
  ],
	précision: [
	"images/arc.png",
	"images/golf.png",
	"images/petanque.png",
	"images/flechettes.png",
	"images/bowling.png",
	"images/javelot.png"
  ],
	ballons: [
	"images/basket.png",
	"images/tennis.png",
	"images/football.png",
	"images/rugby.png",
	"images/volleyball.png",
	"images/baseball.png"
  ]
}

const zone = document.getElementById("cartes");

Object.entries(familles).forEach(([famille, cartes]) => {//Affiche les cartes par familles
	const fam = document.createElement("div");
	fam.className = "family";
	fam.setAttribute("id", famille);
	zone.appendChild(fam);
	
	const txt=document.createElement("p");
	txt.textContent = famille.charAt(0).toUpperCase() + famille.slice(1);
	fam.appendChild(txt);
	
	cartes.forEach(carte=>{
		const img = document.createElement("img");
		img.className = "carte";
		img.setAttribute("id", carte.slice(7, -4));
		img.src = carte;
		img.alt=carte.slice(7, -4);
		fam.appendChild(img);
	});
});