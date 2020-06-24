const mapsAPI = "AIzaSyBNw2dup2_xHRjLKzsXNzhX5RtrDbx99fY"


geocodingURL: "https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=" + mapsAPI;
function searchBreweries(target){
    $.ajax({
        url: "https://api.openbrewerydb.org/breweries?by_city="+target+"&by_type=micro&per_page=50",
        method: "GET"
    }).then(function (response) {
        console.log(response);

    })
};

//searchBreweries();

$("#search-button").on("click", function(){
    event.preventDefault();
    console.log("button clicked");
    var target = $("#search-bar").val();
    console.log(target);
    searchBreweries(target);
})