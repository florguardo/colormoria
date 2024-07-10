const startButton = document.getElementById('start-button');
const gameBoard = document.getElementById('game-board');
const levelTitle = document.getElementById('level-title');
const result = document.getElementById('result');
const restartButton = document.getElementById('restart-button');

const colors = [
    { name: 'ROJO', code: '#ed1c09' },
    { name: 'NARANJA', code: '#ed4209' },
    { name: 'AMARILLO', code: '#f5d90a' },
    { name: 'VERDE', code: '#71bd0f' },
    { name: 'AZUL', code: '#0f2fbd' },
    { name: 'VIOLETA', code: '#7a0fbd' },
    { name: 'ROSA', code: '#e30eae' },
    { name: 'CELESTE', code: '#71e5eb' }
];
let level = 1;
let selectedColor = '';
let timeout;

function startGame() {
    levelTitle.textContent = `${level}er nivel`;
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${level + 1}, 50px)`;
    gameBoard.style.gridTemplateRows = `repeat(${level + 1}, 50px)`;

    const colorSquares = [];
    for (let i = 0; i < (level + 1) ** 2; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        const color = colors[Math.floor(Math.random() * colors.length)];
        square.style.backgroundColor = color.code;
        colorSquares.push({ square, color: color.name });
        gameBoard.appendChild(square);
    }

    setTimeout(() => {
        colorSquares.forEach(({ square }) => {
            square.style.backgroundColor = 'white';
            square.onclick = () => checkColor(square, colorSquares);
        });

        selectedColor = colorSquares[Math.floor(Math.random() * colorSquares.length)].color;
        result.textContent = `Selecciona el cuadrado de color ${selectedColor}`;
        timeout = setTimeout(() => {
            endGame('Perdiste, vuelve a empezar');
        }, 5000);
    }, 2000);
}

function checkColor(square, colorSquares) {
    clearTimeout(timeout);
    if (square.style.backgroundColor === 'white') {
        if (selectedColor === colorSquares.find(cs => cs.square === square).color) {
            level++;
            if (level > 10) {
                result.textContent = '¡Ganaste el juego!';
                restartButton.style.display = 'block';
            } else {
                result.textContent = '';
                startGame();
            }
        } else {
            endGame('Perdiste, vuelve a empezar');
        }
    }
}

function endGame(message) {
    result.textContent = message;
    restartButton.style.display = 'block';
}

startButton.onclick = () => {
    startButton.style.display = 'none';
    level = 1;
    result.textContent = '';
    startGame();
};

restartButton.onclick = () => {
    restartButton.style.display = 'none';
    result.textContent = '';
    startButton.style.display = 'block';
    levelTitle.textContent = '';
    gameBoard.innerHTML = '';
};
