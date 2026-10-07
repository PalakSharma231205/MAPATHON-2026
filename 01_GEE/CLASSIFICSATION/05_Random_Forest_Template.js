/* ============================================================================
   MAPATHON GEE TEMPLATE
   05_Random_Forest_Template.js

   PURPOSE:
   Train a Random Forest classifier and generate a thematic map.
   ============================================================================ */


/* ============================================================================
   1. RANDOM FOREST CLASSIFIER
   ============================================================================ */

var rfClassifier =
  ee.Classifier.smileRandomForest({

    numberOfTrees: 150,

    variablesPerSplit: null,

    minLeafPopulation: 1,

    bagFraction: 0.7,

    seed: 42

  })
  .train({

    features: trainSet,

    classProperty: 'class',

    inputProperties: bandNames

  });


/* ============================================================================
   2. VALIDATE
   ============================================================================ */

var rfValidated =
  validationSet.classify(
    rfClassifier
  );


var rfMatrix =
  rfValidated.errorMatrix(
    'class',
    'classification'
  );


print(
  '============================================================'
);

print(
  'RANDOM FOREST CONFUSION MATRIX:',
  rfMatrix
);

print(
  'RANDOM FOREST ACCURACY:',
  rfMatrix.accuracy()
);

print(
  'RANDOM FOREST KAPPA:',
  rfMatrix.kappa()
);

print(
  '============================================================'
);


/* ============================================================================
   3. CLASSIFY ENTIRE FEATURE IMAGE
   ============================================================================ */

var rfPrediction =
  featureImage
  .classify(
    rfClassifier
  )
  .rename(
    'RF_Classification'
  );


/* ============================================================================
   4. DISPLAY
   ============================================================================ */

Map.addLayer(
  rfPrediction,
  {
    min: 0,
    max: 3,
    palette: [
      '0066FF',
      '00AA00',
      'FF0000',
      'FFFF00'
    ]
  },
  'Random Forest Classification'
);


/* ============================================================================
   5. FEATURE IMPORTANCE
   ============================================================================ */

print(
  'Random Forest classifier:',
  rfClassifier
);