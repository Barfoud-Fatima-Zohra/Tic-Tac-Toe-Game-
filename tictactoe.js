const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('resetButton');
const lineElement = document.getElementById('line');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

resetButton.addEventListener('click', resetGame);

function renderBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.innerText = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (board[index] === '' && currentPlayer === 'X' && !gameOver) {
        board[index] = 'X';
        currentPlayer = 'O';
        renderBoard();
        if (checkWin(board, 'X')) {
            endGame('Humain', checkWin(board, 'X'));
        } else if (isBoardFull(board)) {
            endGame('Personne'); // Draw
        } else {
            setTimeout(() => {
                let bestMove = getBestMove(board);
                board[bestMove] = 'O';
                currentPlayer = 'X';
                renderBoard();
                if (checkWin(board, 'O')) {
                    endGame('Robot', checkWin(board, 'O'));
                } else if (isBoardFull(board)) {
                    endGame('Personne'); // Draw
                }
            }, 500); // Délai de 500 ms avant que le robot joue
        }
    }
}

function checkWin(board, player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let pattern of winPatterns) {
        if (pattern.every(index => board[index] === player)) {
            return pattern; // Return the winning pattern
        }
    }
    return null;
}

function isBoardFull(board) {
    return board.every(cell => cell !== '');
}

function getBestMove(board) {
    let bestScore = -Infinity;
    let move;

    board.forEach((cell, index) => {
        if (cell === '') {
            board[index] = 'O';
            let score = minimax(board, 0, false);
            board[index] = '';
            if (score > bestScore) {
                bestScore = score;
                move = index;
            }
        }
    });

    return move;
}

function minimax(board, depth, isMaximizing) {
    if (checkWin(board, 'O')) return 10 - depth;
    if (checkWin(board, 'X')) return depth - 10;
    if (isBoardFull(board)) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        board.forEach((cell, index) => {
            if (cell === '') {
                board[index] = 'O';
                let score = minimax(board, depth + 1, false);
                board[index] = '';
                bestScore = Math.max(score, bestScore);
            }
        });
        return bestScore;
    } else {
        let bestScore = Infinity;
        board.forEach((cell, index) => {
            if (cell === '') {
                board[index] = 'X';
                let score = minimax(board, depth + 1, true);
                board[index] = '';
                bestScore = Math.min(score, bestScore);
            }
        });
        return bestScore;
    }
}

function endGame(winner, winPattern = null) {
    gameOver = true;
    if (winner === 'Personne') {
        messageElement.innerText = "It's a draw!";
    } else if (winner === 'Humain') {
        messageElement.innerHTML = `<div class="success">
            <div class="success__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path></svg>
            </div>
            <div class="success__title">Human won! </div>
            <div class="success__close"><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20"><path fill="#393a37" d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"></path></svg></div>
        </div>`;
    } else if (winner === 'Robot') {
        messageElement.innerHTML = `<div class="error">
            <div class="error__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path></svg>
            </div>
            <div class="error__title">Robot won!</div>
            <div class="error__close"><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20"><path fill="#393a37" d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"></path></svg></div>
        </div>`;
    }
    if (winPattern) {
        drawWinningLine(winPattern);
    }
}

function drawWinningLine(pattern) {
    const lines = [
        { transform: 'translateY(50px) rotate(0deg)', width: '300px' },  // Row 1
        { transform: 'translateY(150px) rotate(0deg)', width: '300px' }, // Row 2
        { transform: 'translateY(250px) rotate(0deg)', width: '300px' }, // Row 3
        { transform: 'translateX(50px) rotate(90deg)', width: '300px' }, // Column 1
        { transform: 'translateX(150px) rotate(90deg)', width: '300px' }, // Column 2
        { transform: 'translateX(250px) rotate(90deg)', width: '300px' }, // Column 3
        { transform: 'translate(0px, 0px) rotate(45deg)', width: '424px' }, // Diagonal 1
        { transform: 'translate(0px, 300px) rotate(-45deg)', width: '424px' } // Diagonal 2
    ];

    const index = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ].findIndex(p => p.every((val, i) => val === pattern[i]));

    Object.assign(lineElement.style, lines[index], { display: 'block' });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    messageElement.innerText = '';
    lineElement.style.display = 'none';
    renderBoard();
}

renderBoard();
