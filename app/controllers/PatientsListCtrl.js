"use strict";

app.controller("PatientsListCtrl", function($scope, LoadFactory, $routeParams) {

	$scope.$routeParams = $routeParams.lastName;
	var rp = $routeParams.lastName.toLowerCase();

	LoadFactory.getPatients(rp)
	.then( function(patientsList) {
		$scope.patients = patientsList;
	});
});