## Interview Test

### Dataset Guildance
| **Variable**               | **Remarks**                                                                                 | **Target/Threshold**                   |
|----------------------------|---------------------------------------------------------------------------------------------|----------------------------------------|
| **Oil Extraction Rate (OER) %** | The output to be forecasted.                                                              | Acceptable threshold: 19% and above    |
| **Crop Freshness Score**   | When the crops processed are fresher, the OER% improves.                                     | Acceptable threshold: 280 and above    |
| **Ripe %**                 | A higher ripe % leads to higher OER%.                                                       | Acceptable threshold: 90% and above    |
| **Long Stalk %**           | Higher long stalk % means lesser oil extracted.                                             | Acceptable threshold: 5% and below     |
| **Rat Damage %**           | The more damage to the fruits caused by rat bites, the lower the OER.                       | Acceptable threshold: 5% and below     |
| **Loose Fruits %**         | More loose fruits mean more oil can be extracted because they have a higher oil content-to-weight ratio. | Acceptable threshold: 8% and above     |
| **Rainfall (mm)**          | Heavy rainfall reduces OER%. 25mm/day is considered heavy rainfall.                         | Optimal rainfall level: 150mm/month (~5mm/day) |
| **Age Profile (years)**    | Higher age profile causes lower OER%.                                                      | N/A                                    |
| **Total Oil Loss (OL)**    | The lower the OL%, the higher the OER%.                                                     | Acceptable threshold: 1.40 and below  |
| **Downtime %**             | The higher the downtime %, the lower the OER%.                                               | Acceptable threshold: 6% and below     |
| **FFB Processed MT**       | Fresh Fruit Bunch - Higher FFB processed, higher utilization rate, higher OER.              | N/A                                    |
| **Seed Type**              | Seed A + Seed B + Other Seeds = 100%.                                                      | N/A                                    |
| **Topography**             | Coastal % + Inland % = 100%.   | N/A                                    |

### Assignment Overview
You will receive a dataset in Excel format. Your task is to:

### Develop a Predictive Model
- Build a model to predict the Oil Extraction Rate (OER) by mills using the provided factors.
- Choose any modelling technique or algorithm that you find most appropriate (e.g., regression, decision trees, machine learning).
- Focus on both accuracy and interpretability.

### Document Your Thought Process
- Submit a write-up detailing your approach to building the predictive model, including the rationale for your choice of algorithm, key assumptions, and challenges encountered.
- Clearly explain how you validated the model and how its results could be applied in a real-world business context.

### Highlight Insights
- Analyze and present meaningful insights from the data, such as which factors most significantly influence OER.

### Submission Requirements
#### Deadline
You will have 72 hours to complete this assignment from the time the dataset is shared with you. Please inform us of your preferred day to receive the dataset. You will be receiving the dataset from (x am – xpm) on your preferred working day.

#### Deliverables
The model code (in Python, R, or any tool/language of your choice) and outputs.
Documentation (in Word or PDF format) outlining your thought process.
A summary of key insights and recommendations.

#### Evaluation Criteria
Your submission will be assessed on:
- The effectiveness, accuracy, and appropriateness of your predictive model.
- Analytical depth in explaining which factors drive OER performance.
- Business relevance and practicality of your insights and recommendations.
- Clarity, structure, and thoroughness of your documentation.

### Step By Step
1. Understand Dataset
    - Date and Temporal Variables
        - `Day`: Day of the week.
        - `Date`: Exact date of the record.
    - Location & Operational Variables
        - `Region`, `Mill Code`: Identifies the location and specific mill.
        - `Mill Type`: Operational category of the mill.
    - Quality & Crop Characteristics
        - `Crop Freshness Score`:  Indicates the freshness of processed fruits, a key determinant of OER.
        - `Ripe %`, `Long Stalk %`, `Rat Damage %`: Metrics describing fruit quality.
        - `Loose Fruits %`: Proportion of fruits that fell during transport or harvesting.
    - Environmental & Maturity Data
        - `Rainfall (mm)`: External factor that may impact crop quality.
        - `Age Profile (years)`: Maturity of plantation crops, which can influence oil yield.
    - Efficiency and Loss Metrics
        - `Total Oil Losses %`: Represents oil not extracted, affecting OER.
        - `Downtime %`: Unproductive time during operations.
    - Production Volume and Seed Composition:
        - `FFB Processed (MT)`: Fresh Fruit Bunches processed, reflecting production scale.
        - `Seed A %`, `Seed B %`, `Other Seeds %`: Composition of fruit batches, influencing oil quality.
    - Geographical Features
        - `Coastal %`, `Inland %`: Proportions of crops sourced from coastal vs. inland areas.
    - Target Variable
        - `Actual OER %`: The oil extraction rate, the primary measure of efficiency and performance.
2. Data Cleaning
3. Data Preprocessing
4. Outlier Handling
