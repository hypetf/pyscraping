import streamlit as st

st.write("# Learning Streamlit")
username = st.text_input("Your username")
if len(username) > 0:
    st.write(f"Hello {username}!")

    
st.latex(r'''
    a + ar + a r^2 + a r^3 + \cdots + a r^{n-1} =
    \sum_{k=0}^{n-1} ar^k =
    a \left(\frac{1-r^{n}}{1-r}\right)
    ''')


st.caption("This website's code is:")
code = '''import streamlit as st

st.write("# Learning Streamlit")
username = st.text_input("Your username")
if len(username) > 0:
    st.write(f"Hello {username}!")

    
st.latex(r\'\'\'
    a + ar + a r^2 + a r^3 + \cdots + a r^{n-1} =
    \sum_{k=0}^{n-1} ar^k =
    a \left(\frac{1-r^{n}}{1-r}\right)
    \'\'\')

code = '\'\'def hello():
    print("Hello, Streamlit!")\'\'\'
st.code(code, language="python")'''

st.code(code, language="python")