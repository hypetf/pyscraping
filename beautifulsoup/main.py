import streamlit as st

st.title("Find your home")

st.sidebar.success("Select a demo above.")
st.page_link("pages/rightmove.py", label="Look for auctions from Rightmove.co.uk", icon="🏠")
st.page_link("http://www.google.com", label="Google", disabled=True, icon="🌎")