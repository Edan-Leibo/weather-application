
let currentMarker = null;
let map = null;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 32.657298, lng: 35.097969 }
    });

    map.addListener('click', function (e) {

        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&units=metric&APPID=c894fa26f98d61a6892f65d827493bef`)
            .then(res => res.json())
            .then(weather => {
                placeMarkerAndPanTo(e.latLng, map);
                openInfo(weather);
            });
    });
}

function placeMarkerAndPanTo(latLng, map) {
    if (currentMarker) {
        currentMarker.setMap(null);
    }
    currentMarker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    map.panTo(latLng);
}

function openInfo(weather) {
    const iconurl = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

    const info = new google.maps.InfoWindow({
        content: `<h3>${weather.name}</h3>
        <img class="wicon" src="${iconurl}" alt="Weather icon">
        <p>${weather.main.temp}&#8451</p>
        <p>${weather.main.temp_min}&#8451  -  ${weather.main.temp_max}&#8451</p>
        <p>${weather.weather[0].description}</p>`
    });
    info.open(map, currentMarker)

}

