function startTimer(duration, circle) {
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
  
    let start = Date.now();
    let end = start + duration;
  
    function update() {
      const now = Date.now();
      const timeLeft = Math.max(0, end - now);
      const percent = timeLeft / duration;
      const offset = circumference * (1 - percent);
      circle.style.strokeDashoffset = offset;
  
      if (percent > 0.5) {
        circle.setAttribute("stroke", "green");
      } else if (percent > 0.2) {
        circle.setAttribute("stroke", "orange");
      } else {
        circle.setAttribute("stroke", "red");
      }
  
      if (timeLeft > 0) {
        requestAnimationFrame(update);
      }
    }
  
    update();
  }
  


  const joueurs = [
    { nom: "Joueur 1" },
    { nom: "Joueur 2" },
    { nom: "Joueur 3" },
    { nom: "Joueur 4" }
  ];
  
  const totalImages = 4; 
  
  function randomProfileImage() {
    const num = Math.floor(Math.random() * totalImages) + 1;
    return `images/profil${num}.png`;
  }
  
  function createPlayerElement(joueur) {
    const div = document.createElement("div");
    div.className = "player-info";
    div.innerHTML = `
      <div class="profile-timer">
        <svg class="progress-ring" width="80" height="80">
          <circle class="progress-ring__circle" stroke="green" stroke-width="5" fill="transparent" r="35" cx="40" cy="40"/>
        </svg>
        <img src="${randomProfileImage()}" alt="Profil" class="profile-pic">
      </div>
      <span class="player-name">${joueur.nom}</span>
    `;
    return div;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("player-info");
  
    joueurs.forEach(joueur => {
      const playerEl = createPlayerElement(joueur);
      container.appendChild(playerEl);
  
      // Démarrer le timer pour ce joueur
      const circle = playerEl.querySelector(".progress-ring__circle");
      startTimer(10000, circle); // 10s pour test
    });
  });
  
