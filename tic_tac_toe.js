// var blankBoard = [[0, 0, 0],[0, 0, 0], [0, 0, 0]];
var turn = true;

var ticApp = angular.module('ticApp', []);

// uses true to change cells for each player x and o's
ticApp.controller('TicController', function($scope,$timeout) {

	$scope.rows = [[0, 0, 0],[0, 0, 0], [0, 0, 0]];
	$scope.turn = true;
	$scope.content=[['','',''],['','',''],['','','']];
	$scope.win = false;
	$scope.tie = 0;

	$scope.highLight = function(row, column) {
		if ($scope.rows[row][column]==2) {
			return "highLight";
		} 
	};

	$scope.checkPlayer = function(row, column)
	{
		if ($scope.win==false){
			if ($scope.rows[row][column]==0) {
				if (turn == true)
				{
					$scope.rows[row][column] = 1;
					$scope.content[row][column]='X';
					turn = false;
					console.log("yes!");
					$scope.tie+=1;

					playerWon();

				}
				else
				{
					$scope.rows[row][column] = -1;
					$scope.content[row][column]='O';
					turn=true;
					console.log("Fuck ya!");
					$scope.tie+=1;

					playerWon();
				}
			}
		}
	};

// Test various win conditions
function playerWon() {
	for (var i=0; i<3; i++) {
		// Won by row?
		if (($scope.rows[0][i] + $scope.rows[1][i] + $scope.rows[2][i]) == 3){
			$scope.win=true;
			// alert("Blanka Wins by X!");
			// break;
			$timeout(function() {$scope.resetTime();},1500);
			document.getElementById("winAlert").innerHTML="Blanka Wins!";
			
		}

		// Won by column
		if (($scope.rows[i][0] + $scope.rows[i][1] + $scope.rows[i][2]) == 3){
			$scope.win=true; 
			$timeout(function() {$scope.resetTime();},1500);
			document.getElementById("winAlert").innerHTML="Blanka Wins!";
		}
		// Won by row O
		if (($scope.rows[0][i] + $scope.rows[1][i] + $scope.rows[2][i]) == -3){
			$scope.win=true;
			$timeout(function() {$scope.resetTime();},1500);
			document.getElementById("winAlert").innerHTML="Ryu Wins!";
		}
		// Won by column O
		if (($scope.rows[i][0] + $scope.rows[i][1] + $scope.rows[i][2]) == -3){
			$scope.win=true; 
			$timeout(function() {$scope.resetTime();},1500);
			document.getElementById("winAlert").innerHTML="Ryu Wins!";
		}
	}

	// diagonal win X
	if (($scope.rows[0][0] + $scope.rows[1][1] + $scope.rows[2][2]) == 3){
		$scope.win=true;
		$timeout(function() {$scope.resetTime();},1500);
		document.getElementById("winAlert").innerHTML="Blanka Wins!";
	}
	// diagonal win O
	if (($scope.rows[0][0] + $scope.rows[1][1] + $scope.rows[2][2]) == -3){
		$scope.win=true;
		$timeout(function() {$scope.resetTime();},1500);
		document.getElementById("winAlert").innerHTML="Ryu Wins!";
	}
	// diagonal win X
	if (($scope.rows[0][2] + $scope.rows[1][1] + $scope.rows[2][0]) == 3){
		$scope.win=true;
		$timeout(function() {$scope.resetTime();},1500);
		document.getElementById("winAlert").innerHTML="Blanka Wins!";
	}
	if (($scope.rows[0][2] + $scope.rows[1][1] + $scope.rows[2][0]) == -3){
		$scope.win=true;
		$timeout(function() {$scope.resetTime();},1500);
		document.getElementById("winAlert").innerHTML="Ryu Wins!";
	}
	if ($scope.tie==9 && $scope.win==false){
		$timeout(function() {$scope.resetTime();},1500);
		document.getElementById("winAlert").innerHTML="Tie GamePlay Again!";
	}
};

	$scope.resetTime= function() {
		$scope.rows = [[0, 0, 0],[0, 0, 0], [0, 0, 0]];
		$scope.turn = true;
		$scope.content=[['','',''],['','',''],['','','']];
		$scope.win = false;
		$scope.tie = 0;
		document.getElementById("winAlert").innerHTML="";
	}

})




// display win/lose with a hidden div then use ng-style to display on js
// var display result as inline-block
		// $watch can show how many times you move on tic tac toe board 
		// $watch on gameboard and trigger after 4 or 5th move
		// watching old event and comparing with new event
	// app.controller('TicController', function($scope) {
	// 	$scope.name = "";

	// 	$scope.updated = -2;
	// })
	// 
	// 	$scope.$watch('name', function() {
	// 		$scope.updated++;
	// 		console.log($scope.updated + " button");
	// 	})

// 1. add mid 2 scripts
// 2. all references to $scope?
// change to $scope.game
// 3. make sure firebase is added as a dependency
// 4. wherever data changes to $scope to $save (Player 2)
