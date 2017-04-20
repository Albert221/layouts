function initMap() {
    var coords = {lat: 54.719585, lng: 18.407536}
    var map = new google.maps.Map(document.getElementById('map'), {
        center: coords,
        zoom: 16,
        scrollwheel: false,
        disableDefaultUI: true
    });

    new google.maps.Marker({
        position: coords,
        map: map
    });
}