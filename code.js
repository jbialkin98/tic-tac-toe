const player = (name, symbol, score) => {
    return {name, symbol, score};
}

const playerOne = player('Player One', 'X', 0);
const playerTwo = player('Player Two', 'O', 0);

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

let updateScoreDisplay = (() => {
    let playerOneScore = document.querySelector('.playerOneScoreNumber');
    let playerTwoScore = document.querySelector('.playerTwoScoreNumber');

    let showScores = () => {
        playerOneScore.textContent = `${playerOne.score}`;
        playerTwoScore.textContent = `${playerTwo.score}`;
    }

    return {showScores};
})();

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
        let playerOneLabel = document.querySelector('.playerOneName');
        playerOneLabel.classList.add('active');

        updateScoreDisplay.showScores();
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
    let playerOneLabel = document.querySelector('.playerOneName');
    let playerTwoLabel = document.querySelector('.playerTwoName');
    let resetTurnNumber = () => {
        turnNumber = 0;
    }
    let playTurn = (gridCell) => {
        let player;
        let index = gridCell.id;
        if (gridCell.textContent != '') {
            return;
        }
        if (turnNumber % 2 == 0) {
            gridCell.innerHTML = '&#10005;';
            gameArray.splice(index, 1, 'X');
            player = playerOne;
            playerOneLabel.classList.remove('active');
            playerTwoLabel.classList.add('active');
        } else {
            gridCell.innerHTML = '&#11096;';
            gameArray.splice(index, 1, 'O');
            player = playerTwo;
            playerTwoLabel.classList.remove('active');
            playerOneLabel.classList.add('active');
        }
        turnNumber++;
        checkTurn.checkForWinner(player);
    }
    return {playTurn, resetTurnNumber, turnNumber}
})();

let checkTurn = (() => {
    let gameArray = gameBoard.gameArray;
    let checkForWinner = (player) => {
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
                winner.matchWon(player);
            }
        }
        
        for (let j = 0; j <= 6; j = j + 3) {
            if (gameArray[j] == null) {
                continue;
            }
            if (gameArray[j] == gameArray[j + 1] && gameArray[j + 1] == gameArray[j + 2]) {
                // check for horizontal win
                winner.matchWon(player);
            }
        }
    }
    return {checkForWinner}
})();

let clearBoard = (() => {
    let startOver = document.querySelector('.startOver');
    startOver.addEventListener('click', () => {
        restartGame();
    });
    let restartGame = () => {
        deleteGameArray();
        deleteGrid();
        drawGameBoard.create(); 
        cellClicked.clickedCell();
        playGame.resetTurnNumber();
    }
    let deleteGrid = () => {
        let existingDivs = document.querySelectorAll('.gridCell');
        for (let i = 0; i < existingDivs.length; i++) {
            existingDivs[i].remove();
        }
    }
    let deleteGameArray = () => {
        gameBoard.deleteArray();
    }
    return {restartGame};
})();

let winner = (() => {
    let matchWon = (player) => {
        let winnerPopUp = document.querySelector('.matchResults');
        let winner = document.querySelector('.winner');
        let overlay = document.querySelector('.overlay');
        let playerOneLabel = document.querySelector('.playerOneName');
        let playerTwoLabel = document.querySelector('.playerTwoName');
        playerOneLabel.classList.remove('active');
        playerTwoLabel.classList.remove('active');
        winnerPopUp.classList.add('active');
        overlay.classList.add('active');

        winner.textContent = `${player.name} won!`;
        player.score += 1;
        updateScoreDisplay.showScores();

        let playAgain = document.querySelector('.playAgain');
        playAgain.addEventListener('click', () => {
            clearBoard.restartGame();
            winnerPopUp.classList.remove('active');
        overlay.classList.remove('active');
        });
    }
    return {matchWon};
})();

