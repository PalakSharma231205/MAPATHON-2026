/* ============================================================================
   MAPATHON GEE TEMPLATE
   02_Indices.js

   PURPOSE:
   Calculate commonly useful Sentinel-2 spectral indices.

   INPUT:
   composite

   OUTPUT:
   NDVI
   NDWI
   MNDWI
   NDBI
   NDMI
   NBR
   ============================================================================ */


/* ============================================================================
   1. NDVI — VEGETATION
   ============================================================================ */

var ndvi = composite
  .normalizedDifference([
    'B8',
    'B4'
  ])
  .rename('NDVI');


/* ============================================================================
   2. NDWI — WATER
   ============================================================================ */

var ndwi = composite
  .normalizedDifference([
    'B3',
    'B8'
  ])
  .rename('NDWI');


/* ============================================================================
   3. MNDWI — MODIFIED WATER INDEX
   ============================================================================ */

var mndwi = composite
  .normalizedDifference([
    'B3',
    'B11'
  ])
  .rename('MNDWI');


/* ============================================================================
   4. NDBI — BUILT-UP
   ============================================================================ */

var ndbi = composite
  .normalizedDifference([
    'B11',
    'B8'
  ])
  .rename('NDBI');


/* ============================================================================
   5. NDMI — VEGETATION / MOISTURE
   ============================================================================ */

var ndmi = composite
  .normalizedDifference([
    'B8',
    'B11'
  ])
  .rename('NDMI');


/* ============================================================================
   6. NBR — BURNED AREA
   ============================================================================ */

var nbr = composite
  .normalizedDifference([
    'B8',
    'B12'
  ])
  .rename('NBR');


/* ============================================================================
   7. ADDITIONAL SPECTRAL RATIOS
   ============================================================================ */

var greenSwir = composite.expression(
  'GREEN / (SWIR + 0.0001)',
  {
    GREEN: composite.select('B3'),
    SWIR: composite.select('B11')
  }
).rename('GREEN_SWIR');


var nirSwir = composite.expression(
  'NIR / (SWIR + 0.0001)',
  {
    NIR: composite.select('B8'),
    SWIR: composite.select('B11')
  }
).rename('NIR_SWIR');


/* ============================================================================
   8. DISPLAY SELECTED INDICES
   ============================================================================ */

Map.addLayer(
  ndvi,
  {
    min: -1,
    max: 1
  },
  'NDVI',
  false
);


Map.addLayer(
  ndwi,
  {
    min: -1,
    max: 1
  },
  'NDWI',
  false
);


Map.addLayer(
  mndwi,
  {
    min: -1,
    max: 1
  },
  'MNDWI',
  false
);


Map.addLayer(
  ndbi,
  {
    min: -1,
    max: 1
  },
  'NDBI',
  false
);


/* ============================================================================
   9. PRINT
   ============================================================================ */

print(
  'Spectral indices created:'
);

print(
  [
    'NDVI',
    'NDWI',
    'MNDWI',
    'NDBI',
    'NDMI',
    'NBR',
    'GREEN_SWIR',
    'NIR_SWIR'
  ]
);