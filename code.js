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
    let deleteArray = () => {
        for (let i = 0; i < gameArray.length; i++) {
            gameArray[i] = null;
        }
    }
    return {createArray, deleteArray, gameArray};
})();

gameBoard.createArray();

let drawGameBoard = (() => {
    let container = document.querySelector('.container');
    let create = () => {
        let gameArray = gameBoard.gameArray;
        for (let i = 0; i < gameArray.length; i++) {
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
    
    let clickedCell = () => {
        const gridCell = document.querySelectorAll('.gridCell');
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
    let resetTurnNumber = () => {
        turnNumber = 0;
    }
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
    return {playTurn, resetTurnNumber, turnNumber}
})();

let checkTurn = (() => {
    let gameArray = gameBoard.gameArray;
    let checkForWinner = () => {
        for (let i = 0; i < 3; i++) {
            if (gameArray[i] == null) {
                continue;
            }
            if ((gameArray[i] == gameArray[i + 3] && gameArray[i + 3] == gameArray[i + 6]) ||
                // check for vertical win
                (gameArray[i] == gameArray[i + 4] && gameArray[i + 4] == gameArray[i + 8]) ||
                // check for diagonal right win
                (gameArray[i] == gameArray[i + 2] && gameArray[i + 2] == gameArray[i + 4])) {
                // check for diagonal left win
                winner.matchWon();
            }
        }
        
        for (let j = 0; j <= 6; j = j + 3) {
            if (gameArray[j] == null) {
                continue;
            }
            if (gameArray[j] == gameArray[j + 1] && gameArray[j + 1] == gameArray[j + 2]) {
                // check for horizontal win
                winner.matchWon();
            }
        }
    }
    return {checkForWinner}
})();

let clearBoard = (() => {
    let startOver = document.querySelector('.startOver');
    startOver.addEventListener('click', () => {
        deleteGameArray();
        deleteGrid();
        drawGameBoard.create(); 
        cellClicked.clickedCell();
        playGame.resetTurnNumber();
    });
    let deleteGrid = () => {
        let existingDivs = document.querySelectorAll('.gridCell');
        for (let i = 0; i < existingDivs.length; i++) {
            existingDivs[i].remove();
        }
    }
    let deleteGameArray = () => {
        gameBoard.deleteArray();
    }
})();

let winner = (() => {
    let matchWon = () => {
        let winnerPopUp = document.querySelector('.matchResults');
        let overlay = document.querySelector('.overlay');
        winnerPopUp.classList.add('active');
        overlay.classList.add('active');
    }
    return {matchWon};
})();