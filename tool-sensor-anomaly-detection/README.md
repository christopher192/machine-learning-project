### Wafer - Anomaly Detection

#### Introduction
This project is focused to identify anomalies in semiconductor wafer manufacturing data. Anomalies in wafer fabrication can lead to significant production issues, affecting yield and cost. By leveraging machine learning techniques, this project aims to detect such anomalies early in the process, ensuring quality control and minimizing waste.

#### 1. Data Preprocessing
 - Rename column
    1. Columns will be renamed to be readable.
 - Handling missing value
    1. There are 14,844 rows, columns containing 14,844 `null` will be eliminated.
    2. Columns containing 14,388 `null` and the rest hold unuseful data will be eliminated.
    3. Columns containing only a single value will be eliminated as it do not provide useful information for analysis.
    4. Given sufficent dataset, rows containing `null` values will be removed, resulting in total of 14,388 rows.

#### 2. Exploratory Data Analysis
2.1. Time Series Analytics (Tool Sensor)
![alt text](image/image-1.png)

2.2. Categorical Variable Analysis
![alt text](image/image-2.png)

2.3. Relation Between Run, Run Start Time (Second) and Data Quality
<br>There exists a positive correlation among `run`, `run_start_time`, and `data_quality`. As the `run` number increases, both `run_start_time` and `data_quality` show an upward trend. For analytical purposes, `run_start_time` is converted into seconds and represented in a new column `run_start_time_second`.
![alt text](image/image-3.png)

#### 3. Feature Engineering
 - Data transformation
    1. Given the high number of features, one hot encoding is impractical.
    2. Label encoding is used for converting categorical data into a numerical format.
 - Data extraction

#### 4. Feature Selection
#### 5. Hyperparameter Tuning
#### 6. Model training
- Isolated forest
- One class SVM
#### 7. Model prediction
#### 8. Anomaly detection
#### 9. Model explainability

#### Result