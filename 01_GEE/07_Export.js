```javascript
/* ============================================================================
   MAPATHON GEE TEMPLATE
   07_Export.js

   PURPOSE:
   Export common GEE outputs to Google Drive.

   IMPORTANT:
   This file assumes that variables such as:

   studyArea
   composite
   featureImage
   rfPrediction
   gtbPrediction
   trainingData

   already exist.

   Uncomment only the exports you actually need.
   ============================================================================ */


/* ============================================================================
   1. EXPORT SETTINGS
   ============================================================================ */

var exportFolder = 'MAPATHON_2026';

var exportScale = 10;


/* ============================================================================
   2. EXPORT SENTINEL-2 COMPOSITE
   ============================================================================ */

/*
Export.image.toDrive({

  image: composite,

  description: 'Sentinel2_Composite',

  folder: exportFolder,

  fileNamePrefix: 'Sentinel2_Composite',

  region: studyArea,

  scale: exportScale,

  maxPixels: 1e13,

  fileFormat: 'GeoTIFF'

});
*/


/* ============================================================================
   3. EXPORT FEATURE STACK
   ============================================================================ */

/*
Export.image.toDrive({

  image: featureImage,

  description: 'Feature_Stack',

  folder: exportFolder,

  fileNamePrefix: 'Feature_Stack',

  region: studyArea,

  scale: exportScale,

  maxPixels: 1e13,

  fileFormat: 'GeoTIFF'

});
*/


/* ============================================================================
   4. EXPORT RANDOM FOREST CLASSIFICATION
   ============================================================================ */

/*
Export.image.toDrive({

  image: rfPrediction,

  description: 'Random_Forest_Classification',

  folder: exportFolder,

  fileNamePrefix: 'Random_Forest_Classification',

  region: studyArea,

  scale: exportScale,

  maxPixels: 1e13,

  fileFormat: 'GeoTIFF'

});
*/


/* ============================================================================
   5. EXPORT GRADIENT TREE BOOST CLASSIFICATION
   ============================================================================ */

/*
Export.image.toDrive({

  image: gtbPrediction,

  description: 'GTB_Classification',

  folder: exportFolder,

  fileNamePrefix: 'GTB_Classification',

  region: studyArea,

  scale: exportScale,

  maxPixels: 1e13,

  fileFormat: 'GeoTIFF'

});
*/


/* ============================================================================
   6. EXPORT TRAINING DATA
   ============================================================================ */

/*
Export.table.toDrive({

  collection: trainingData,

  description: 'Training_Data',

  folder: exportFolder,

  fileNamePrefix: 'Training_Data',

  fileFormat: 'CSV'

});
*/


/* ============================================================================
   7. EXPORT VALIDATION DATA
   ============================================================================ */

/*
Export.table.toDrive({

  collection: validationSet,

  description: 'Validation_Data',

  folder: exportFolder,

  fileNamePrefix: 'Validation_Data',

  fileFormat: 'CSV'

});
*/


/* ============================================================================
   8. EXPORT REFERENCE SAMPLES
   ============================================================================ */

/*
Export.table.toDrive({

  collection: referenceSamples,

  description: 'Reference_Samples',

  folder: exportFolder,

  fileNamePrefix: 'Reference_Samples',

  fileFormat: 'SHP'

});
*/


/* ============================================================================
   9. EXPORT FINAL VECTOR RESULT
   ============================================================================ */

/*
   Example:

   If you have converted a classified raster into polygons,
   place the resulting FeatureCollection in a variable such as:

   finalPolygons

   Then use:

Export.table.toDrive({

  collection: finalPolygons,

  description: 'Final_Polygons',

  folder: exportFolder,

  fileNamePrefix: 'Final_Polygons',

  fileFormat: 'SHP'

});
*/


/* ============================================================================
   10. EXPORT CHECKLIST
   ============================================================================ */

/*
   Before exporting, check:

   [ ] Correct study area
   [ ] Correct CRS / projection
   [ ] Correct scale
   [ ] Correct class values
   [ ] No unnecessary NoData area
   [ ] Correct output name
   [ ] Correct export folder
   [ ] maxPixels sufficient

   After export:

   [ ] Open the file in QGIS
   [ ] Check alignment
   [ ] Check extent
   [ ] Check CRS
   [ ] Check attribute table
   [ ] Check symbology
*/
```