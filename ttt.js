// TODO: case when board is full and no one wins

"use strict";
let title = document.querySelector("h1");
title.textContent = "TTT by SimonRhe";

let squares = document.querySelectorAll(".square");
let board = undefined;

// let gameStatus = "init";
let whoseTurn = "x";

const clearSelection = () => {
    if (window.getSelection) {window.getSelection().removeAllRanges();}
    else if (document.selection) {document.selection.empty();}
}

const checkWin = () => {
    // check rows
    for (let r = 0; r < 3; r++) {
        if (board[r][0] != '.' && board[r][0] == board[r][1] && board[r][0] == board[r][2]) {
            console.log(board[r][0] + " wins on row " + r);
            return board[r][0]; // winner
        }
    }

    // check columns
    for (let c = 0; c < 3; c++) {
        if (board[0][c] != '.' && board[0][c] == board[1][c] && board[0][c] == board[2][c]) {
            console.log(board[0][c] + " wins on column " + c);
            return board[0][c]; // winner
        }
    }

    // check diagonals
    if (board[0][0] != '.' && board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
        console.log(board[0][0] + " wins on diagonal left to right");
        return board[0][0]; // winner
    }    
    if (board[0][2] != '.' && board[0][2] == board[1][1] && board[0][2] == board[2][0]) {
        console.log(board[0][2] + " wins on diagonal right to left");
        return board[0][2]; // winner
    }
    
    return ""; // if no winner
}

const squareClicked = (s) => {
    console.log("s: " + s + "; id: " + s.id);
    if (board[s.id[0]][s.id[1]] != ".") { // if square already clicked
        return;
    }
    if (whoseTurn == "x") {
        s.textContent = "X";
        whoseTurn = "o";
        board[s.id[0]][s.id[1]] = "x";
    }
    else {
        s.textContent = "O";
        whoseTurn = "x";
        board[s.id[0]][s.id[1]] = "o";
    }
    s.setAttribute('class', 'square played');   
    clearSelection(); // workaround since X/O was selected after click 
    console.log("board: " + board);
    let winner = checkWin();
    if (winner != "") {
        window.alert(winner.toUpperCase() + " wins!");
        clearGrid();
    }
}

const clearGrid = () => {
    for (let s of squares) {
        s.textContent = ""; 
        s.setAttribute('class', 'square unplayed');
    }  
    board = [ ['.', '.', '.'], 
              ['.', '.', '.'],
              ['.', '.', '.'] ];
    whoseTurn = "x";
}

// initial grid set up
clearGrid();
for (let s of squares) {
    s.onclick = function() {squareClicked(s);};
}   



