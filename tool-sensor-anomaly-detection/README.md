### Wafer - Anomaly Detection

#### Introduction
This project is focused to identify anomalies in semiconductor wafer manufacturing data. Anomalies in wafer fabrication can lead to significant production issues, affecting yield and cost. By leveraging machine learning techniques, this project aims to detect such anomalies early in the process, ensuring quality control and minimizing waste.

#### 1. Data Preprocessing
 - Rename column
 <br> Columns will be renamed to be readable.
 - Handling missing value
 <br> There are 14,844 rows, columns containing 14,844 `null` will be eliminated.
 <br> Columns containing 14,388 `null` and the rest hold unuseful data will be eliminated.
 <br> Columns containing only a single value will be eliminated as it do not provide useful information for analysis.
 <br> Given sufficent dataset, rows containing `null` values will be removed, resulting in total of 14,388 rows.
#### 2. Feature Engineering
 - Data transformation
 <br> Given the high number of features, one hot encoding is impractical.
 <br> Label encoding is used for converting categorical data into a numerical format.
#### 3. Feature Selection
#### 4. Hyperparameter Tuning
#### 5. Model training
#### 6. Model prediction
#### 7. Anomaly detection
#### 8. Model explainability

#### Result