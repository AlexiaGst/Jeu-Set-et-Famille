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
        }
    }
    
    addMessage();
});
