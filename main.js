window.addEventListener("DOMContentLoaded", () => {
    const boardCell = Array.from(document.querySelectorAll(".cell"));

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let isGameActive = true;

    const winningPositions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function isEmptyCell(cell) {
        if(cell.innerText === "X" || cell.innerText === "O") {
          return false;
        }
        return true;
    }

    function changePlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    function isWon() {
        let win = false;
    
        for(let i = 0; i <= 7; i++) {
          const winPosition = winningPositions[i];
          const a = board[winPosition[0]];
          const b = board[winPosition[1]];
          const c = board[winPosition[2]];
    
          if(a === "" || b === "" || c === "") {
            continue;
          }
          if(a === b && b === c) {
            win = true;
            alert(`Player ${currentPlayer} win!`);
            isGameActive = false;
            break;
          }
        }
    }

    function userAction(cell, i) {
        if(isEmptyCell(cell) && isGameActive) {
          cell.innerText = currentPlayer;
          board[i] = currentPlayer;
          isWon();
          changePlayer();
        }
    }
    
    boardCell.forEach((cell, i) => {
        cell.addEventListener("click", () => userAction(cell, i));
    })
});