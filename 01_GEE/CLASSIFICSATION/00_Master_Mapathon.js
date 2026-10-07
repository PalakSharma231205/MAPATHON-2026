```javascript
// ============================================================
// MAPATHON 2026 - MASTER GEE SCRIPT
// AI/ML Based Thematic Map Generation
// ============================================================
//
// WORKFLOW:
//
// Study Area
//     ↓
// Sentinel-2 preprocessing
//     ↓
// Spectral indices
//     ↓
// Feature stack
//     ↓
// Training samples
//     ↓
// Random Forest
//     ↓
// Gradient Tree Boost
//     ↓
// Accuracy assessment
//     ↓
// Export
//
// IMPORTANT:
// The sample points below are ONLY PRACTICE / TEMPLATE samples.
// They must NOT be used to claim real classification accuracy.
// During the Mapathon, replace them with proper reference/training
// samples appropriate to the problem.
// ============================================================


// ============================================================
// 1. STUDY AREA
// ============================================================

var studyArea = geometry;

Map.centerObject(studyArea, 10);

Map.addLayer(
  studyArea,
  {},
  'Study Area'
);


// ============================================================
// 2. SETTINGS
// ============================================================

var startDate = '2025-01-01';
var endDate = '2026-01-01';

var cloudPercentage = 40;

var exportFolder = 'MAPATHON_2026';

var randomSeed = 42;


// ============================================================
// 3. SENTINEL-2 PREPROCESSING
// ============================================================

// Remove unwanted Sentinel-2 Scene Classification (SCL)
// classes:
//
// 3  = Cloud shadow
// 8  = Cloud medium probability
// 9  = Cloud high probability
// 10 = Thin cirrus
// 11 = Snow / ice

function maskS2(image) {

  var scl = image.select('SCL');

  var mask = scl.neq(3)
    .and(scl.neq(8))
    .and(scl.neq(9))
    .and(scl.neq(10))
    .and(scl.neq(11));

  return image
    .updateMask(mask)
    .divide(10000)
    .copyProperties(image, image.propertyNames());
}


// Load Sentinel-2 Surface Reflectance
var s2 = ee.ImageCollection(
  'COPERNICUS/S2_SR_HARMONIZED'
)
.filterBounds(studyArea)
.filterDate(startDate, endDate)
.filter(
  ee.Filter.lte(
    'CLOUDY_PIXEL_PERCENTAGE',
    cloudPercentage
  )
)
.map(maskS2);


print(
  'Number of Sentinel-2 images:',
  s2.size()
);


// ============================================================
// 4. SENTINEL-2 COMPOSITE
// ============================================================

var composite = s2
  .median()
  .clip(studyArea);


// True-color RGB
Map.addLayer(
  composite,
  {
    bands: ['B4', 'B3', 'B2'],
    min: 0,
    max: 0.3
  },
  'Sentinel-2 RGB'
);


// ============================================================
// 5. SPECTRAL INDICES
// ============================================================

// NDVI
var NDVI = composite
  .normalizedDifference(['B8', 'B4'])
  .rename('NDVI');


// NDWI
var NDWI = composite
  .normalizedDifference(['B3', 'B8'])
  .rename('NDWI');


// MNDWI
var MNDWI = composite
  .normalizedDifference(['B3', 'B11'])
  .rename('MNDWI');


// NDBI
var NDBI = composite
  .normalizedDifference(['B11', 'B8'])
  .rename('NDBI');


// NDMI
var NDMI = composite
  .normalizedDifference(['B8', 'B11'])
  .rename('NDMI');


// NBR
var NBR = composite
  .normalizedDifference(['B8', 'B12'])
  .rename('NBR');


// Green / SWIR ratio
var GREEN_SWIR = composite
  .select('B3')
  .divide(
    composite.select('B11').add(0.0001)
  )
  .rename('GREEN_SWIR');


// NIR / SWIR ratio
var NIR_SWIR = composite
  .select('B8')
  .divide(
    composite.select('B11').add(0.0001)
  )
  .rename('NIR_SWIR');


// ============================================================
// 6. DISPLAY IMPORTANT INDICES
// ============================================================

Map.addLayer(
  NDVI,
  {
    min: -1,
    max: 1,
    palette: ['blue', 'white', 'green']
  },
  'NDVI',
  false
);


Map.addLayer(
  NDWI,
  {
    min: -1,
    max: 1,
    palette: ['brown', 'white', 'blue']
  },
  'NDWI',
  false
);


Map.addLayer(
  MNDWI,
  {
    min: -1,
    max: 1,
    palette: ['brown', 'white', 'blue']
  },
  'MNDWI',
  false
);


Map.addLayer(
  NDBI,
  {
    min: -1,
    max: 1,
    palette: ['green', 'white', 'red']
  },
  'NDBI',
  false
);


// ============================================================
// 7. FEATURE STACK
// ============================================================
//
// Spectral bands:
// B2, B3, B4, B8, B11, B12
//
// Indices:
// NDVI, NDWI, MNDWI, NDBI,
// NDMI, NBR, GREEN_SWIR, NIR_SWIR
//
// Total = 14 features
// ============================================================

var featureImage = composite.select([
  'B2',
  'B3',
  'B4',
  'B8',
  'B11',
  'B12'
])
.addBands(NDVI)
.addBands(NDWI)
.addBands(MNDWI)
.addBands(NDBI)
.addBands(NDMI)
.addBands(NBR)
.addBands(GREEN_SWIR)
.addBands(NIR_SWIR);


// Store feature names once
var bandNames = featureImage.bandNames();

print(
  'Feature stack:',
  featureImage
);

print(
  'Feature names:',
  bandNames
);


// ============================================================
// 8. PRACTICE TRAINING SAMPLES
// ============================================================
//
// These are ONLY dummy examples.
//
// Class labels:
// 0 = Water
// 1 = Vegetation
// 2 = Built-up
// 3 = Bare land
//
// IMPORTANT:
// One point per class is NOT sufficient for a real ML model.
// Replace these with proper training/reference samples during
// the actual Mapathon.
// ============================================================

var waterPoint = ee.Feature(
  ee.Geometry.Point([79.30, 12.95]),
  {class: 0}
);


var vegetationPoint = ee.Feature(
  ee.Geometry.Point([79.32, 12.96]),
  {class: 1}
);


var builtupPoint = ee.Feature(
  ee.Geometry.Point([79.34, 12.94]),
  {class: 2}
);


var barePoint = ee.Feature(
  ee.Geometry.Point([79.36, 12.95]),
  {class: 3}
);


var referenceSamples = ee.FeatureCollection([
  waterPoint,
  vegetationPoint,
  builtupPoint,
  barePoint
]);


Map.addLayer(
  referenceSamples,
  {},
  'Practice Training Samples',
  false
);


// ============================================================
// 9. EXTRACT FEATURE VALUES AT SAMPLE LOCATIONS
// ============================================================

var samples = featureImage.sampleRegions({
  collection: referenceSamples,
  properties: ['class'],
  scale: 10,
  geometries: true
});


print(
  'Sample data:',
  samples
);


// ============================================================
// 10. TRAIN / VALIDATION SPLIT
// ============================================================
//
// 80% → Training
// 20% → Validation
//
// Random seed = 42
// ============================================================

var samplesWithRandom = samples.randomColumn(
  'random',
  randomSeed
);


var trainSet = samplesWithRandom.filter(
  ee.Filter.lt('random', 0.8)
);


var validationSet = samplesWithRandom.filter(
  ee.Filter.gte('random', 0.8)
);


print(
  'Training samples:',
  trainSet.size()
);

print(
  'Validation samples:',
  validationSet.size()
);


// ============================================================
// 11. RANDOM FOREST
// ============================================================

var randomForest = ee.Classifier.smileRandomForest({
  numberOfTrees: 150,
  variablesPerSplit: null,
  minLeafPopulation: 1,
  bagFraction: 0.7,
  seed: randomSeed
});


var rfModel = randomForest.train({
  features: trainSet,
  classProperty: 'class',
  inputProperties: bandNames
});


// ============================================================
// 12. RANDOM FOREST ACCURACY
// ============================================================

var rfValidation = validationSet.classify(
  rfModel
);


var rfConfusionMatrix =
  rfValidation.errorMatrix(
    'class',
    'classification'
  );


print(
  'Random Forest Confusion Matrix:',
  rfConfusionMatrix
);


print(
  'Random Forest Overall Accuracy:',
  rfConfusionMatrix.accuracy()
);


print(
  'Random Forest Kappa:',
  rfConfusionMatrix.kappa()
);


// ============================================================
// 13. RANDOM FOREST CLASSIFICATION
// ============================================================

var rfClassified = featureImage.classify(
  rfModel
);


Map.addLayer(
  rfClassified,
  {
    min: 0,
    max: 3,
    palette: [
      'blue',
      'green',
      'red',
      'yellow'
    ]
  },
  'Random Forest Classification',
  false
);


// ============================================================
// 14. GRADIENT TREE BOOST
// ============================================================
//
// NOTE:
// This is Google's Gradient Tree Boost classifier.
//
// It is NOT the same implementation as Python's XGBoost.
// ============================================================

var gradientTreeBoost =
  ee.Classifier.smileGradientTreeBoost({
    numberOfTrees: 150,
    shrinkage: 0.05,
    samplingRate: 0.7,
    maxNodes: 20,
    loss: 'LeastAbsoluteDeviation',
    seed: randomSeed
  });


var gtbModel = gradientTreeBoost.train({
  features: trainSet,
  classProperty: 'class',
  inputProperties: bandNames
});


// ============================================================
// 15. GRADIENT TREE BOOST ACCURACY
// ============================================================

var gtbValidation =
  validationSet.classify(
    gtbModel
  );


var gtbConfusionMatrix =
  gtbValidation.errorMatrix(
    'class',
    'classification'
  );


print(
  'Gradient Tree Boost Confusion Matrix:',
  gtbConfusionMatrix
);


print(
  'Gradient Tree Boost Overall Accuracy:',
  gtbConfusionMatrix.accuracy()
);


print(
  'Gradient Tree Boost Kappa:',
  gtbConfusionMatrix.kappa()
);


// ============================================================
// 16. GRADIENT TREE BOOST CLASSIFICATION
// ============================================================

var gtbClassified =
  featureImage.classify(
    gtbModel
  );


Map.addLayer(
  gtbClassified,
  {
    min: 0,
    max: 3,
    palette: [
      'blue',
      'green',
      'red',
      'yellow'
    ]
  },
  'Gradient Tree Boost Classification',
  false
);


// ============================================================
// 17. EXPORT FEATURE STACK
// ============================================================
//
// Uncomment when you actually need the export.
//
// Avoid creating unnecessary export tasks during the Mapathon.
// ============================================================

// Export.image.toDrive({
//   image: featureImage,
//   description: 'Mapathon_Feature_Stack',
//   folder: exportFolder,
//   region: studyArea,
//   scale: 10,
//   maxPixels: 1e13,
//   fileFormat: 'GeoTIFF',
//   formatOptions: {
//     cloudOptimized: true
//   }
// });


// ============================================================
// 18. EXPORT RANDOM FOREST CLASSIFICATION
// ============================================================

// Export.image.toDrive({
//   image: rfClassified,
//   description: 'Mapathon_Random_Forest',
//   folder: exportFolder,
//   region: studyArea,
//   scale: 10,
//   maxPixels: 1e13,
//   fileFormat: 'GeoTIFF',
//   formatOptions: {
//     cloudOptimized: true
//   }
// });


// ============================================================
// 19. EXPORT GRADIENT TREE BOOST CLASSIFICATION
// ============================================================

// Export.image.toDrive({
//   image: gtbClassified,
//   description: 'Mapathon_Gradient_Tree_Boost',
//   folder: exportFolder,
//   region: studyArea,
//   scale: 10,
//   maxPixels: 1e13,
//   fileFormat: 'GeoTIFF',
//   formatOptions: {
//     cloudOptimized: true
//   }
// });


// ============================================================
// 20. EXPORT TRAINING SAMPLES
// ============================================================

// Export.table.toDrive({
//   collection: trainSet,
//   description: 'Mapathon_Training_Samples',
//   folder: exportFolder,
//   fileFormat: 'SHP'
// });


// ============================================================
// 21. EXPORT VALIDATION SAMPLES
// ============================================================

// Export.table.toDrive({
//   collection: validationSet,
//   description: 'Mapathon_Validation_Samples',
//   folder: exportFolder,
//   fileFormat: 'SHP'
// });


// ============================================================
// 22. FINAL REMINDER
// ============================================================
//
// BEFORE SUBMISSION:
//
// [ ] Correct study area
// [ ] Correct date range
// [ ] Appropriate satellite/data source
// [ ] Correct preprocessing
// [ ] Relevant features only
// [ ] Proper training/reference samples
// [ ] Train/validation split
// [ ] Accuracy checked
// [ ] Final map exported
// [ ] QGIS layout created
// [ ] Methodology documented
// [ ] Results and limitations documented
//
// DO NOT claim high accuracy from the dummy practice samples.
// ============================================================

print(
  'MAPATHON MASTER SCRIPT READY'
);
```


```text
01_GEE
├── README.txt
├── 00_Master_Mapathon.js              ← polished now
├── 01_Sentinel2_Preprocessing.js
├── 02_Indices.js
├── 03_Feature_Stack.js
├── 04_Training_Data.js
├── 05_Random_Forest_Template.js
├── 06_Gradient_Tree_Boost_Template.js
└── 07_Export.js
```
