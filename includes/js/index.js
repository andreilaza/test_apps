var game = angular.module("ics_zero",[]);

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

// This shit maganes player turns 
game.controller("player-controller",["$scope", "players", function($scope, players) {
	$scope.players = players.totalPlayers;
	// @TO-DO : on event thrown at line46, execute function
	$scope.nextPlayer = function() {
		players.currentPlayer = ( players.currentPlayer == 2 ) ? 1 : 2;
	}
}]);

// This shit represents the board on which you can play
game.controller("board-controller",["$scope","tiles","players", function($scope, tiles, players) {
	$scope.tiles = tiles;
	$scope.players = players;
	$scope.addValue = function(tileNumber) {
		// but why ? 
		tileNumber = parseInt(tileNumber);
		if ( tiles[tileNumber].player == -1 ) {
			$scope.tiles[tileNumber].player =  1;
			//@ TO-DO : throw event to line 31
		}
	}
}]);

game.directive("tvalue", function(){
	return  {
		restrict: "A",
		// cacatul asta imi da eroare in consola daca las {{ tile.number }} ..
		// daca nu folosesc {{ }} nu da eroare dar nu se inlocuieste parametrul cu poprietatea obiectului
    	template: '<span class="size" ng-click="addValue(tile.number)" > {{  players.totalPlayers[tile.player].playerSimbol  }}</span>'
	}
});