import React from 'react';
import filter_logo from './filter-horizontal.svg';

function FilterButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0',
      }}
    >
      <img 
        src={filter_logo} 
        alt="Filter icon" 
        style={{ width: '24px', height: '24px' }}
      />
    </button>
  );
}

export default FilterButton;