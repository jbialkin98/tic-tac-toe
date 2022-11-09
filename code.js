const player = (name, symbol) => {
    return {name, symbol};
}

const playerOne = player('Player One', 'X');
const playerTwo = player('Player Two', 'O');

let gameBoard = (() => {
    let gameArray = [];
    let createArray = () => {
        for (let i = 0; i < 9; i++) {
            gameArray.push(null);
        }
    }
    return {createArray, gameArray};
})();

let drawGameBoard = (() => {
    let container = document.querySelector('.container');
    let create = () => {
        gameBoard.createArray();
        let boardArray = gameBoard.gameArray;
        console.log(boardArray);
        for (let i = 0; i < boardArray.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.classList.add('gridCell');
            container.appendChild(newDiv);
        }
    }
    return {create};
})();

drawGameBoard.create();

const gridCell = document.querySelectorAll('.gridCell');
gridCell.forEach(gridCell => gridCell.addEventListener('click', () => {
    playGame.playTurn(gridCell);
}));

let playGame = (() => {
    let turnNumber = 0;
    let playTurn = (gridCell) => {
        if (turnNumber % 2 == 0) {
            gridCell.textContent = 'X';
        } else {
            gridCell.textContent = 'O';
        }
        turnNumber++;
    }
    return {playTurn, turnNumber}
})();