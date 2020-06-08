//START POPUP
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var overlay = new ol.Overlay(({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
}));

closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};
//END POPUP

var textSma = function(feature, resolution) {
    return new ol.style.Text({
        textAlign: 'center',
        textBaseline: 'middle',
        font: '14px Verdana',
        text: feature.get('sekolah'),
        fill: new ol.style.Fill({
            color: 'black'
        })
    });
};

var styleSma = function() {
    return function(feature, resolution) {
        var status = feature.get('status');
        if (status == "S") {
            var tmp = new ol.style.Style({
                text: textSma(feature, resolution),
            });
        } else if (status == "N") {
            var tmp = new ol.style.Style({
                text: textSma(feature, resolution),
            });
        }
        return [tmp];
    };
};

var sma = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON({
            defaultDataProjection: 'EPSG:4326'
        }),
        url: 'assets/sma.geojson'
    }),
    visible: true,
    //style: styleSma()
});

var sourceBingMaps = new ol.source.BingMaps({
    key: 'Aknmwjgi0dQOfBK8hp_Yx6kg4xJntd3wxpSs1zod5-EaBpR9gCVvMFbw80L7xCN_',
    imagerySet: 'Aerial',
});

var bing_aerial = new ol.layer.Tile({
    preload: Infinity,
    source: sourceBingMaps,
    visible: false,
});

var osm = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: true,
});

var map = new ol.Map({
    target: 'map',
    controls: [
        //Define the default controls
        new ol.control.Zoom(),
        new ol.control.Rotate(),
        new ol.control.Attribution(),
        //Define some new controls
        new ol.control.ZoomSlider(),
        new ol.control.MousePosition(),
        new ol.control.ScaleLine(),
        new ol.control.OverviewMap()
    ],
    layers: [
        osm,
        bing_aerial,
        sma
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([112.75083, -7.24917]),
        zoom: 13
    })
});

function pilih_bg(pilih) {
    console.log(pilih);
    if (pilih == 'osm') {
        osm.setVisible(true);
        bing_aerial.setVisible(false);
    }
    if (pilih == 'bing_aerial') {
        osm.setVisible(false);
        bing_aerial.setVisible(true);
    }
};

// on click
var infoSMA = function(pixel) {
    var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
        return feature;
    });
    if (feature) {
        if (feature.get('sekolah')) {
            content.innerHTML = feature.get('sekolah') + ` Link sekolah
        <br> <a href="https://profilsekolah.dispendik.surabaya.go.id/umum/sekolah.php?j=SMA&npsn=` + feature.get('npns') + `">klik disini</a>`;
        }
    }
};

map.on('singleclick', function(evt) {
    var coordinate = evt.coordinate;
    infoSMA(evt.pixel);
    overlay.setPosition(coordinate);
});

map.addOverlay(overlay);