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
            newDiv.textContent = 'Test';
            container.appendChild(newDiv);
        }
    }
    return {create};
})();

drawGameBoard.create();

const gridCell = document.querySelectorAll('.gridCell');
gridCell.forEach(gridCell => gridCell.addEventListener('click', () => {
    gridCell.textContent = 'X';
}));