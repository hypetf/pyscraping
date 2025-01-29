import { useState } from 'react'

export default function Filters({ onFiltersApply }) {
    const [postcode, setPostcode] = useState('')
    const [energyRating, setEnergyRating] = useState('')

    const handleApply = () => {
        onFiltersApply(postcode, energyRating)
    }

    return (
        <div className="filters">
            <h3 className="filters-title">Filters</h3>
            
            <div className="filter-group">
                <label>Postcode</label>
                <input
                    type="text"
                    name="postcode"
                    placeholder="Enter postcode"
                    className="filter-input"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                />
            </div>

            <div className="filter-group">
                <label>Energy Rating</label>
                <select
                    name="energyRating"
                    className="filter-select"
                    value={energyRating}
                    onChange={(e) => setEnergyRating(e.target.value)}
                >
                    <option value="">Select energy rating</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                </select>
            </div>

            <button className="apply-filters-btn" onClick={handleApply}>
                Apply Filters
            </button>
        </div>
    )
}