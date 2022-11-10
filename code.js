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
            gridCell.innerHTML = '&#10005;';
            gameArray.splice(index, 1, 'X');
        } else {
            gridCell.innerHTML = '&#11096;';
            gameArray.splice(index, 1, 'O');
        }
        turnNumber++;
        checkTurn.checkForWinner();
    }
    return {playTurn, turnNumber}
})();

let checkTurn = (() => {
    let gameArray = gameBoard.gameArray;
    let checkForWinner = () => {
        for (let i = 0; i < 3; i++) {
            if (gameArray[i] == null) {
                continue;
            }
            if (gameArray[i] == gameArray[i + 3] && gameArray[i + 3] == gameArray[i + 6]) {
                console.log("winner: vertical");
                // check for vertical win
            } else if (gameArray[i] == gameArray[i + 4] && gameArray[i + 4] == gameArray[i + 8]) {
                console.log("winner: diag right")
                // check for diagonal right win
            } else if (gameArray[i] == gameArray[i + 2] && gameArray[i + 2] == gameArray[i + 4]) {
                console.log("winner: diag left")
                // check for diagonal left win
            }
        }
        // check for horizontal win
        for (let j = 0; j <= 6; j = j + 3) {
            if (gameArray[j] == null) {
                continue;
            }
            if (gameArray[j] == gameArray[j + 1] && gameArray[j + 1] == gameArray[j + 2]) {
                console.log("winner: horizontal");
            }
        }
    }
    return {checkForWinner}
})();