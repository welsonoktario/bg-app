//START POPUP
var container = document.getElementById("popup");
var content = document.getElementById("popup-content");
var closer = document.getElementById("popup-closer");

var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250,
    },
});

closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};
//END POPUP
var textPoi = function(feature, resolution) {
    var jenis = feature.get("jenis");
    switch (jenis) {
        case 1:
            return new ol.style.Text({
                textAlign: "center",
                textBaseline: "middle",
                font: "8px Verdana",
                text: feature.get("nama"),
                fill: new ol.style.Fill({
                    color: "#B4436C",
                }),
            });
        case 2:
            return new ol.style.Text({
                textAlign: "center",
                textBaseline: "middle",
                font: "8px Verdana",
                text: feature.get("nama"),
                fill: new ol.style.Fill({
                    color: "#D7263D",
                }),
            });
        case 4:
            return new ol.style.Text({
                textAlign: "center",
                textBaseline: "middle",
                font: "8px Verdana",
                text: feature.get("nama"),
                fill: new ol.style.Fill({
                    color: "#0197F6",
                }),
            });
        case 5:
            return new ol.style.Text({
                textAlign: "center",
                textBaseline: "middle",
                font: "8px Verdana",
                text: feature.get("nama"),
                fill: new ol.style.Fill({
                    color: "#4D9078",
                }),
            });
        default:
            break;
    }
};

var stylePoi = function() {
    return function(feature, resolution) {
        var jenis = feature.get("jenis");
        switch (jenis) {
            case 1:
                var tmp = new ol.style.Style({
                    text: textPoi(feature, resolution),
                    image: new ol.style.Icon({
                        anchor: [0.5, 1],
                        anchorXUnits: "fraction",
                        anchorYUnits: "fraction",
                        src: "assets/img/mall.png",
                    }),
                });
                break;
            case 2:
                var tmp = new ol.style.Style({
                    text: textPoi(feature, resolution),
                    image: new ol.style.Icon({
                        anchor: [0.5, 1],
                        anchorXUnits: "fraction",
                        anchorYUnits: "fraction",
                        src: "assets/img/restoran.png",
                    }),
                });
                break;
            case 4:
                var tmp = new ol.style.Style({
                    text: textPoi(feature, resolution),
                    image: new ol.style.Icon({
                        anchor: [0.5, 1],
                        anchorXUnits: "fraction",
                        anchorYUnits: "fraction",
                        src: "assets/img/pasar.png",
                    }),
                });
                break;
            case 5:
                var tmp = new ol.style.Style({
                    text: textPoi(feature, resolution),
                    image: new ol.style.Icon({
                        anchor: [0.5, 1],
                        anchorXUnits: "fraction",
                        anchorYUnits: "fraction",
                        src: "assets/img/wisata.png",
                    }),
                });
                break;
            default:
                break;
        }
        return [tmp];
    };
};

var styleProperty = function() {
    return function(feature, resolution) {
        var tmp = new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                anchorXUnits: "fraction",
                anchorYUnits: "fraction",
                src: "assets/img/property.png",
            }),
        });
        return [tmp];
    };
};


var poi = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON({
            defaultDataProjection: "EPSG:4326",
        }),
        url: "http://localhost:8000/api/poi",
    }),
    visible: true,
    style: stylePoi(),
});

var property = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON({
            defaultDataProjection: "EPSG:4326",
        }),
        url: "http://localhost:8000/api/property",
    }),
    visible: true,
    style: styleProperty(),
});

var sourceBingMaps = new ol.source.BingMaps({
    key: "Aknmwjgi0dQOfBK8hp_Yx6kg4xJntd3wxpSs1zod5-EaBpR9gCVvMFbw80L7xCN_",
    imagerySet: "Aerial",
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
    target: "map",
    controls: [
        //Define the default controls
        new ol.control.Zoom(),
        new ol.control.Rotate(),
        new ol.control.Attribution(),
        //Define some new controls
        new ol.control.ZoomSlider(),
        new ol.control.MousePosition(),
        new ol.control.ScaleLine(),
        new ol.control.OverviewMap(),
    ],
    layers: [osm, bing_aerial, poi, property],
    view: new ol.View({
        center: ol.proj.fromLonLat([112.75083, -7.24917]),
        zoom: 13,
    }),
});

function pilih_bg(pilih) {
    if (pilih == "osm") {
        osm.setVisible(true);
        bing_aerial.setVisible(false);
    }
    if (pilih == "bing_aerial") {
        osm.setVisible(false);
        bing_aerial.setVisible(true);
    }
}

// on click
var infoProperty = function(pixel) {
    var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
        return feature;
    });
    if (feature) {
        if (feature.get("harga")) {
            var jenis = "";
            switch (feature.get("jenis")) {
                case 1:
                    jenis = "Rumah";
                    break;
                case 2:
                    jenis = "Ruko";
                    break;
                case 3:
                    jenis = "Gudang";
                    break;
                case 4:
                    jenis = "Kantor";
                    break;
                case 5:
                    jenis = "Tanah";
                    break;
                default:
                    break;
            }
            content.innerHTML = `
				<div>Jenis: ${jenis}</div><div>Jenis: ${jenis}</div>
				<div>Harga: ${feature.get("harga")}</div>
				<div>Luas Bangunan: ${feature.get("lb")}</div>
				<div>Luas Tanah: ${feature.get("lt")}</div>
				<div class="text-center mt-2 bg-grey-100"><a href="detail.php?id=${feature.get(
					"id"
				)}">Detail</a></div>
			`;
        }
    } else {
        content.innerHTML = 'tidak ada property terpilih';
    }
};

map.on("singleclick", function(evt) {
    var coordinate = evt.coordinate;
    infoProperty(evt.pixel);
    overlay.setPosition(coordinate);
});

map.addOverlay(overlay);