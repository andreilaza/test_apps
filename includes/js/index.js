var App = angular.module("App",[ ]);

App.controller("ctrl_app1",['$scope','srv', function($scope,srv) {
	$scope.srv = srv;
	$scope.testService = function() {
		srv.increment();
	}
}]);

App.controller("ctrl_app2",['$scope','srv',function($scope,srv){
	$scope.anotherNumber = srv;
	$scope.testAgain = function() {
		srv.increment();
	}
}]);
// create a service (acts like a singleton everywhere is used )
App.factory("srv", function() {
	// return an object with a getServiceName function
	return {
		number : 10,
		increment : function() {
			this.number++;
		},
		getServiceName: function() {
			return "serviciu de test";
		}
	}
});




