// 'use strict';
var map;
// var locations=[]; 
// Create a new blank array for all the listing markers.
var markers = [];
var locations = [
    //Advance Pet Clinic
    {
        title: 'Advance Pet Clinic',
        description: '',
        position: {
            lat: 24.770316,
            lng: 46.688941
        },
        isVisible: true
    },
    // Elite Pet Clinic
    {
        title: 'Elite Pet Clinic',
        description: '',
        position: {
            lat: 24.763679,
            lng: 46.624386
        },
        isVisible: true
    },
    //Joon Veterinary Clinic & Pet Shop
    {
        title: 'Joon Veterinary Clinic & Pet Shop',
        description: '',
        position: {
            lat: 24.675703,
            lng: 46.674264
        },
        isVisible: true
    },
    //aleef World
    {
        title: 'Aleef World',
        description: '',
        position: {
            lat: 24.639621,
            lng: 46.822677
        },
        isVisible: true
    },
    //Riyadh Animal Shelter
    {
        title: 'Riyadh Animal Shelter',
        description: '',
        position: {
            lat: 24.639808,
            lng: 46.82256
        },
        isVisible: true
    },
    //Animal Planet
    {
        title: 'Animal Planet',
        description: '',
        position: {
            lat: 24.715709,
            lng: 46.696111
        },
        isVisible: true
    }
];

function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 24.711184,
            lng: 46.673401
        },
        zoom: 13,
        disableDefaultUI: false,
        scrollwheel: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var largeInfowindow = new google.maps.InfoWindow();
    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].position;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            position: position,
            icon: 'img/paws-marker.png',
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });
    }
    document.getElementById('show-listings')
        .addEventListener('click', showListings);
    document.getElementById('hide-listings')
        .addEventListener('click', hideListings);
}
// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
    }
}
// This function will loop through the markers array and display them all.
function showListings() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}
// This function will loop through the listings and hide them all.
function hideListings() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}
var viewModel = {
    locations: ko.observableArray(locations)
    // var self = this ;
    // this.locationList = ko.observableArray (locations);
    // this.locationList().forEach(function(location){
    // locationList().push(location); 
    // });
    // console.log(this.locationList);
    // console.log(this);
    // console.log(self);
};
ko.applyBindings(viewModel);
/*
 ************************************** 
 **************************************
 ************************************** 
 */
function openNav() {
    document.getElementById("mySidenav")
        .style.width = "250px";
    document.getElementById("main")
        .style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav")
        .style.width = "0";
    document.getElementById("main")
        .style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}
