import React, { useState } from "react";
import "./Filter.css";

function Filter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    transportation: [],
    foodBank: [],
    housing: [],
  });

  const handleFilterChange = (category, item) => {
    setFilters((prevFilters) => {
      const currentCategory = prevFilters[category];
      const isSelected = currentCategory.includes(item);

      const updatedFilters = {
        ...prevFilters,
        [category]: isSelected
          ? currentCategory.filter((i) => i !== item) // Remove item if already selected
          : [...currentCategory, item], // Add item otherwise
      };

      // Notify parent component about filter changes
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <div className="selection-filters">
      {/* Transportation Filter */}
      <div className="filter">
        <button className="filter-btn">Transportation</button>
        <div className="dropdown">
          <label>
            <input
              type="checkbox"
              onChange={() => handleFilterChange("transportation", "Bus")}
            />
            Bus
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleFilterChange("transportation", "Train")}
            />
            Train
          </label>
        </div>
      </div>

      {/* Food Bank Filter */}
      <div className="filter">
        <button className="filter-btn">Food Bank</button>
        <div className="dropdown">
          <label>
            <input
              type="checkbox"
              onChange={() => handleFilterChange("foodBank", "Pantry")}
            />
            Pantry
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleFilterChange("foodBank", "Soup Kitchen")}
            />
            Soup Kitchen
          </label>
        </div>
      </div>

      {/* Housing Filter */}
      <div className="filter">
        <button className="filter-btn">Housing</button>
        <div className="dropdown">
          <label>
            <input
              type="checkbox"
              onChange={() => handleFilterChange("housing", "Shelter")}
            />
            Shelter
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() =>
                handleFilterChange("housing", "Rental Assistance")
              }
            />
            Rental Assistance
          </label>
        </div>
      </div>

      {/* Search Button */}
      <button className="filter-search-btn">Search</button>
    </div>
  );
}

export default Filter;
