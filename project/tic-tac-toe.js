/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require('prompt-sync')({sigint: true});
const assert = require('assert');

// The board object used to save the current status of a gameplay
let board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

// function to reset board;
function reset () {
    board = {
        1: ' ',
        2: ' ',
        3: ' ',
        4: ' ',
        5: ' ',
        6: ' ',
        7: ' ',
        8: ' ',
        9: ' '
    };
    currentTurnPlayer = 'X';
}

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
  if (validateMove(position)) {
    i = parseInt(position);
    board[i] = mark;
  }
}

// TODO: print the game board as described at the top of this code skeleton
// Will not be tested in Part 1
function printBoard() {
    const displayVal = Object.values(board).map((val, ind) => {
        if (val === ' ') {
            return ind + 1;
        } else {
            return val;
        }
    })
    console.log(` ${displayVal[0]} | ${displayVal[1]} | ${displayVal[2]} \n` +
                ` --------- \n` +
                ` ${displayVal[3]} | ${displayVal[4]} | ${displayVal[5]} \n` +
                ` --------- \n` +
                ` ${displayVal[6]} | ${displayVal[7]} | ${displayVal[8]} \n`);
}

// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String
function validateMove(position) {
    i = parseInt(position);
    if (isNaN(i) || i < 1 || i > 9) {
        return false;
    } else if (board[i] === 'X' || board[i] === 'O') {
        return false;
    }
    
    return true;
}

// A function to prompt input error to users
function promptError(input) {
    i = parseInt(input) 
    if (isNaN(i)) {
        console.log('Please enter a number!');
    } else if (board[i] === 'X' || board[i] === 'O') {
        console.log('The number you entered is occupied!');
    } else if (i < 1 || i > 9) {
        console.log('Please enter a number between 1 and 9!');
    }
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], 
    [1, 4, 7], [2, 5, 8], [3, 6, 9], 
    [1, 5, 9], [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
  for (const combo of winCombinations) {
    const map = combo.map((i) => board[i]);
    let bool = map.every((mark) => mark === player);
    if (bool) {
      return bool;
    }
  }
  return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
  const boardVals = Object.values(board);
  return boardVals.every((mark) => mark === 'X' || mark === 'O');
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let position = askPlayer(player);
    markBoard(position, player);
}

// function to ask player for input; returns integer
function askPlayer(player) {
    let input = 'wrong'
    while (!validateMove(input)) {
        input = prompt(`${player}, enter the position you want to play: `);
        console.log('\n');
        if (validateMove(input)) {
            return input;
        } else {
            promptError(input);
        }
    }
}

// entry point of the whole program
let currentTurnPlayer = 'X'
let playing = true;

while (playing) {
    reset();
    console.log('Game started: \n\n');
    printBoard();

    while (true){
        playTurn(currentTurnPlayer);
        // feel free to add logic here if needed, e.g. announcing winner or tie
        printBoard();
        if (gameOver()) {
            break;
        }
        nextPlayer();
    }

    let input = prompt('Wanna play again? y/n: ');
    if (input != 'y') {
        console.log('Thanks for playing!');
        playing = false;
    }
}

// function to switch player
function nextPlayer() {
    if (currentTurnPlayer === 'X') {
        currentTurnPlayer = 'O'
    } else {
        currentTurnPlayer = 'X'
    }
}

// function to determine endgame
function gameOver() {
    if (checkWin(currentTurnPlayer)) {
        console.log(`${currentTurnPlayer} wins!`);
        return true;
    } else if (checkFull()) {
        console.log('Nobody wins.')
        return true;
    }
}

// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
