"use strict";

app.controller("DrListCtrl", function($scope, LoadFactory) {

	LoadFactory.getDoctors()
	.then( function(drList) {
		$scope.doctors = drList;
	});
});