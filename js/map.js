var map = L.map('map').setView([51.590, 4.7800], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// To add circle on specific locations in Breda
var circle1 = L.circle([51.580221985963256, 4.777944661016244], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 100
}).addTo(map);

circle1.on('click', function() {
    window.open('https://www.annemax.nl');
});