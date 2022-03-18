const Player = (name, side) => {
    const mark = (grid) => {
        const board = gameBoard;
        // console.log('mark' + board);
        if (board[grid] === '') {
            board[grid] = side;
            return [board, 1];
        }
        else {
            return [board, 0];
        }
    };
    return {name, side, mark};
};

const gameboard = (() => {
    let player1 = Player('Player X', 'X');
    let player2 = Player('Player O', 'O');
    const render = (board) => {
        const boardDiv = document.querySelector('#board');
        let i = 0;
        board.forEach(grid => {
            const gridDiv = document.createElement('div');
            gridDiv.className = 'grid';
            gridDiv.id = i;
            i++;
            gridDiv.appendChild(document.createTextNode(grid));
            boardDiv.appendChild(gridDiv);
        });
    };
    const _delete = () => {
        const boardDiv = document.querySelector('#board');
        while (boardDiv.hasChildNodes()) {
            boardDiv.removeChild(boardDiv.firstChild);
        };
        const announcementDiv = document.querySelector('#announcement');
        while (announcementDiv.textContent) {
            announcementDiv.textContent = '';
        };
    };
    const update = (board) => {
        // console.log('update' + gameBoard);
        _delete();
        render(board[0]);
        // console.log(gameFlow.round);
    };
    const initialize = () => {
        _delete();
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        round = 0;
        // console.log('initialize' + gameBoard);
        render(gameBoard);
    };
    return {player1, player2, render, update, initialize};
})();

const gameFlow = (() => {
    const tieDOM = () => {
        gridDivs = document.querySelectorAll('.grid');
        if (round === 9) {
            _announceTie();
        };
        gridDivs.forEach(gridDiv => {
            gridDiv.addEventListener('click', () => {
                if (round % 2 === 0) {
                    const result = gameboard.player1.mark(gridDiv.id);
                    gameboard.update(result);
                    round += result[1];
                    if (_checkWin(gameboard.player1.side)) {
                        _announceWinner(gameboard.player1);
                    } else {
                        tieDOM();
                    };
                } else {
                    const result = gameboard.player2.mark(gridDiv.id);
                    gameboard.update(result);
                    round += result[1];
                    if (_checkWin(gameboard.player2.side)) {
                        _announceWinner(gameboard.player2);
                    } else {
                        tieDOM();
                    };
                };
            })
        })
    };
    const _checkWin = (player) => {
        board = gameBoard;
        const vertical = [0, 3, 6].map(i => {return [i, i+1, i+2]});
        const horizontal = [0, 1, 2].map(i => {return [i, i+3, i+6]});
        const diagonal = [[0, 4, 8], [2, 4, 6]];
        let winCases = [].concat(vertical).concat(horizontal).concat(diagonal);
        let result = winCases.some(indices => {
            return board[indices[0]] === player && board[indices[1]] === player && board[indices[2]] === player;
        })
        return result;
    };
    const _announceWinner = (player) => {
        // console.log(gameBoard);
        const announcementDiv = document.getElementById('announcement');
        announcementDiv.appendChild(document.createTextNode(`${player.name} wins!`));
    };
    const _announceTie = () => {
        const announcementDiv = document.getElementById('announcement');
        announcementDiv.appendChild(document.createTextNode(`It's a tie!`));
    };
    const detectAI = () => {
        console.log(document.querySelector('.btn-AI').id === 'AIon');
        return document.querySelector('.btn-AI').id === 'AIon';
    };
    const vsAI = () => {
        gridDivs = document.querySelectorAll('.grid');
        if (round === 9) {
            _announceTie();
        } else {
            if (round % 2 === 0) {
                gridDivs.forEach(gridDiv => {
                    gridDiv.addEventListener('click', () => {
                        const result = gameboard.player1.mark(gridDiv.id);
                        gameboard.update(result);
                        round += result[1];
                        if (_checkWin(gameboard.player1.side)) {
                            _announceWinner(gameboard.player1);
                        } else {
                            vsAI();
                        };
                    })
                })
            } else {
                const result = gameboard.player2.mark(AI.AIPicksID());
                gameboard.update(result);
                round += result[1];
                if (_checkWin(gameboard.player2.side)) {
                    _announceWinner(gameboard.player2);
                } else {
                    vsAI();
                }
            };    
        }
    };
    return {tieDOM, detectAI, vsAI};
})();

const AI = (() => {
    const toggleAI = () => {
        const btnAI = document.querySelector('.btn-AI');
        btnAI.addEventListener('click', () => {
            if (btnAI.id === 'AIoff') {
                btnAI.id = 'AIon';
                document.getElementById('player2').value = 'AI';
            } else {
                btnAI.id = 'AIoff';
                document.getElementById('player2').value = '';
            };
        });
    };
    const AIPicksID = () => {
        const board = gameBoard;
        let remainGrids = [];
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                remainGrids.push(i);
            }
        };
        return remainGrids[Math.floor(Math.random() * remainGrids.length)];
    };
    return {toggleAI, AIPicksID};
})();

const page = (() => {
    const _start = () => {
        gameboard.initialize();
        _getNames();
        if (!gameFlow.detectAI()) {
            gameFlow.tieDOM();
        } else {
            gameFlow.vsAI();
        };
    };
    const _getNames = () => {
        const name1 = document.getElementById('player1').value;
        gameboard.player1.name = name1 ? name1 : 'Player X';
        const name2 = document.getElementById('player2').value;
        gameboard.player2.name = name2 ? name2 : 'Player O';
    };
    const start = () => {
        AI.toggleAI();
        const btnStart = document.getElementById('btn-start');
        btnStart.addEventListener('click', _start);
    };
    return {start};
})();

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let round = 0;
page.start();
