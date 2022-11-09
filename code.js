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
    let test = () => {
        gameBoard.createArray();
        let boardArray = gameBoard.gameArray;
        console.log(boardArray);
        for (let i = 0; i < boardArray.length; i++) {
            let newDiv = document.createElement('div');
            newDiv.classList.add('newDiv');
            newDiv.textContent = 'Test';
            container.appendChild(newDiv);
        }
    }
    return {test};
})();

drawGameBoard.test();
