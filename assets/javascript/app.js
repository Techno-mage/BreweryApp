const mapsAPI = "AIzaSyBNw2dup2_xHRjLKzsXNzhX5RtrDbx99fY"

var results = [];

geocodingURL: "https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=" + mapsAPI;
function searchBreweries(target){
    $.ajax({
        url: "https://api.openbrewerydb.org/breweries?by_city="+target+"&by_type=micro&per_page=50",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        results = response;
        displayResults();
    })
};

//searchBreweries();

$("#search-button").on("click", function(){
    event.preventDefault();
    console.log("button clicked");
    var target = $("#search-bar").val();
    console.log(target);
    searchBreweries(target);
    //displayResults();
})

function displayResults(){
    console.log(results);
    for (result of results){
        var name = result.name;
        var street = result.street;
        console.log(result.city)
        var city = result.city;
        console.log(city)
        var state = result.state;
        var phone = result.phone;
        var site = result.website_url;
        var info = $("<div>").addClass("p-wrapper");
        var phoneEl = $("<p>").addClass("card-text").html("Phone: <span>"+phone+"</span>");
        var siteEl = $("<p>").addClass("card-text").html("Website: <a>"+site+"</a>");
        info.append(phoneEl, siteEl);
        var body = $("<div>").addClass("card-body");
        body.append($("<h6>").addClass("card-title").text(city + ", " + state));
        body.append($("<p>").addClass("card-text").text(street + ", "+city+", " + state));
        body.append(info);
        var card = $("<div>").addClass("card");
        card.append($("<h5>").addClass("card-header").text(name), body);

        $("#info-card").append(card);

        

    }
}