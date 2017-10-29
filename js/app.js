
var map;

// Create a new blank array for all the listing markers.
var markers = []; 

var locations = [
    {title: 'Al-Yamamah University', description: '', position: {lat: 24.862598, lng: 46.59184}, isVisible: true},
    {title: 'Prince Sultan University', description: '', position: {lat:  24.734742, lng: 46.697575}, isVisible: true},
    {title: 'Al-Faisal University', description: '', position: {lat: 24.664302, lng: 46.675966}, isVisible: true},
    {title: 'Princesses Noura University', description: '', position: {lat: 24.846461, lng: 46.724731}, isVisible: true},
    {title: 'King Saud University', description: '', position: {lat: 24.722419, lng: 46.627097}, isVisible: true},
];


function initMap() {
    
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 24.711184,
            lng: 46.673401
        },
        zoom: 11,
        disableDefaultUI: false,
        scrollwheel: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    });


    var largeInfowindow = new google.maps.InfoWindow();
    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].position;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            icon: 'img/star-pin.png',
            title: title,
            animation: google.maps.Animation.BOUNCE,
            id: i,
            contact: ''
        });

        locations[i].marker = marker;

        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });
        getFourSquareData(marker);
    }
    
}


/* This function populates the infowindow when the marker is clicked.
 We'll only allow one infowindow which will open at the marker that is clicked, 
 and populate based on that markers position.*/

function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>' + '<div>' + marker.contact + '</div>');

        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
    }
}
// This function will loop through the markers array and display them all.

var viewModel = {
    // locations: ko.observableArray(locations)
    filter: ko.observable(''),
    

};
viewModel.locations = ko.computed(function(){
        if(viewModel.filter() === ''){
            return locations;
        }
        else {
            var temp =[];
            locations.forEach(function(loc)
            {
                if(viewModel.filter() == loc.title)
                    temp.push(loc);
            });
            return temp;
        }


    }, this);

viewModel.doSomethingWithTheMarker = function(location) {
    //console.log('click')
    console.log(location);
    google.maps.event.trigger(location.marker, "click");
    // do something with location.marker here, for example, marker bounce, open info window etc.
};



ko.applyBindings(viewModel);



// ******************************************
// ******************************************

function getFourSquareData(marker) {
    console.log(marker);
    console.log(marker.position.lat());
    var CLIENT_ID = 'OOYA2MM4GVH024ZX5KLVRS11RCIUHYRX14DAFEUDMLVVDTX2',
    CLIENT_SECRET = '2103LLTOZ1DRFGKEBLYWMD222WV0E4CI40UD0TWFLEBCVJPW',
    version = '20171710',
    ll = marker.position.lat() + ',' + marker.position.lng(),
    query = marker.title,
    base_url = "https://api.foursquare.com/v2/venues";

  $.ajax({
      url: base_url + '/search',
      dataType: 'json',
      data: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        ll: ll,
        v: version,
        query: query,
        async: true
      }
    }).done(function(result) {
        // console.log(result.response.venues[0].contact.phone)  
        marker.contact=(result.response.venues[0].contact.phone);

    });
}


function openNav() {
    document.getElementById("mySidenav")
        .style.width = "250px";
    // document.getElementById("main")
    //     .style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav")
        .style.width = "0";
    document.getElementById("main")
        .style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}


