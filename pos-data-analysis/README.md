
### POS Report Analysis - Part 1
What key metrics are chosen? 
- Total Sales (RM)
    -  Sum of all Total Sales values from the product list
- Total Quantity Sold
    - Sum of Total Quantity across all products
- Wagyu Sales Contribution (%)
    - Percentage of total revenue from Wagyu-related products
- Top 10 Products by Sales
    - Checking which products generating the highest revenue
- Sales by Category
    - Aggregated sales grouped by product category

Why These Metrics Matter to Business Decisions?
1. Total Sales & Quantity: Reveal overall business performance and demand volume
2. Wagyu Contribution: Checking the impact, marketing demand of premium products
3. Top Products by Sales: Help identify which items worth promoting or bundling
4. Category-Level Sales: Identify strong and weak product lines, help in guiding product mix, inventory, and R&D strategy

How layout supports clarity and insight?
1. Presents Total Sales, Quantity Sold, and Wagyu Contribution, allow faster decision-making process, and quickly assess performance
![alt text](images/product_sales_report-1.png)

2. Highlights best-performing items by revenue. The combination of a table (precise values) and bar chart (visual ranking) helps identify what drives sales
![alt text](images/product_sales_report-2.png)
![alt text](images/product_sales_report-3.png)

3. Uses a pie chart (or bar chart) to summarize product line performance. This gives a clear picture of category-level contribution to overall sales.
![alt text](images/product_sales_report-4.png)
![alt text](images/product_sales_report-5.png)

To launch the interactive POS Sales Dashboard, run the following command in terminal
```
streamlit run pos-report-analysis.py
```

Product Contribution Analysis (Wagyu Sales %)
```
# Wagyu-related item sales / Total sales × 100
wagyu_mask = df["Product"].str.contains("wagyu", case=False, na=False)
wagyu_sales = df.loc[wagyu_mask, "Total Sales"].sum()
wagyu_pct = (wagyu_sales / total_sales * 100) if total_sales > 0 else 0
```

Sales Performance Metric<br>
It is best to track item performance based on `Sales Amount` rather than `Quantity Sold`
- Sales amount reflects actual revenue and financial impact
- Quantity can be misleading if high-volume items are low-priced

Product Development Recommendation
1. Sudoku Platter
    - RM10,294.2 in sales from 258 orders. This indicates high customer interest
2. Wagyu Karaage Don or Wagyu Sliders
    - Wagyu-based items (Don, Ramen, Set Meal) contribute ~39% of sales among top items
3. Matcha Dessert Series
    - highest quantity sold (410 units), showing strong matcha demand

Menu Strategy Framework
| **Category**                           | **Proposed Strategy**                                               | **Example**                         |
| -------------------------------------- | ------------------------------------------------------------------- | ----------------------------------- |
| **i. Low Sales, High Profit Margin**   | Aggressively promoting, feature as dinner item, use in premium combos  | Sukiyaki Hotpot (RM69)            |
| **ii. High Sales, High Profit Margin** | Maintain and protect, highlight as flagship offerings               | Signature Wagyu Don, Premium Set    |
| **iii. High Sales, Low Profit Margin** | Consider bundling or slight price increase, reduce cost per serving | Matcha Latte Z3 (RM9.89)          |
| **iv. Low Sales, Low Profit Margin**   | Phase out or replace with trending/new items                        | Swiss Roll - Hokkaido Milk, Gelato - Lavender, Full Cream Milk |

### POS Report Analysis - Part 2
1. What key metrics you chose? 