// use geolocation here 
window.onload = function () {
  searchBreweries("Minneapolis");
}
var results = [];

function searchBreweries(target) {
  var cityState = target.split(",");
  var state = "";
  console.log(cityState);
  if (cityState[1]){
    state = "&by_state=" + cityState[1].trim(); 
    console.log(state)
  }
  else{
    console.log("no state");
  }

  $.ajax({
       url: "https://api.openbrewerydb.org/breweries?by_city=" + cityState[0] + state+ "&by_type=micro&per_page=50",
    method: "GET"
  }).then(function (response) {
    console.log(response);
    results = response;
    clearResults();
    displayResults();
    initMap(target);

  })
};

//searchBreweries();

$("#search-button").on("click", function () {
  event.preventDefault();
  //console.log("button clicked");
  var target = $("#search-bar").val();
  //console.log(target);
  searchBreweries(target);
  //displayResults();
})

function displayResults() {
  console.log(results);
  for (result of results) {
    var name = result.name;
    var street = result.street;
    //console.log(result.city)
    var city = result.city;
    //console.log(city)
    var state = result.state;
    var phone = result.phone;
    var site = result.website_url;
    var info = $("<div>").addClass("p-wrapper");
    var phoneEl = $("<p>").addClass("card-text").html("Phone: <span>" + phone + "</span>");
    var siteEl = $("<a>").attr("href", site).addClass("card-text").html(site);


    info.append(phoneEl, siteEl);
    var body = $("<div>").addClass("card-body");
    body.append($("<h6>").addClass("card-title").text(city + ", " + state));
    body.append($("<p>").addClass("card-text").text(street + ", " + city + ", " + state));
    body.append(info);
    var card = $("<div>").addClass("card");
    card.append($("<h5>").addClass("card-header").text(name), body);

    $("#info-card").append(card);



  }
}
function clearResults() {
  $("div").remove('.card');
}
$("#listButton").on("click", function () {
  hideMap();
})
$("#mapButton").on("click", function () {
  showMap();
})
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;


function initMap(target) {

  // map options
  var mapProp = {
    center: new google.maps.LatLng(44.9778, -93.2650),
    zoom: 12,
  };
  // new map
  map = new google.maps.Map(document.getElementById("mapDisplay"), mapProp);
  infoWindow = new google.maps.InfoWindow;
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': target }, function (results, status) {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
      console.log(results);
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
  /*
  var brewInfo = result.name + '<br>' + result.street + " " + result.city + " " + result.state + '<br>' + result.phone + '<br>' + result.website_url;

  var infowindow = new google.maps.InfoWindow({
    content: brewInfo
  });*/


  function addMarkers() {

    //for each brewery in the list of breweries
    for (const result of results) {
      var marker = null;
      const brewInfo = result.name + '<br>' + result.street + " " + result.city + " " + result.state + '<br>' + result.phone + '<br>' + result.website_url;

      const infowindow = new google.maps.InfoWindow({
        content: brewInfo
      });
      //get latitude and longitude OR Geocode by their street address
      console.log(typeof result.latitude);
      console.log(typeof result.longitude);
      if (result.latitude && result.longitude) {
        var area = { lat: parseFloat(result.latitude), lng: parseFloat(result.longitude) };

        //var area = new google.maps.latLng(result.latitude, result.longitude);
        marker = new google.maps.Marker({position: area, map: map, Title: result.name});
        const newMarker = marker;
        newMarker.addListener('click', function() {
          infowindow.open(map, newMarker)});
        console.log(marker);
        
      } else { //ToDo:fix this


        // aquire cordinates from geocode
        let target = result.street + " " + result.city;
        console.log(target);
        geocoder.geocode({ 'address': target }, function (response, status) {
          if (status === 'OK') {
            var area = {lat:  response[0].geometry.location.lat(), lng:  response[0].geometry.location.lng()}

            marker = new google.maps.Marker({position: area, map: map, Title: result.name});
            const newMarker = marker;
            newMarker.addListener('click', function() {
              infowindow.open(map, newMarker)});
            console.log(marker);
            
          } else {
            console.log('Geocode was not successful for the following reason: ' + status);
          }
        });
      } 
      //create marker with cordinates set to that from our brewery

      // add marker to the map.
      /*
      if (marker) {
        marker.addListener('click', function() {
          infowindow.open(map, marker)});
        //TODO: add information to the marker

        marker.setMap(map);
        console.log("marker placed")
      }*/

    }

  }
  addMarkers();

  //   // Try HTML5 geolocation.
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       var pos = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       };

  //       infoWindow.setPosition(pos);
  //       infoWindow.setContent('Location found.');
  //       infoWindow.open(map);
  //       map.setCenter(pos);


  //     }, function () {
  //       handleLocationError(true, infoWindow, map.getCenter());
  //     });
  //   } else {
  //     // Browser doesn't support Geolocation
  //     handleLocationError(false, infoWindow, map.getCenter());
  //   }
}

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//     'Error: The Geolocation service failed.' :
//     'Error: Your browser doesn\'t support geolocation.');
//   infoWindow.open(map);
// }
// BUTTON TOGGLE FUNCTION FOR MAP VIEW

//Create a function toggleMap
//function runs when mapView button is clicked on html using an onClick attribute
//initially hide the map
//create a handler function that handles the button click
//two elements card and map and we toggle them depending on the button that is clicked. 
function showMap() {
  $('#info-card').css('display', 'none');
  $('#mapView').css('display', 'block');
};
function hideMap() {
  $('#mapView').css('display', 'none');
  $('#info-card').css('display', 'grid');
}

//Create a function toggleMap
//function runs when mapView button is clicked on html using an onClick attribute




