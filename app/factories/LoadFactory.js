"use strict";

// The factory is used to load the information from firebase and
// make it available to the developer

app.factory("LoadFactory", function($q, $http, FBCreds) {

    var getDoctors = () => {
        let doctorsArray = [];
        return $q((resolve, reject) =>{
            $http.get(`${FBCreds.databaseURL}/doctors.json`)
            .then((doctorObj) => {
                var doctorList = doctorObj.data;
                console.log("doctorList: ",  doctorList);
                
                for (var i = 0; i < doctorList.length; i++){
                    var newDocObj = {};
                    var stringIt = String(Object.keys(doctorList[i]));
                    newDocObj.name = stringIt;
                    newDocObj.firstName = doctorList[i][stringIt].first_name;
                    newDocObj.lastName = doctorList[i][stringIt].last_name;
                    newDocObj.speciality = doctorList[i][stringIt].speciality;
                    doctorsArray.push(newDocObj);

                }

                resolve(doctorsArray);
            })
            .catch((error) => {
                reject(error);
            });
        });
    };


    var getPatients = (rp) => {
        let patientsArray = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/patients.json?orderBy="doctor_id"&equalTo="${rp}"`)
            .then((patientObj) => {
                var patientList = patientObj.data;

                Object.keys(patientList).forEach((key) => {
                    console.log('alive');
                    var newPatObj = {};
                    newPatObj.firstName = patientList[key].first_name;
                    newPatObj.lastName = patientList[key].last_name;
                    newPatObj.ailment = patientList[key].ailment;
                    newPatObj.doctor = patientList[key].doctor_id;
                    patientsArray.push(newPatObj);
                });

                resolve(patientsArray);
            })
            .catch((error) => {
                reject(error);
            });
        });
    };



    return {getDoctors, getPatients};

});