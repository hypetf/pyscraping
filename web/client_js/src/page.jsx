'use client'

import { useEffect, useState } from 'react'
import PropertyCard from './components/property-card'
import Filters from './components/filters'
import './styles.css'

export default function PropertyAuctions() {
    const [propertiesData, setPropertiesData] = useState([]);
    const [postcodeFilter, setPostcodeFilter] = useState('');
    const [energyRatingFilter, setEnergyRatingFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:3001/scrape?target=auctionhouse');
                const result = await response.json();
                setPropertiesData(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    const filteredProperties = propertiesData.filter(property => {
        const matchesPostcode = postcodeFilter === '' || 
            property.postcode.toLowerCase().includes(postcodeFilter.toLowerCase().trim());
        const matchesEnergyRating = energyRatingFilter === '' || 
            (property.EPC_Data && property.EPC_Data['current-energy-rating'] === energyRatingFilter);
        return matchesPostcode && matchesEnergyRating;
    });

    const hasActiveFilters = postcodeFilter !== '' || energyRatingFilter !== '';

    return (
        <div className="app-container">
        <header className="header">
            <div className="logo">AIDATALYTICS</div>
            <div className="search-container">
            {/* <input type="search" placeholder="Search auctions..." className="search-input" /> */}
            </div>
        </header>
        
        <main className="main-content">
            <aside className="filters-sidebar">
                <Filters 
                    onFiltersApply={(postcode, energyRating) => {
                        setPostcodeFilter(postcode);
                        setEnergyRatingFilter(energyRating);
                    }}
                />
            </aside>
            
            <section className="properties-grid">
            <h2 className="section-title">Featured Auctions</h2>
            <div className="properties-container">
                {isLoading ? (
                    <h3>Loading...</h3>
                ) : filteredProperties.length === 0 ? (
                    hasActiveFilters ? (
                        <h3>No properties match the filters</h3>
                    ) : (
                        <h3>No properties available</h3>
                    )
                ) : (
                    filteredProperties.map(property => (
                        <PropertyCard key={property.auctionLink} property={property} />
                    ))
                )}
            </div>
            </section>
        </main>
        </div>
    )
}