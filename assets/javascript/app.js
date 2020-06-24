const mapsAPI = "AIzaSyBNw2dup2_xHRjLKzsXNzhX5RtrDbx99fY"


geocodingURL: "https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=" + mapsAPI;
function searchBreweries(){
    $.ajax({
        url: "https://api.openbrewerydb.org/breweries?by_city=Minneapolis&by_type=micro&per_page=50",
        method: "GET"
    }).then(function (response) {
        console.log(response);

    })
};

searchBreweries();








//EVENT LISTNERS
// add event listener to change to map view 

    // if info-card button is pressed
        // display of info-card = block
        // display of mapView = none    
    // else
        //change display of info-card to none
        //change display of mapView to block

























