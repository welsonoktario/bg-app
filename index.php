<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Home</title>
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/ol.css" type="text/css">
	<script src="js/ol.js"></script>
	<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>

<body>
	<h1 class="text-2xl text-center font-bold">Agensi Property</h1>
	<div class="p-4">
		<span class="mr-2">Pilih map:</span>
		<select class="border-grey-100" id="pilih" onchange="pilih_bg(this.value)">
			<option value="osm">OpenStreet Map</option>
			<option value="bing_aerial">Bing Aerial</option>
		</select>
	</div>
	<div id="map" class="map"></div>
	<div id="popup" class="bg-white p-4 rounded-md shadow w-64">
		<a href="#" id="popup-closer" class="ol-popup-closer"></a>
		<div id="popup-content" class="flex flex-col"></div>
	</div>
	<script src="js/app.js"></script>
</body>

</html>