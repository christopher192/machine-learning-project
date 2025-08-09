### Wafer - Anomaly Detection

#### 1. Introduction
This project is focused to identify anomalies in semiconductor wafer manufacturing data. Anomalies in wafer fabrication can lead to significant production issues, affecting yield and cost. By leveraging machine learning techniques, this project aims to detect such anomalies early in the process, ensuring quality control and minimizing waste.

#### 2. Dataset Insight
Process & Time Information
   - `timestamp` – Date and time of the wafer run
   - `run_start_time` - Local time when the run started (HH:MM:SS format)
   - `run` - Run number identifier for the wafer process instance

Equipment Identification
   - `tool_name` – Name/code of the equipment used
   - `tool_id` – Numeric or coded identifier for the tool
   -  `eqp_type` - Type/category of the equipment

Data Quality & Annotation
   - `data_quality` – Quality score for the run`s collected data
   -  `has_comments` – Indicator (0/1) if operator comments are attached

Lot & Recipe Detail
   - `lot_id` – Identifier for the wafer lot (batch)
   - `logical_recipe_id` – ID for the logical process recipe
   - `machine_recipe_id` – ID for the recipe as executed on the machine
   - `physical_recipe_id` – ID for the physical recipe file used
   - `recipe_id` – General recipe identifier
   - `lot_purpose_type` – Purpose of the lot
   - `lot_type` – Type of lot

Manufacturing Flow
   - `port_id` – Port on the tool where wafers are loaded
   - `process_op_num` – Process operation number in the route
   - `product_grp_id` – Product group ID
   - `product_id` – Product identifier
   - `route_id` – Route or flow ID for the manufacturing process
   - `technology` – Technology type

Wafer & Reticle
   - `wafer_id` – Unique identifier for each wafer
   - `reticle_id` – Identifier for the reticle (mask) used in lithography

Sensor Measurement
   - `tool_sensor_1` – `tool_sensor_52` – Numeric sensor readings collected during the run (temperature, pressure, flow rates, etc)

Event Information
   - `event_type` – Type of event
   - `event_name` – Name of the event
   - `event_id` – Event identifier
   - `event_source` – Source that generated the event
   - `event_description` – Description of the event

Alarm Information
   - `alarm_code` – Code for any alarm triggered
   - `alarm_status` – Status of the alarm

Process Calculation
   - `calc_step_seq` – Calculated process step sequence
   - `calc_loop_seq` – Calculated loop sequence number
   - `run_tag` – Tag for the run

Unused Column
   - `unnamed_85` – `unnamed_89` – Empty column with no data

#### 3. Data Preprocessing
 - Rename column step
   - All column will be renamed to readable, descriptive names to improve clarity during analysis
 - Handling missing value
   - Columns with 14,844 missing entries (completely empty) will be eliminated as provide no information
      - Target column: `reticle_id`, `event_source`, `event_description`, `alarm_code`, `alarm_status`, `tool_sensor_47` – `tool_sensor_52`, `run_tag`, and `unnamed_85` – `unnamed_89`
      - Action taken: Removed
   - High Missingness
      - `event_type`, `event_name`, `event_id` contain 14,388 null
         - `event_type`: EndOfRun, EndOfStart
         - `event_name`, `event_id`: WaferStart, WaferEnd
      - Action taken: Removed
   - Partial Missing Value
      - `tool_sensor_1` – `tool_sensor_46` have 456 missing value
      - `tool_sensor_42` has 228 missing value
      - `calc_step_seq` & `calc_loop_seq` also have 228 missing values
      - Action taken: Remove row with remaining null to get a clean dataset of 14,388 row because have sufficient dataset
- Constant feature handling
   - Column containing only a single value will be eliminated as it do not provide useful information for analysis
   - Target column: `tool_name`, `tool_id`, `eqp_type`, `has_comments`, `logical_recipe_id`, `lot_purpose_type`, `lot_type`, `tool_sensor_2`, `tool_sensor_3`, `tool_sensor_4`, `tool_sensor_22`, `tool_sensor_27`, `tool_sensor_28`, `tool_sensor_29`, `tool_sensor_30`, `tool_sensor_31`, `tool_sensor_32`, `tool_sensor_33`, `tool_sensor_41`, `tool_sensor_46`

#### 4. Exploratory Data Analysis
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