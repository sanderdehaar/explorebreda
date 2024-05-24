var map = L.map('map').setView([51.590, 4.7800], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// To add circle on specific locations in Breda
var circles = [
    {
        circle: L.circle([51.580221985963256, 4.777944661016244], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 100
        }).addTo(map),
        url: 'https://www.annemax.nl'
    },
    {
        circle: L.circle([51.592086314727034, 4.777921052971368], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 100
        }).addTo(map),
        url: 'https://www.sipfirst.nl'
    },
    {
        circle: L.circle([51.59468395038471, 4.776541380173677], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 100
        }).addTo(map),
        url: 'https://spruitbreda.nl'
    },
    {
        circle: L.circle([51.583854302174316, 4.777703082209865], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 100
        }).addTo(map),
        url: 'https://www.chatwickcoffee.nl'
    },
    {
        circle: L.circle([51.62567977081917, 4.7754830092060105], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 100
        }).addTo(map),
        url: 'http://inkannenenkruikenbreda.nl'
    },
    {
        circle: L.circle([51.595276829961996, 4.764358275899699], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 100
        }).addTo(map),
        url: 'https://playgrndbreda.nl'
    },
    {
        circle: L.circle([51.62397467038554, 4.784410205319828], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 100
        }).addTo(map),
        url: 'https://blindwalls.gallery/en/'
    },
    {
        circle: L.circle([51.63931826753833, 4.763197145130132], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 100
        }).addTo(map),
        url: 'https://pier15.nl'
    },
]

circles.forEach(function(c) {
    c.circle.on('click', function() {
        window.open(c.url, '_blank');
    });
});