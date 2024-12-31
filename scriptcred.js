document.getElementById('startButton').addEventListener('click', function() {
    const gameArea = document.getElementById('gameArea');
    const dinoGame = document.getElementById('dinoGame');
    gameArea.style.display = 'block'; // Show the game area
    dinoGame.src = 'https://chromedino.com/'; // Load the Dino game
});