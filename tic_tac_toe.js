var turn = true;
var playerNum;
var ticApp = angular.module('ticApp', ["firebase"]);

// uses true to change cells for each player x and o's
// ticApp.controller('TicController', function($scope) {
ticApp.controller('TicController', function($scope, $timeout, $firebase) {


	// $scope.game.rows = [[0, 0, 0],[0, 0, 0], [0, 0, 0]];
	// $scope.turn = true;
	// $scope.game.content=[['','',''],['','',''],['','','']];
	// $scope.game.win = false;
	// $scope.game.count = 0;
	// $scope.game.xWins = 0;
	// $scope.game.oWins= 0;
	//cancel out everything above due to firebase and putting them into the cloud
	var ticTacRef = new Firebase("https://tic-tac-fighter.firebaseio.com/games");

	var lastGame;
	// Ask for all existing game info from firebase
	ticTacRef.once('value', function(gamesSnapshot) {
		//what in firebase right now and bring it back to
		// get the actual games data
	  var games = gamesSnapshot.val();
		if(games == null)
		{
			// No games at all, so make a new game -- As if we're Areg
			lastGame = ticTacRef.push( {waiting: true} );
			playerNum = true;
		}
		else	// I do have at least one game out there...
		{
		  var keys = Object.keys(games);
		  // we want the last key in the object from below
		  var lastGameKey = keys[ keys.length - 1 ];
		  var lastGame = games[ lastGameKey ];
			console.log("This person's game: " + lastGameKey);
		  if(lastGame.waiting)
		  {
		  	// Currently someone is waiting -- Areg is there and we're Rocky
		  	// Grab from Firebase its last game object
		  	lastGame = ticTacRef.child(lastGameKey);
		  	// Set a new game on this
		  	lastGame.set( {
		  		waiting:false, 
		  		count: 0, 
		  		win: false, 
		  		rows: [[0, 0, 0],[0, 0, 0], [0, 0, 0]], 
		  		xWins: 0, 
		  		oWins: 0, 
		  		content: [['','',''],['','',''],['','','']], 
		  		turn: true} );

		  	playerNum = false;
		  }
		  else
		  {
		  	// Make a new game -- As if we're Areg
				lastGame = ticTacRef.push( {waiting: true} );
				playerNum = true;
		  }
		}
		// Attach the last game to what we're up to
	  $scope.game = $firebase(lastGame);
	});


	$scope.highLight = function(row, column) {
		if ($scope.game.rows[row][column]==2) {
			return "highLight";
		} 
	};

	$scope.checkPlayer = function(row, column)
	{
		if ($scope.game.win==false && playerNum === $scope.game.turn){
			if ($scope.game.rows[row][column]==0) {
				if ($scope.game.turn == true)
				{
					$scope.game.rows[row][column] = 1;
					$scope.game.content[row][column]='X';
					$scope.game.turn  = false;
					console.log("yes!");
					$scope.game.count+=1;

					playerWon();
				}
				else
				{
					$scope.game.rows[row][column] = -1;
					$scope.game.content[row][column]='O';
					$scope.game.turn = true;
					console.log("Fuck ya!");
					$scope.game.count+=1;

					playerWon();
				}
			}
		}
		$scope.game.$save();
	};

// Test various win conditions
	function playerWon() {
	for (var i=0; i<3; i++) {
		// Won by row?
		if (($scope.game.rows[0][i] + $scope.game.rows[1][i] + $scope.game.rows[2][i]) == 3){
			$scope.game.win=true;
			// alert("Blanka Wins by X!");
			// break;

			$timeout(function() {$scope.resetTime();},1500);
			document.getElementById("winAlert").innerHTML="Blanka Wins!";
			$scope.game.xWins++;
			console.log("X wins: " + $scope.game.xWins);			
		}

		// Won by column
		if (($scope.game.rows[i][0] + $scope.game.rows[i][1] + $scope.game.rows[i][2]) == 3){
			$scope.game.win=true; 
			$timeout(function() {$scope.resetTime();},1500);
			document.getElementById("winAlert").innerHTML="Blanka Wins!";
			$scope.game.xWins++;
			console.log("X wins: " + $scope.game.xWins);
		}
		// Won by row O
		if (($scope.game.rows[0][i] + $scope.game.rows[1][i] + $scope.game.rows[2][i]) == -3){
			$scope.game.win=true;
			$timeout(function() {$scope.resetTime();},1500);
			document.getElementById("winAlert").innerHTML="Ryu Wins!";
			$scope.game.oWins++;
			console.log("O wins: " + $scope.game.oWins);
		}
		// Won by column O
		if (($scope.game.rows[i][0] + $scope.game.rows[i][1] + $scope.game.rows[i][2]) == -3){
			$scope.game.win=true; 
			$timeout(function() {$scope.resetTime();},1500);
			document.getElementById("winAlert").innerHTML="Ryu Wins!";
			$scope.game.oWins++;
			console.log("O wins: " + $scope.game.oWins);
		}
	}

	// diagonal win X
	if (($scope.game.rows[0][0] + $scope.game.rows[1][1] + $scope.game.rows[2][2]) == 3){
		$scope.game.win=true;
		$timeout(function() {$scope.resetTime();},1500);
		document.getElementById("winAlert").innerHTML="Blanka Wins!";
		$scope.game.xWins++;
			console.log("X wins: " + $scope.game.xWins);
	}
	// diagonal win O
	if (($scope.game.rows[0][0] + $scope.game.rows[1][1] + $scope.game.rows[2][2]) == -3){
		$scope.game.win=true;
		$timeout(function() {$scope.resetTime();},1500);
		document.getElementById("winAlert").innerHTML="Ryu Wins!";
		$scope.game.oWins++;
			console.log("O wins: " + $scope.game.oWins);
	}
	// diagonal win X
	if (($scope.game.rows[0][2] + $scope.game.rows[1][1] + $scope.game.rows[2][0]) == 3){
		$scope.game.win=true;
		$timeout(function() {$scope.resetTime();},1500);
		document.getElementById("winAlert").innerHTML="Blanka Wins!";
		$scope.game.xWins++;
			console.log("X wins: " + $scope.game.xWins);
	}
	if (($scope.game.rows[0][2] + $scope.game.rows[1][1] + $scope.game.rows[2][0]) == -3){
		$scope.game.win=true;
		$timeout(function() {$scope.resetTime();},1500);
		document.getElementById("winAlert").innerHTML="Ryu Wins!";
		$scope.game.oWins++;
			console.log("O wins: " + $scope.game.oWins);
	}
	if ($scope.game.count==9 && $scope.game.win==false){
		$timeout(function() {$scope.resetTime();},1500);
		document.getElementById("winAlert").innerHTML="Tie GamePlay Again!";
	}
};
	$scope.resetTime= function() {
		$scope.game.rows = [[0, 0, 0],[0, 0, 0], [0, 0, 0]];
		$scope.game.turn = true;
		$scope.game.content=[['','',''],['','',''],['','','']];
		$scope.game.win = false;
		$scope.game.count = 0;
		document.getElementById("winAlert").innerHTML="";
		$scope.game.$save();
	}

})