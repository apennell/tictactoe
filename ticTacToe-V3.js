//code refactored with OOP:

$(function() {

	//creates player constructor
	function Player(turn) {
		this.player = turn;
	};

	//creates TTT constructor with properties of the board and methods of game play
	//new X and O player instances
	//grabs board/box, reset button, and player turn elements; sets total moves to 0
	function TicTacToe() {
		this.player1 = new Player('X');
		this.player2 = new Player('O');
		this.$board = $('.box');
		this.$box0 = $('#box0');
		this.$box1 = $('#box1');
		this.$box2 = $('#box2');
		this.$box3 = $('#box3');
		this.$box4 = $('#box4');
		this.$box5 = $('#box5');
		this.$box6 = $('#box6');
		this.$box7 = $('#box7');
		this.$box8 = $('#box8');
		this.$reset = $('#reset');
		this.$playerTurn = $('#playerTurn');
		this.totalMoves = 0;
	};

	//chooses which player's turn it is based on even or odd, then marks that space and changes its color
	//if space already taken, alerts that and makes player choose different move
	TicTacToe.prototype.choosePlayer = function() {
		if (this.totalMoves % 2 === 0) {
			event.preventDefault();
			var $boxMove = $(event.target); 
			if ($boxMove.html() === '&nbsp;') {
				$boxMove.css({'color': 'rgb(236,142,250)', 'background-color': 'rgba(255,255,255,.1)'}).html('X');
				this.totalMoves ++;
			} else {
				alert('Player Two already went there! Please make a different move.');
			}
		} else {
			this.currentPlayer = this.player2;
			event.preventDefault();
			var $boxMove = $(event.target); 
			if ($boxMove.html() === '&nbsp;') {
				$boxMove.css({'color': 'rgb(250,250,161)', 'background-color': 'rgba(0,0,0,.2)'}).html('O');
				this.totalMoves ++;
			} else {
				alert('Player One already went there! Please make a different move.');
			}
		}
	};

	//checks for winner; changes winning row color, else sets winner to tie or null.
	TicTacToe.prototype.checkWinner = function() {
		if (this.$box0.html() === this.$box1.html() && this.$box0.html() === this.$box2.html() && this.$box0.html() !== '&nbsp;') {
			this.$box0.css('background-color', 'green');
			this.$box1.css('background-color', 'green');
			this.$box2.css('background-color', 'green');
			winner = this.$box0.html();
		} else if (this.$box3.html() === this.$box4.html() && this.$box3.html() === this.$box5.html() && this.$box3.html() !== '&nbsp;') {
			this.$box3.css('background-color', 'green');
			this.$box4.css('background-color', 'green');
			this.$box5.css('background-color', 'green');
			winner = this.$box3.html();
		} else if (this.$box6.html() === this.$box7.html() && this.$box6.html() === this.$box8.html() && this.$box6.html() !== '&nbsp;') {
			this.$box6.css('background-color', 'green');
			this.$box7.css('background-color', 'green');
			this.$box8.css('background-color', 'green');
			winner = this.$box6.html();
		} else if (this.$box0.html() === this.$box3.html() && this.$box0.html() === this.$box6.html() && this.$box0.html() !== '&nbsp;') {
			this.$box0.css('background-color', 'green');
			this.$box3.css('background-color', 'green');
			this.$box6.css('background-color', 'green');
			winner = this.$box0.html();
		} else if (this.$box1.html() === this.$box4.html() && this.$box1.html() === this.$box7.html() && this.$box1.html() !== '&nbsp;') {
			this.$box1.css('background-color', 'green');
			this.$box4.css('background-color', 'green');
			this.$box7.css('background-color', 'green');
			winner = this.$box1.html();
		} else if (this.$box2.html() === this.$box5.html() && this.$box2.html() === this.$box8.html() && this.$box2.html() !== '&nbsp;') {
			this.$box2.css('background-color', 'green');
			this.$box5.css('background-color', 'green');
			this.$box8.css('background-color', 'green');
			winner = this.$box2.html();
		} else if (this.$box0.html() === this.$box4.html() && this.$box0.html() === this.$box8.html() && this.$box0.html() !== '&nbsp;') {
			this.$box0.css('background-color', 'green');
			this.$box4.css('background-color', 'green');
			this.$box8.css('background-color', 'green');
			winner = this.$box0.html();
		} else if (this.$box2.html() === this.$box4.html() && this.$box2.html() === this.$box6.html() && this.$box2.html() !== '&nbsp;') {
			this.$box2.css('background-color', 'green');
			this.$box4.css('background-color', 'green');
			this.$box6.css('background-color', 'green');
			winner = this.$box2.html();
		} else if (this.$box0.html() !== '&nbsp;' && this.$box1.html() !== '&nbsp;' && this.$box2.html() !== '&nbsp;' && this.$box3.html() !== '&nbsp;' && this.$box4.html() !== '&nbsp;' && this.$box5.html() !== '&nbsp;' && this.$box6.html() !== '&nbsp;' && this.$box7.html() !== '&nbsp;' && this.$box8.html() !== '&nbsp;') {
			winner = 'tie';
		} else {
			winner = null;
		};
		return winner;
	};

	//plays game upon click of board: runs through choosePlayer to mark board, then checks for winner
	TicTacToe.prototype.play = function() {
		var _this = this;
		this.$board.click(function() {
			_this.choosePlayer();
			_this.checkWinner();
			if (winner === 'X') {
				alert('Player One wins!');
				_this.$playerTurn.html("Congrats, Player One! Reset board to play again.");
			} else if (winner === 'O') {
				alert('Player Two wins!');
				_this.$playerTurn.html("Congrats, Player Two! Reset board to play again.");
			} else if (winner === 'tie') {
				alert("It's a tie!");
				_this.$playerTurn.html("It's a tie! Play again?");
			} else {
				if (_this.totalMoves % 2 === 0) {
					_this.$playerTurn.html("It's Player One's turn to make a move!");
				} else {
					_this.$playerTurn.html("It's Player Two's turn to make a move!");
				}
			}
		})

		//resets board when reset button is clicked
		this.$reset.click(function() {
			_this.$board.css('backgroundColor', 'rgba(8,50,24,1)').html('&nbsp;');
			_this.totalMoves= 0;
			_this.$playerTurn.html("Let's play!  Player One, pick a square!");
		})
	};

	//creates new instance of a game for play.
	var game = new TicTacToe();
	game.play();

});
