```javascript
/* ============================================================================
   MAPATHON GEE TEMPLATE
   01_Sentinel2_Preprocessing.js

   PURPOSE:
   Prepare a Sentinel-2 composite for any study area.

   OUTPUT:
   - studyArea
   - Sentinel-2 image collection
   - Sentinel-2 median composite
   ============================================================================ */


/* ============================================================================
   1. STUDY AREA
   ============================================================================ */

/*
   OPTION A:
   Draw/import your own geometry in the GEE Code Editor.

   For practice, create a geometry and name it:

   studyArea

   Example:
   var studyArea = geometry;
*/

// -----------------------------------------------------------------------------
// TEMPORARY EXAMPLE
// Replace this with your actual study area.
// -----------------------------------------------------------------------------

var studyArea = geometry;


/* ============================================================================
   2. USER PARAMETERS
   ============================================================================ */

var startDate = '2025-01-01';

var endDate = '2026-01-01';

var cloudThreshold = 40;


/* ============================================================================
   3. SENTINEL-2 CLOUD MASK
   ============================================================================ */

function maskS2sr(image) {

  var scl = image.select('SCL');

  /*
     SCL classes removed:

     3  = Cloud shadow
     8  = Medium probability cloud
     9  = High probability cloud
     10 = Cirrus
     11 = Snow / ice
  */

  var mask = scl.neq(3)
    .and(scl.neq(8))
    .and(scl.neq(9))
    .and(scl.neq(10))
    .and(scl.neq(11));

  return image
    .updateMask(mask)
    .divide(10000)
    .copyProperties(
      image,
      [
        'system:time_start',
        'CLOUDY_PIXEL_PERCENTAGE'
      ]
    );
}


/* ============================================================================
   4. LOAD SENTINEL-2
   ============================================================================ */

var s2 = ee.ImageCollection(
  'COPERNICUS/S2_SR_HARMONIZED'
)
.filterBounds(studyArea)
.filterDate(
  startDate,
  endDate
)
.filter(
  ee.Filter.lte(
    'CLOUDY_PIXEL_PERCENTAGE',
    cloudThreshold
  )
)
.map(maskS2sr);


/* ============================================================================
   5. CHECK IMAGE COUNT
   ============================================================================ */

var imageCount = s2.size();

print(
  'Sentinel-2 image count:',
  imageCount
);


/* ============================================================================
   6. CREATE MEDIAN COMPOSITE
   ============================================================================ */

var composite = s2
  .median()
  .clip(studyArea);


/* ============================================================================
   7. DISPLAY RGB
   ============================================================================ */

Map.centerObject(
  studyArea,
  10
);

Map.addLayer(
  composite,
  {
    bands: [
      'B4',
      'B3',
      'B2'
    ],
    min: 0,
    max: 0.3
  },
  'Sentinel-2 RGB'
);


/* ============================================================================
   8. DISPLAY STUDY AREA
   ============================================================================ */

Map.addLayer(
  studyArea,
  {
    color: 'FFFFFF'
  },
  'Study Area'
);


/* ============================================================================
   9. INFORMATION
   ============================================================================ */

print(
  'Study area:',
  studyArea
);

print(
  'Start date:',
  startDate
);

print(
  'End date:',
  endDate
);

print(
  'Cloud threshold:',
  cloudThreshold
);

print(
  'Sentinel-2 composite:',
  composite
);


/* ============================================================================
   10. IMPORTANT
   ============================================================================ */

/*
   This file only prepares Sentinel-2 imagery.

   Do NOT add:
   - NDVI
   - NDWI
   - MNDWI
   - NDBI
   - Machine learning
   - Training samples
   - Classification

   Those are handled in later files.
*/
```