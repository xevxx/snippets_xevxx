// Create a vector source to hold the tile boundaries
var tileBoundarySource = new ol.source.Vector();
// Define the style for the tile boundaries
var tileBoundaryStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'black', // Color of the outline
    width: 1        // Width of the outline
  })
});

// Create a vector layer using the source
var tileBoundaryLayer = new ol.layer.Vector({
	source: tileBoundarySource,
	style: tileBoundaryStyle
});

// Add the tile boundary layer to the map
mappingLibrary.map.addLayer(tileBoundaryLayer);

      // Assuming you have a vector tile layer at index 1 in your map's layers
var vectorTileLayer = mappingLibrary.map.getLayers().getArray()[XX];

// Implement the updateTileBoundaries function
function updateTileBoundaries() {
  // Clear previous boundaries
  tileBoundarySource.clear();

  // Get the tile grid of the vector tile source
  var tileGrid = vectorTileLayer.getSource().getTileGrid();
	var tileCache = vectorTileLayer.getSource().tileCache;
	//debugger;
  // Loop through each loaded tile and get their extent
  tileCache.forEach(function(tile) {
	  //debugger;
    //if (tile.getState() === 'loaded') {
		if (tile.getState() == 2) {
      // Get the tile extent
      var tileExtent = tileGrid.getTileCoordExtent(tile.tileCoord);

      // Create a feature for this extent
      var tileFeature = new ol.Feature(ol.geom.Polygon.fromExtent(tileExtent));

      // Add the feature to the source
      tileBoundarySource.addFeature(tileFeature);
    }
  });
}

// Set up event listener for tile loading
vectorTileLayer.getSource().on('tileloadend', function() {
  updateTileBoundaries();
});


