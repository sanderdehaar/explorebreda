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
    radius: 50
}).addTo(map);
var circle2 = L.circle([51.592086314727034, 4.777921052971368], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 50
}).addTo(map)
var circle3 = L.circle([51.59468395038471, 4.776541380173677], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 50
}).addTo(map)
var circle4 = L.circle([51.583854302174316, 4.777703082209865], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 50
}).addTo(map)
var circle5 = L.circle([51.62567977081917, 4.7754830092060105], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 50
}).addTo(map)

circle1.on('click', function() {
    window.open('https://www.annemax.nl');
});
circle2.on('click', function() {
    window.open('https://www.sipfirst.nl');
});
circle3.on('click', function() {
    window.open('https://spruitbreda.nl');
});
circle4.on('click', function() {
    window.open('https://www.chatwickcoffee.nl');
});
circle5.on('click', function() {
    window.open('http://inkannenenkruikenbreda.nl');
});