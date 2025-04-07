document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.querySelector(".jeu .text");
    
    const messages = [
        "Bienvenue sur Jeu, Set et Famille !",
        "Préparez-vous à une partie pleine de surprises...",
        "Voulez-vous commencer une nouvelle partie ?",
    ];
    
    let index = 0;
    
    function addMessage() {
        if (index < messages.length) {
            const messageBubble = document.createElement("div");
            messageBubble.classList.add("chat-bubble");
            messageBubble.textContent = messages[index];
            chatContainer.appendChild(messageBubble);
            
            setTimeout(() => {
                messageBubble.classList.add("visible");
            }, 100);
            
            index++;
            setTimeout(addMessage, 2000);
        } else {
            setTimeout(addButton, 500); 
        }
    }

    function addButton() {
        const button = document.createElement("button");
        button.textContent = "Jouer";
        button.classList.add("play-button");
        button.onclick = handle_play_button;

        chatContainer.appendChild(button);

        
        setTimeout(() => {
            button.classList.add("visible");
        }, 100);
    }
    
    addMessage();

    const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("click", (e) => e.target.className.includes("card")? e.target.classList.toggle("selected") : e.target.closest(".card").classList.toggle("selected"));
});

});


