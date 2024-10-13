import requests
from bs4 import BeautifulSoup
import streamlit as st

st.title('Auction Parser')

# url = 'https://www.auctionhouse.co.uk/auction/search-results?searchType=0' 
url = 'https://www.rightmove.co.uk/property-for-sale/Royton-21231/auction.html'
response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find all auction cards
    items = soup.find_all('div', class_='l-searchResult')
    
    for item in items:
        address = item.find('address', class_='propertyCard-address').get_text(strip=True)
        price = item.find('div', class_='propertyCard-priceValue').get_text(strip=True)
        anchor = item.find('a', class_='propertyCard-anchor').get_text(strip=True)
        
        image = item.find('div', class_='propertyCard-img')
        propertyAnchor = item.find('a', class_='propertyCard-anchor')
        image_tag = image.find('img')
        image_url = image_tag['src'] if image_tag and 'src' in image_tag.attrs else "No image found"

        if image_url:
            st.image(image_url)
        st.write(address)
        st.write(price)
        st.caption(anchor)

        if st.button('View Property', key=address):  # Use the address as the key to avoid duplicate keys
            st.markdown(f"[Click here to view the property]({propertyAnchor})", unsafe_allow_html=True)

else:
    st.error(f'Failed to retrieve the webpage. Status code: {response.status_code}')