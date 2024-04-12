



// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     });

const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


d3.json(url).then(function(response) {
    // console.log(response.features);
    // L.geoJSON(response).addTo(myMap);
    createFeatures(response.features);
});

function createMap(earthquake) {
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// let earthquakes = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// });

let baseMaps = {
    "Street Map": street,
    // "Topographic Map": topo
};

let overlayMaps = {
    "Earthquakes": earthquake
};

let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [street, earthquake]
    });

L.control.layers(baseMaps, overlayMaps, {
collapsed: false
  }).addTo(myMap);

//   function createMarkers(response) {
//     let earthquake = response.data.Earthquakes;

//     let quakeMarkers = [];

//     for (let index = 0;)
//   }
};

function createFeatures(earthquakeData) {
    function onEachFeature(features, layer) {
        layer.bindPopup(`<h3>${features.properties.place}</h3><hr><p>${new Date(features.properties.time)}</p>`);
    }
    
    let earthquakes = L.geoJSON(earthquakeData,{
        onEachFeature: onEachFeature,
        pointToLayer: circleMarker,
        style: style
    });
    // var myMap = createMap(earthquakes);
    function circleMarker(geoJsonPoint, latlng) {
        return L.circleMarker(latlng);
    };
    function style(feature) {
        console.log(feature);
        return {
            weight:0.5,
            color: "black",
            fillColor:"green",
            fillOpacity: 0.6,
            radius: 20
        };
    }
   createMap(earthquakes);
};

// // myMap.addLayer(markers);


