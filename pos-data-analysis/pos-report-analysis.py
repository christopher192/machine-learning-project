#!/usr/bin/env python
# coding: utf-8

import pandas as pd
import plotly.express as px
import streamlit as st

# Load Data
df = pd.read_csv("data/product_sales_report.csv")

# Clean columns
df.columns = df.columns.str.strip()
df["Product"] = df["Product"].astype(str).str.strip()
df["Total Sales"] = pd.to_numeric(df["Total Sales"], errors="coerce")
df["Total Quantity"] = pd.to_numeric(df["Total Quantity"], errors="coerce")
df["Category"] = df["Category"].fillna("Uncategorized")

# Calculate Metrics
total_sales = df["Total Sales"].sum()
total_quantity = df["Total Quantity"].sum()
top_products = df.sort_values(by="Total Sales", ascending=False).head(10)

# Wagyu contribution
wagyu_mask = df["Product"].str.contains("wagyu", case=False, na=False)
wagyu_sales = df.loc[wagyu_mask, "Total Sales"].sum()
wagyu_pct = (wagyu_sales / total_sales * 100) if total_sales > 0 else 0

# Streamlit Dashboard
st.set_page_config(page_title="OMI POS Dashboard", layout="wide")
st.title("OMI POS Sales Dashboard")

# KPI Section
st.header("Key Metrics")
col1, col2, col3 = st.columns(3)
col1.metric("Total Sales (RM)", f"{total_sales:,.2f}")
col2.metric("Total Quantity Sold", int(total_quantity))
col3.metric("Wagyu Sales %", f"{wagyu_pct:.2f}%")

# Top 10 Products by Sales
st.subheader("Top 10 Products by Sales")
st.dataframe(top_products[["Product", "Total Sales", "Total Quantity"]])

fig1 = px.bar(top_products, x="Product", y="Total Sales",
              title="Top Products by Sales", labels={"Total Sales": "RM"})
st.plotly_chart(fig1, use_container_width=True)

# Sales by Category
if "Category" in df.columns and df["Category"].notna().any():
    st.subheader("Sales by Product Category")
    category_sales = df.groupby("Category", as_index=False)["Total Sales"].sum()
    category_sales = category_sales.sort_values(by="Total Sales", ascending=False)

    # Pie Chart
    fig2 = px.pie(
        category_sales,
        values="Total Sales",
        names="Category",
        title="Sales Distribution by Category",
        hole=0.4,
        width=1500,
        height=700
    )
    st.plotly_chart(fig2, use_container_width=False)

    # Bar Chart
    fig3 = px.bar(category_sales, x="Category", y="Total Sales",
                  title="Sales by Category (Bar)", text_auto=".2s")
    st.plotly_chart(fig3, use_container_width=True)

# Footer
st.caption("Designed for automation using Python and Streamlit")
