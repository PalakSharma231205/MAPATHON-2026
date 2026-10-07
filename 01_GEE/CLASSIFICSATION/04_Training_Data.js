/* ============================================================================
   MAPATHON GEE TEMPLATE
   04_Training_Data.js

   PURPOSE:
   Prepare training polygons / points and extract pixel samples.

   IMPORTANT:
   Replace the example geometries/classes with actual reference data.
   ============================================================================ */


/* ============================================================================
   1. DEFINE TRAINING FEATURES
   ============================================================================ */

/*
   IMPORTANT:

   For the competition, these should ideally come from:

   - field samples
   - reliable reference data
   - manually interpreted satellite imagery
   - existing authoritative GIS datasets

   Example structure:

   class 0 = Water
   class 1 = Vegetation
   class 2 = Built-up
   class 3 = Bare land

   
   PRACTICE ONLY

   The coordinates below are dummy examples.

   DO NOT use them for an actual Mapathon problem.

   Replace them with:
   - field samples
   - authoritative reference data
   - manually verified satellite locations
   - or other reliable reference information.

*/


var waterSamples = ee.FeatureCollection([
  ee.Feature(
    ee.Geometry.Point([79.30, 12.95]),
    {class: 0}
  )
]);


var vegetationSamples = ee.FeatureCollection([
  ee.Feature(
    ee.Geometry.Point([79.32, 12.96]),
    {class: 1}
  )
]);


var builtupSamples = ee.FeatureCollection([
  ee.Feature(
    ee.Geometry.Point([79.34, 12.94]),
    {class: 2}
  )
]);


var bareSamples = ee.FeatureCollection([
  ee.Feature(
    ee.Geometry.Point([79.36, 12.95]),
    {class: 3}
  )
]);


/* ============================================================================
   2. MERGE REFERENCE DATA
   ============================================================================ */

var referenceSamples =
  waterSamples
  .merge(vegetationSamples)
  .merge(builtupSamples)
  .merge(bareSamples);


/* ============================================================================
   3. EXTRACT PIXEL VALUES
   ============================================================================ */

var trainingData =
  featureImage.sampleRegions({

    collection: referenceSamples,

    properties: [
      'class'
    ],

    scale: 10,

    geometries: true

  });


/* ============================================================================
   4. CHECK TRAINING DATA
   ============================================================================ */

print(
  'Reference samples:',
  referenceSamples
);

print(
  'Extracted training pixels:',
  trainingData
);

print(
  'Training pixel count:',
  trainingData.size()
);


/* ============================================================================
   5. RANDOM TRAIN / VALIDATION SPLIT
   ============================================================================ */

var trainingWithRandom =
  trainingData.randomColumn(
    'random',
    42
  );


var trainSet =
  trainingWithRandom.filter(
    ee.Filter.lt(
      'random',
      0.8
    )
  );


var validationSet =
  trainingWithRandom.filter(
    ee.Filter.gte(
      'random',
      0.8
    )
  );


/* ============================================================================
   6. PRINT SPLIT
   ============================================================================ */

print(
  'Training set:',
  trainSet.size()
);

print(
  'Validation set:',
  validationSet.size()
);


/* ============================================================================
   7. DISPLAY REFERENCE SAMPLES
   ============================================================================ */

Map.addLayer(
  referenceSamples,
  {},
  'Training Reference Samples'
);