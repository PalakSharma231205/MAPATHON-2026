Google Earth Engine scripts: satellite data, indices, feature preparation and ML.
```text
MAPATHON 2026 — GEE TOOLKIT
============================

PURPOSE
-------
This folder contains reusable Google Earth Engine templates
for remote sensing, feature engineering, machine learning,
validation and data export.

The templates are designed to be adapted to different
Mapathon problems.


FOLDER WORKFLOW
---------------

01_Sentinel2_Preprocessing.js
        ↓
02_Indices.js
        ↓
03_Feature_Stack.js
        ↓
04_Training_Data.js
        ↓
05_Random_Forest_Template.js
        ↓
06_Gradient_Tree_Boost_Template.js
        ↓
07_Export.js


MASTER SCRIPT
-------------

00_Master_Mapathon.js

This is the quick-start standalone script.

Use it when:
- the problem is suitable for Sentinel-2
- you need a complete workflow quickly
- you do not want to open several files

The numbered files should be used when you want
to understand, modify or reuse individual parts.


IMPORTANT
---------

The examples in these files are templates.

Always replace:

- study area
- dates
- cloud threshold
- training samples
- class definitions
- feature selection
- model parameters

according to the actual Mapathon problem.


COMMON DATASETS
---------------

Sentinel-2:
COPERNICUS/S2_SR_HARMONIZED

Sentinel-1:
COPERNICUS/S1_GRD

Landsat:
LANDSAT/LC08/C02/T1_L2
LANDSAT/LC09/C02/T1_L2

DEM:
USGS/SRTMGL1_003

Global Surface Water:
JRC/GSW1_4/GlobalSurfaceWater

WorldCover:
ESA/WorldCover/v200


COMMON INDICES
--------------

NDVI  → vegetation
NDWI  → water
MNDWI → water
NDBI  → built-up
NDMI  → moisture
NBR   → burned area


ML OPTIONS
----------

Random Forest:
ee.Classifier.smileRandomForest()

Gradient Tree Boost:
ee.Classifier.smileGradientTreeBoost()

Use ML only when the problem requires classification,
prediction or another suitable learning task.


TRAINING DATA
-------------

Never use the placeholder coordinates in the templates
as actual competition training data.

Use reliable reference information such as:

- field observations
- verified sample locations
- authoritative datasets
- carefully interpreted satellite imagery


VALIDATION
----------

Always check model performance.

Useful metrics:

- Confusion Matrix
- Overall Accuracy
- Kappa
- Producer's Accuracy
- Consumer's Accuracy
- Precision
- Recall
- F1-score


EXPORT
------

Common outputs:

- GeoTIFF
- CSV
- SHP / GeoJSON
- classified raster
- training/validation samples


IMPORTANT MAPATHON RULE
----------------------

Do not use AI/ML simply because the competition title
contains "AI/ML".

First understand the problem.

Use the simplest scientifically defensible method
that produces the required result.


FINAL WORKFLOW
--------------

Problem
   ↓
Study Area
   ↓
Data
   ↓
Preprocessing
   ↓
Features / Indices
   ↓
Analysis
   ↓
ML if required
   ↓
Validation
   ↓
Final Raster / Vector
   ↓
QGIS
   ↓
Thematic Map
```