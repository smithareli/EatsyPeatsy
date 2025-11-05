import React, { useState } from 'react';
import filter_logo from './filter-horizontal.svg';

function FilterButton({ onApply }) {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleFilter = () => setShowFilter(!showFilter);

  const handleCheckbox = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleApply = () => {
    if (onApply) onApply(selectedCategories);
    setShowFilter(false);
  };

  const categories = [
    "Italian", "Mexican", "Japanese", "Chinese", "Burgers", "Pizza",
    "Sandwiches", "FastFood", "Seafood", "American", "Coffee&Tea",
    "Bakeries", "Bars", "Breakfast&Brunch"
  ];

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={toggleFilter}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0
        }}
      >
        <img src={filter_logo} alt="Filter icon" style={{ width: '24px', height: '24px' }} />
      </button>

      {showFilter && (
        <div style={{
          position: "absolute",
          top: "50px",
          right: "-150px",
          backgroundColor: "#FFF7EF",
          border: "2px solid #EC5E5E",
          padding: "20px",
          width: "280px",
          height: "290px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          zIndex: 100,
          borderRadius: "8px"
        }}>
          <h3 style={{
            fontSize: "18px",
            fontWeight: "700",
            color: "#EC5E5E",
            margin: "0 0 15px 0",
            textAlign: "center"
          }}>
            Filter Options
          </h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            columnGap: "10px",
            rowGap: "12px",
            paddingLeft: "10px",
            paddingTop: "10px",
            alignItems: "center",
            justifyItems: "start",
            width: "100%",
          }}>
            {categories.map((cat) => (
              <label key={cat} style={{ fontSize: "14px", color: "#333" }}>
                <input
                  type="checkbox"
                  style={{ marginRight: "5px" }}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCheckbox(cat)}
                />
                {cat}
              </label>
            ))}
          </div>

          <button
            onClick={handleApply}
            style={{
              marginTop: "10px",
              width: "40%",
              padding: "8px 0",
              backgroundColor: "#EC5E5E",
              color: "white",
              fontWeight: "700",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Apply Filter
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterButton;
