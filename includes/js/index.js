// we need ui.router to use routes
var game = angular.module("ics_zero",['ui.router']);

game.factory('tiles',[ function() {
	var tiles = [];
	for ( i = 0 ; i < 9 ; i ++ ) {
		tiles.push({
			number: i,
			player: -1
			});
	}
	return tiles;
}]);

game.factory('players',[ function() {
	return {
        totalPlayers: [{
					playerNumber : 0,
					playerSimbol : 'X',
					playerColour : {
						color : "red"
					}
				},
				{
					playerNumber : 1,
					playerSimbol : '0',
					playerColour : {
						color : "green"
					}
				}],
		currentPlayer : 0
    };
}]);

game.factory('game-logic',[ 'tiles','players',function( tiles, players){
	return {
		tiles: tiles,
		players: players,
		setTile : function(tileNumber) {
			tiles[tileNumber].player =  players.currentPlayer;
		},
        isWinner: function () {
        	isWinner = false;
        	// horizontal check
        	for ( i = 2 ; i < 9; i = i + 3 ) {
        		if ( ( (tiles[i-2].player == tiles[i-1].player ) && 
        			 ( tiles[i-1].player == tiles[i].player) ) && 
        			 ( tiles[i].player != -1 ) ) {
        				isWinner = true;
        		}
        	}
    		// vertical check
    		for ( i = 0 ; i < 3; i ++ ) {
        		if ( ( (tiles[i+3].player == tiles[i+6].player ) && 
        			 ( tiles[i+3].player == tiles[i].player) ) && 
        			 ( tiles[i].player != -1 ) ) {
    				isWinner = true;
    			}
    		}
    		// diagonal check
			if ( ( ( tiles[2].player == tiles[4].player ) && 
				   ( tiles[4].player == tiles[6].player ) ) && 
				   ( tiles[2].player != -1 ) ) {
				isWinner = true;
			}
			// subdiagonal check
			if ( ( ( tiles[0].player == tiles[4].player ) && 
				   ( tiles[4].player == tiles[8].player ) ) && 
				   ( tiles[4].player != -1 ) ) {
				isWinner = true;
			}
        	return isWinner;
        },
		changePlayerTurn : function () {
			players.currentPlayer = ( players.currentPlayer == 1 ) ? 0 : 1;
		},
		resetBoard : function() {
			for ( i = 0 ; i < 9 ; i ++ ) {
				tiles[i].player = -1;			
			}
		},
    }
}]);

// II - let's start define our router app links
game.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('404');

    $stateProvider
        .state('game', {
            abstract: true,
            url: '/home',
            templateUrl: 'includes/views/home.html',
        })
        .state('game.settings', {
        	url: '/settings',
        	templateUrl: 'includes/views/player_settings.html',
        	controller : 'player-controller', 
        })
        .state('game.play', {
        	url: '/play',
        	templateUrl: 'includes/views/game.html',
        	controller : 'board-controller', 
        })
        .state('404', {
        	url: '/404',
        	templateUrl: 'includes/views/error.html',
        });
});

// This shit maganes player turns 
game.controller("player-controller",["$scope", "players", function( $scope, players) {
	$scope.players = players.totalPlayers;
	$scope.colours = ["red", "green", "black", "blue"]; 
}]);

// This shit represents the board on which you can play
game.controller("board-controller",["$scope","game-logic", function( $scope, game_logic) {
	$scope.tiles = game_logic.tiles;
	$scope.players = game_logic.players;
	$scope.occupiedTiles = 0;
	$scope.newGame = false;

	$scope.canStartAgainUpdate = function() {
		$scope.newGame = ($scope.occupiedTiles > 0) ? true : false;
	}

	$scope.addValue = function(tileNumber) {
		tileNumber = parseInt(tileNumber);
		if (game_logic.tiles[tileNumber].player == -1  ) {
			game_logic.setTile(tileNumber);
			game_logic.changePlayerTurn();
			$scope.canStartAgainUpdate();
			$scope.occupiedTiles++;
			if ( game_logic.isWinner() ) {
				game_logic.changePlayerTurn();
				alert("Winner is " + $scope.players.totalPlayers[$scope.players.currentPlayer].playerSimbol);
			} 
		} else {
			alert("Please select another tile. It's not nice trying to rape the other player.");
		}
	}

	$scope.startNewGame = function() {
		game_logic.resetBoard() ;
		$scope.newGame = false;
		$scope.occupiedTiles = 0;
	}
}]);

game.filter("excludeColour",["game-logic", function(game_logic){
	return function(colours,otherPlayer) {
		var filtered = [];
	    for (var i = 0; i < colours.length; i++) {
	      var colour = colours[i];
	      if ( colour != game_logic.players.totalPlayers[otherPlayer].playerColour.color) {
	        filtered.push(colour);
	      }
	    }
	    return filtered;
	}
}])

game.directive("tvalue", function() {
	return  {
		restrict: "A",
    	template: '<span class="size" ng-style="players.totalPlayers[tile.player].playerColour;" ng-click="addValue(tile.number)" > {{  players.totalPlayers[tile.player].playerSimbol  }}</span>'
	}
});