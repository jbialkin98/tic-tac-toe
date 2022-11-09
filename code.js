let gameBoard = () => {
    let gameArray = [];
    let createArray = () => {
        for (let i = 0; i < 9; i++) {
            gameArray.push(null);
        }
        console.log(gameArray);
    }
    return {createArray};
}

let board = gameBoard();

board.createArray();