## Machine Learning Project - 1

### About The Data & Exercise
- Columns 0 – 253 represent input variable and target represents target variable.
- Goal is to use the input variables to correctly identify or predict target variable.
- Usage of Python and Jupyter notebook for completing this exercise is preferred but if you are not comfortable, feel free to provide source code and summary in email.
- Please summarize your thought and analytics under following sections.
- Preliminary analysis is required before developing prediction models, you may summarize your findings.
- Your choice of analytical algorithms, various steps taken during analytics, any comparisons between other algorithms and your understanding of how this model is performing.
- Your final choice of model and summary.

### Short Summary Report
- The dataset contains 254 columns, with 253 feature columns and 1 target column.
- Preliminary data inspection revealed the presence of non-numeric values (e.g., #NUM!) and missing values across several features.
- Columns with more than 30% missing values were automatically dropped to maintain data integrity.
- For the remaining columns, missing values were filled based on feature skewness:
    - If the feature was highly skewed (skewness > 1 or < -1), missing values were filled with the median.
    - Otherwise, missing values were filled with the mean.
- Skewness distribution was analyzed, and the top 10 most skewed features were visualized.
- After cleaning, feature scaling was applied using StandardScaler to normalize feature distributions before model training.

### Analytical Algorithms and Steps
- Three machine learning algorithms were selected for modeling:
    - Logistic Regression: Used as a simple linear baseline model.
    - Random Forest Classifier: An ensemble method based on bagging decision trees.
    - XGBoost Classifier: A powerful gradient boosting framework for potentially better performance on structured data.
- Models were trained using an 80-20 train-test split, stratified on the target variable to preserve class distribution.
- Performance evaluation was based on:
    - Accuracy
    - Precision, Recall, F1-score (via Classification Report)
    - Confusion Matrix (for understanding per-class performance)

### Model Comparison and Performance Understanding
- Logistic Regression
    - Achieved a high overall accuracy of approximately 92.97%.
    - Performed well on the majority class but struggled significantly with minority classes, especially Classes 1, 3, and 4, where precision and recall were low.
    - Minority class predictions were inconsistent, reflecting difficulty due to severe class imbalance.
- Random Forest
    - Reached a higher overall accuracy of 98.24%.
    - Predicted the major class (Class 0) extremely well with near-perfect precision and recall.
    - However, failed completely to predict minority classes (Classes 1, 3, and 4), resulting in precision and recall scores of zero for these classes.
- XGBoost
    - Achieved the best overall accuracy at 99.02%.
    - Maintained strong performance on the major class and showed significantly better generalization to minority classes compared to both Logistic Regression and Random Forest.
    - Despite some weaknesses in recall for very small classes, XGBoost managed to make correct predictions for Classes 1, 3, and 4, outperforming the other models.

Observation
While all models achieved high overall accuracy, severe class imbalance remained a major challenge. Predicting minority classes accurately was difficult across all models, with XGBoost showing the most promising improvement in handling rare class predictions.

### Final Choice of Model and Summary
Based on the evaluation metrics, XGBoost Classifier was selected as the final model:
- It achieved the highest overall accuracy (99.02%) and demonstrated significantly better performance in predicting minority classes compared to Logistic Regression and Random Forest.
- While Random Forest offered strong major class prediction, it completely failed on minority classes, making XGBoost a more balanced and reliable choice.
- Although XGBoost is slightly more complex and may require additional tuning, its ability to generalize across all classes outweighs the added complexity.

However, the issue of class imbalance remains a key challenge.
To further enhance minority class predictions, techniques such as SMOTE oversampling, threshold adjustment, or building specialized models for rare classes could be explored in future work.
