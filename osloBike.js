
var requestURL = "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json";
var nameURL = "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json";

var request = new XMLHttpRequest();
var nameRequest = new XMLHttpRequest();

//Info = Json object that will contain all the needed data.
var info;

//Table for displaying the data
var table = document.querySelector('table');

//first request for the first json data.
request.responseType = 'json';
request.open('GET', requestURL);
request.send();

//Onload asign json data to info variable.
request.onload = function() {
    console.log("Loaded Stasjoner");
    info = request.response;
}

request.onerror = function(){
    error();
}

//second request for the json data containing the name.
nameRequest.responseType = 'json';
nameRequest.open('GET', nameURL);
nameRequest.send();

//calls the function combineJson to combine the name info from nameRequest.response with the first json object.
nameRequest.onload = function(){
    console.log("Loaded Navn");
    info = combineJson(info, nameRequest.response);
    changeText(info);
}

nameRequest.onerror = function(){
    error();
}


function error(){
    errorMessage = document.createElement('h1');
    errorMessage.textContent = "Error loading data";
    table.appendChild(errorMessage);
}

//Combines the json files with needed data.
function combineJson(jsonObj, oldJsonObj){
    for (let i = 0; i < jsonObj.data.stations.length; i++) {
        jsonObj.data.stations[i].name =  oldJsonObj.data.stations[i].name;
    }
    return jsonObj;
}

//Creates the visual for HTML.
function changeText(jsonObj){
    for (var i = 0; i < jsonObj.data.stations.length; i++) {
        var current = jsonObj.data.stations[i];

        newRow = document.createElement('tr');
        newID = document.createElement('td');
        newID.className = 'id';
        newName = document.createElement('td');
        newName.className = 'name';
        newAvailable = document.createElement('td');
        newAvailable.className = 'available';
        newReturn = document.createElement('td');
        newReturn.className = 'returnable';


        newID.textContent = jsonObj.data.stations[i].station_id;
        newName.textContent = jsonObj.data.stations[i].name;
        newAvailable.textContent = jsonObj.data.stations[i].num_bikes_available;
        newReturn.textContent = jsonObj.data.stations[i].num_docks_available;

        newRow.appendChild(newID);
        newRow.appendChild(newName);
        newRow.appendChild(newAvailable);
        newRow.appendChild(newReturn);

        table.appendChild(newRow);
    }
}