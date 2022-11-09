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
        for (let i = 0; i < boardArray.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.classList.add('gridCell');
            newDiv.setAttribute('id', `${i}`);
            container.appendChild(newDiv);
        }
    }
    return {create};
})();

drawGameBoard.create();

let cellClicked = (() => {
    const gridCell = document.querySelectorAll('.gridCell');
    let clickedCell = () => {
        gridCell.forEach(gridCell => gridCell.addEventListener('click', () => {
            playGame.playTurn(gridCell);
        }));
    }
    return {clickedCell};
})();

cellClicked.clickedCell();

let playGame = (() => {
    let turnNumber = 0;
    let gameArray = gameBoard.gameArray;
    let playTurn = (gridCell) => {
        let index = gridCell.id;
        if (gridCell.textContent != '') {
            return;
        }
        if (turnNumber % 2 == 0) {
            gridCell.textContent = 'X';
            gameArray.splice(index, 1, 'X');
        } else {
            gridCell.textContent = 'O';
            gameArray.splice(index, 1, 'O');
        }
        turnNumber++;
    }
    return {playTurn, turnNumber}
})();