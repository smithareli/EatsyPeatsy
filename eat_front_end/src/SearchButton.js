import React from 'react'
import search_button from './search-button.svg'

function SearchButton({ onClick }){
    return(
        <button
        style={{
            background:'none',
            border:'none',
            cursor:'pointer',
        }}
        onClick={onClick}
        >
            <img src={search_button} alt="icon" width="24" height="24" /> 
            </button>
    );
}
export default SearchButton;