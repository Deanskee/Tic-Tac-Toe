// // functions: 
// // document.getElementById('container').onclick = function() {
// // 	this.style.border = "5px solid blue";
// // 	this.style.backgroundImage = "url('http://sereedmedia...')";
// // 	this.innerHTML = "Wilson Cat";
// // 	this.style.color = "purple";
// // 	this.style.height = "900px";
// // };

// // document.getElementById('container').addEventListener('click', function() {

// 	// same thing as the .onclick. but you can have multiple addEventListeners on one thing
// 	// but .onclick you couldnt

// 	// function to grab every div
// 	// document.getElementByTagName('div')[2].style.border = "5px solid lime";
// 	var win = false;
// 	var winningBoard=[" ", " ", " "], [" ", " ", " "], [" ", " ", " "];
// 	var playerONe=false
// 	var playerTwo=false


var turn = true;
var ticApp = angular.module('ticApp', [])

// uses true to change cells for each player x and o's
// ticApp.controller('TicController', function($scope) {
ticApp.controller('TicController', function($scope) {


// function TicController($scope) {
	$scope.rows = [[0, 0, 0],[0, 0, 0], [0, 0, 0]];
	$scope.turn = true;
	$scope.clicker = function (r,c) { 
		if ($scope.rows[r][c]=="") {
			if ($scope.turn == true) {
				$scope.rows[r][c]='X';
				$scope.turn = false; }
			else {
				
				$scope.rows[r][c]='O';
				$scope.turn = true;
			
			};
		}
		else {
				$scope.rows[r][c];
			}

	$scope.checkWinner(r,c);
	}



$scope.checkWinner = function(r, c)
		{
				if (turn == true)
				{
					$scope.rows[r][c] = 1;
					value = 1;
					turn = false;
					console.log("yes!");
				}
				else
				{
					$scope.rows[r][c] = -1;
					value = -1;
					turn=true;
					console.log("Fuck ya!");
				}
		};
});

		
		



// ticApp.controller('TicController', function($scope) {
// 	$scope.rows = [[0, 0, 0],[0, 0, 0], [0, 0, 0]];
// 	$scope.clicker = function (RowIndex, cellIndex) {
// 		$scope.rows[RowIndex][cellIndex]='X';
// 		console.log(rows);
// 	};				
		
 			
// });

// 	var play = function(player, opp) {
// 		var index;
// 		player.play(function(move) {
// 			index=move;
// 			board.board[index][1] = player.mark;
// 			if (board.Winner()== undefined||)
// 		}
// 	}

// // box is clicked. Determine which player has clicked
// function TicController($scope, )
// var TicTacToe = angular.module('TicTacToe', []);
// TicTacToe.controller('TicTacToeController', function ($scope) {
// $scope.row =
// [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]
// })
// var p1=false;
// var p2=false;
// if (!p1 || !p2) {
// if (rows.onClick == row) {
// p1answer = "X";
// p1 = true;
// display();
// }
// else if (rows.onClick ==row) {
// p2answer = "O";
// p2 = true;
// display ()
// }
// }

	// for (var i = 0; i < deansLoop.length; i++) {
	// 	deansLoop[i].onclick = function() {
	// 		this.style.backgroundColor = "blue";
	// }};