#!/usr/bin/env python
# coding: utf-8

import streamlit as st
import pandas as pd
import plotly.express as px

# Load data
df = pd.read_csv("data/sales_by_order.csv")

# Clean and format
df.columns = df.columns.str.strip()
df["Amount (Excl Tax)"] = pd.to_numeric(df["Amount (Excl Tax)"], errors="coerce")
df["Quantity"] = pd.to_numeric(df["Quantity"], errors="coerce")
df["Creation Date"] = pd.to_datetime(df["Creation Date"], errors="coerce")

# Metrics
total_sales = df["Amount (Excl Tax)"].sum()
total_orders = df["Invoice No."].nunique()
total_quantity = df["Quantity"].sum()
avg_basket_size = total_sales / total_orders if total_orders > 0 else 0

# Streamlit Dashboard
st.set_page_config(layout="wide")
st.title("Sales by Order Dashboard")

# Raw Data Toggle
if st.checkbox("Show raw data"):
    st.dataframe(df.head(100))

# KPIs
st.header("Key Metrics")
col1, col2, col3, col4 = st.columns(4)
col1.metric("Total Sales (RM)", f"{total_sales:,.2f}")
col2.metric("Total Orders", total_orders)
col3.metric("Total Items Sold", int(total_quantity))
col4.metric("Avg Basket Size (RM)", f"{avg_basket_size:,.2f}")

# Sales Over Time
st.subheader("Sales Over Time")
sales_by_date = df.groupby("Creation Date")["Amount (Excl Tax)"].sum().reset_index()
fig_time = px.line(sales_by_date, x="Creation Date", y="Amount (Excl Tax)", title="Daily Sales Trend")
st.plotly_chart(fig_time, use_container_width=True)

# Top Products by Sales
st.subheader("Top Products by Sales")
top_products = df.groupby("Item")["Amount (Excl Tax)"].sum().sort_values(ascending=False).head(10)
st.bar_chart(top_products)

# Sales by Category
st.subheader("Sales by Category")
category_sales = df.groupby("Category")["Amount (Excl Tax)"].sum().sort_values(ascending=False).head(10)
st.bar_chart(category_sales)

# Payment Method Breakdown
st.subheader("Payment Methods Breakdown")
payment_counts = df["Payment Type"].value_counts()
st.bar_chart(payment_counts)

# Order Type Breakdown
st.subheader("Order Type Breakdown")
order_counts = df["Order Type"].value_counts()
st.bar_chart(order_counts)

st.caption("Fully Automated Dashboard with Python + Streamlit")
