window.addEventListener("DOMContentLoaded", () => {
  const boardCell = Array.from(document.querySelectorAll(".cell"));
  let board = ["", "", "", "", "", "", "", "", ""];
  const form = document.querySelector("#info");

  class TicTacToe{
      constructor(currentPlayer, isGameActive, playerX, playerO) {
          this._currentPlayer = currentPlayer;
          this._isGameActive = isGameActive;
          this._playerX = playerX;
          this._playerO = playerO;
      }
      isEmptyCell(cell) {
          if(cell.innerText === "X" || cell.innerText === "O") {
              return false;
          }
          return true;
      }
      changePlayer() {
          this._currentPlayer = this._currentPlayer === "X" ? "O" : "X";
      }
      isWon() {
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
          const winner = document.querySelector(".winner");

          for(let i = 0; i <= 7; i++) {
              const winPosition = winningPositions[i];
              const _a = board[winPosition[0]];
              const _b = board[winPosition[1]];
              const _c = board[winPosition[2]];
          
              if(_a === "" || _b === "" || _c === "") {
                  continue;
              }
              if(_a === _b && _b === _c) {
                  this._isGameActive = false;
                  form.classList.add("board-winner");
                  winner.innerText = `Player ${this._currentPlayer} win!`;
                  this.playersPoints();
                  this.newGame();
                  break;
              }
          }
          if(!board.includes("") && this._isGameActive) {
              form.classList.add("board-winner");
              winner.innerText = `Match!`;
              this.newGame();
          }
      }
      userAction(cell, i) {
          if(this.isEmptyCell(cell) && this._isGameActive){
              cell.innerText = this._currentPlayer;
              board[i] = this._currentPlayer;
              this.isWon();
              this.changePlayer();
          }
      }
      playersPoints() {
          const playerX = document.querySelector(".player-x");
          const playerO = document.querySelector(".player-o");

          if(this._currentPlayer === "X") {
              this._playerX += 1;
              playerX.innerText = ` X / ${this._playerX} `;
          } else{
              this._playerO += 1;
              playerO.innerText = ` O / ${this._playerO} `;
          }
      }
      newGame() {
          const btn = document.querySelector("#button");

          btn.addEventListener("click", () => {
              form.classList.remove("board-winner");  
              board = ["", "", "", "", "", "", "", "", ""];
              this._isGameActive = true;

              if(this._currentPlayer === "O") {
                  this.changePlayer();
              }

              boardCell.forEach(cell => {
                  cell.innerText = "";
              })
          });
      }
  }

  const game = new TicTacToe("X", true, 0, 0);

  boardCell.forEach((cell, i) => {
      cell.addEventListener("click", () => game.userAction(cell, i));
  });
});