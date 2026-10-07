/* ============================================================================
   MAPATHON GEE TEMPLATE
   06_XGBoost_Template.js

   PURPOSE:
   Train Gradient Tree Boost classifier.

   NOTE:
   Google Earth Engine's classifier is called:

   smileGradientTreeBoost

   It is Gradient Tree Boost, not the Python XGBoost library.
   ============================================================================ */


/* ============================================================================
   1. GRADIENT TREE BOOST CLASSIFIER
   ============================================================================ */

var gtbClassifier =
  ee.Classifier.smileGradientTreeBoost({

    numberOfTrees: 150,

    shrinkage: 0.05,

    samplingRate: 0.7,

    maxNodes: 20,

    loss: 'LeastAbsoluteDeviation',

    seed: 42

  })
  .train({

    features: trainSet,

    classProperty: 'class',

    inputProperties: bandNames

  });


/* ============================================================================
   2. VALIDATION
   ============================================================================ */

var gtbValidated =
  validationSet.classify(
    gtbClassifier
  );


var gtbMatrix =
  gtbValidated.errorMatrix(
    'class',
    'classification'
  );


print(
  '============================================================'
);

print(
  'GRADIENT TREE BOOST CONFUSION MATRIX:',
  gtbMatrix
);

print(
  'GRADIENT TREE BOOST ACCURACY:',
  gtbMatrix.accuracy()
);

print(
  'GRADIENT TREE BOOST KAPPA:',
  gtbMatrix.kappa()
);

print(
  '============================================================'
);


/* ============================================================================
   3. CLASSIFY ENTIRE IMAGE
   ============================================================================ */

var gtbPrediction =
  featureImage
  .classify(
    gtbClassifier
  )
  .rename(
    'GTB_Classification'
  );


/* ============================================================================
   4. DISPLAY
   ============================================================================ */

Map.addLayer(
  gtbPrediction,
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
  'Gradient Tree Boost Classification'
);


/* ============================================================================
   5. PRINT MODEL
   ============================================================================ */

print(
  'Gradient Tree Boost classifier:',
  gtbClassifier
);