function showChatBubble(message, duration) {
  const container = document.getElementById('chat-container');
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.textContent = message;
  container.appendChild(bubble);
  

  //lance l'animation
  requestAnimationFrame(() => {
    bubble.style.opacity = '1';
  });

  setTimeout(() => {
    bubble.style.animation = 'fadeOut 0.5s ease forwards';

    bubble.addEventListener('animationend', () => {
      bubble.remove();
    }, { once: true });

  }, duration);
}


window.addEventListener("load", () => {
	showChatBubble("Bienvenue ! La partie va commencer !", 3000);
});
