<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/ol.css" type="text/css">
    <script src="js/ol.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>

<body>
    <span>Pilih map:</span>
    <select id="pilih" onchange="pilih_bg(this.value)">
        <option value="osm">OpenStreet Map</option>
        <option value="bing_aerial">Bing Aerial</option>
    </select>
    <div id="map" class="map"></div>
    <script src="js/app.js"></script>
</body>

</html>