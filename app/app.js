"use strict";

var app = angular.module("DrPatientApp", ["ngRoute"]);

app.config( function($routeProvider) {
   $routeProvider.
   when('/', {
      templateUrl: "partials/doctor-list.html",
      controller: "DrListCtrl"
   }).
   when('/patients-list/:lastName', {
   	templateUrl: "partials/patients-list.html",
   	controller: "PatientsListCtrl"
	});
});   

app.run(($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    };

    firebase.initializeApp(authConfig);
});