window.addEventListener("load", () => {
 
function showChatBubble(message, duration) {
  const bubble = document.getElementById('chat-bubble');
  const text = bubble.querySelector('.chat-text');
  
  text.textContent = message;
  bubble.style.display = 'block';
  
  if (duration) {
    setTimeout(() => {
      bubble.style.display = 'none';
    }, duration);
  }
}

showChatBubble("Bienvenue ! La partie va commencer !", 5000);
});
