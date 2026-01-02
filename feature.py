import streamlit as st
import pandas as pd
import numpy as np

st.set_page_config(page_title="Smart Retail AI", layout="wide")

# -----------------------------
# SESSION STATE
# -----------------------------
if "selected_feature" not in st.session_state:
    st.session_state.selected_feature = None

# -----------------------------
# MAIN PAGE: Image Card Layout
# -----------------------------
def show_main_cards():
    st.title("🛒 Smart Retail AI Dashboard")
    st.write("Select a feature to upload data and analyze")

    features = [
    ("Expiry Monitoring", "expiry", "https://img.icons8.com/emoji/96/000000/alarm-clock-emoji.png"),
    ("Discount Suggestions", "discount", "https://img.icons8.com/emoji/96/000000/money-bag-emoji.png"),
    ("Product Replacement", "replacement", "https://img.icons8.com/emoji/96/000000/recycle-emoji.png"),
    ("Demand Trends", "trends", "https://img.icons8.com/emoji/96/000000/chart-increasing-emoji.png"),
    ("Waste Management", "waste", "https://img.icons8.com/emoji/96/000000/wastebasket-emoji.png"),
    ("Digital Twin", "twin", "https://img.icons8.com/emoji/96/000000/robot-emoji.png"),
    ("Product Placement", "placement", "https://img.icons8.com/emoji/96/000000/package-emoji.png"),
    ("Brand Comparison", "comparison", "https://img.icons8.com/emoji/96/000000/bar-chart-emoji.png")
]


    rows = [features[i:i+2] for i in range(0, len(features), 2)]
    for row in rows:
        cols = st.columns(2, gap="large")
        for col, (label, key, img_path) in zip(cols, row):
            with col:
                if st.button(label, key=key):
                    st.session_state.selected_feature = key
                st.image(img_path, width=120)
                st.markdown(f"**{label}**")

# -----------------------------
# FEATURE PAGE
# -----------------------------
def show_feature_page():
    feature = st.session_state.selected_feature
    st.title(f"🔹 {feature.replace('_',' ').title()}")

    st.info("Upload a CSV with columns: product_name, brand, category, price, stock, units_sold, days_to_expiry")

    uploaded_file = st.file_uploader("📂 Upload CSV", type="csv")

    if uploaded_file:
        df = pd.read_csv(uploaded_file)
        avg_sales = df["units_sold"].mean()

        if feature == "expiry":
            st.subheader("⏰ Expiry Monitoring")
            df["Expiry Risk"] = np.where(
                df["days_to_expiry"] <= 5, "High",
                np.where(df["days_to_expiry"] <= 10, "Medium", "Low")
            )
            st.dataframe(df[["product_name", "days_to_expiry", "Expiry Risk"]])

        elif feature == "discount":
            st.subheader("💸 Discount Suggestions")
            df["Expiry Risk"] = np.where(
                df["days_to_expiry"] <= 5, "High",
                np.where(df["days_to_expiry"] <= 10, "Medium", "Low")
            )
            df["Discount Offer"] = np.where(
                df["Expiry Risk"] == "High", "30% Off",
                np.where(df["Expiry Risk"] == "Medium", "15% Off", "None")
            )
            st.dataframe(df[["product_name", "Expiry Risk", "Discount Offer"]])

        elif feature == "replacement":
            st.subheader("🔄 Low-Selling Product Replacement")
            def suggest_replacement(row):
                if row["units_sold"] < avg_sales:
                    alt = df[(df["category"]==row["category"]) & (df["units_sold"]>row["units_sold"])]
                    if not alt.empty:
                        return alt.iloc[0]["product_name"]
                return "Keep Product"
            df["Suggested Replacement"] = df.apply(suggest_replacement, axis=1)
            st.dataframe(df[["product_name","units_sold","Suggested Replacement"]])

        elif feature == "trends":
            st.subheader("📈 Demand Trends")
            df["Stock Action"] = np.where(df["units_sold"]>avg_sales,"Increase","Reduce")
            st.dataframe(df[["product_name","units_sold","Stock Action"]])

        elif feature == "waste":
            st.subheader("♻ Waste Management")
            df["Waste Action"] = np.where((df["days_to_expiry"]<=5)&(df["units_sold"]<10),"Dispose / Donate","Monitor")
            st.dataframe(df[["product_name","days_to_expiry","Waste Action"]])

        elif feature == "twin":
            st.subheader("🧠 Digital Twin Simulation")
            df["Stock After 7 Days"] = df["stock"] - df["units_sold"]
            st.dataframe(df[["product_name","stock","Stock After 7 Days"]])

        elif feature == "placement":
            st.subheader("🛒 Product Placement Simulation")
            df["Shelf Placement"] = np.where(df["units_sold"]>avg_sales,"Eye-Level Shelf","Lower Shelf")
            st.dataframe(df[["product_name","Shelf Placement"]])

        elif feature == "comparison":
            st.subheader("🏷 Brand Comparison")
            st.bar_chart(df.groupby("brand")["units_sold"].sum())

    st.button("⬅ Back to Features", on_click=lambda: st.session_state.update({"selected_feature": None}))

# -----------------------------
# MAIN FLOW
# -----------------------------
if st.session_state.selected_feature is None:
    show_main_cards()
else:
    show_feature_page()
