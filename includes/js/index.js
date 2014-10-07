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
					playerNumber : 1,
					playerSimbol : 'X'
				},
				{
					playerNumber : 2,
					playerSimbol : '0'
				}],
		currentPlayer : 1
        };
    }]);


// II - let's start define our router app links
game.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('404');

    $stateProvider
        .state('game', {
            abstract: true,
            url: '/home',
            templateUrl: 'includes/views/home.html',
            controller: "logic-controller",
        })
        .state('game.settings', {
        	url: '/settings',
        	templateUrl: 'includes/views/player_settings.html',
        	controller : 'player-controller',
            // we'll get to this in a bit       
        })
        .state('game.play', {
        	url: '/play',
        	templateUrl: 'includes/views/game.html',
        	controller : 'board-controller',
            // we'll get to this in a bit       
        })
        .state('404', {
        	url: '/404',
        	templateUrl: 'includes/views/error.html',
            // we'll get to this in a bit       
        });
});

game.controller("logic-controller",["$scope","players","tiles", function($scope,$players,$tiles){

	console.log("logic-controller");

	$scope.doSomeLogic = function() {
		// check to see if player wins, notify and reset game
		// else change turn
		// 
	}
}]);

// This shit manages player turns 
game.controller("player-controller",["$scope", "players", function($scope, players) {

	console.log("player-controller");

	$scope.changePlayerTurn = function() {
		players.currentPlayer = ( players.currentPlayer == 2 ) ? 1 : 2;
	};
}]);

// This shit represents the board on which you can play
game.controller("board-controller",["$scope","tiles","players", function($scope, tiles, players) {

	console.log("board-controller");

	$scope.tiles = tiles;
	$scope.players = players;
	$scope.addValue = function(tileNumber) {
		// but why ? 
		tileNumber = parseInt(tileNumber);
		if ( tiles[tileNumber].player == -1 ) {
			$scope.tiles[tileNumber].player =  1;
		}
	}
	$scope.checkForWinner = function() {
		// do shit here
	};
	$scope.resetGame = function() {
		// do another shit here
	};
}]);

game.directive("tvalue", function(){
	return  {
		restrict: "A",
    	template: '<span class="size" ng-click="addValue(tile.number)" > {{  players.totalPlayers[tile.player].playerSimbol  }}</span>'
	}
});