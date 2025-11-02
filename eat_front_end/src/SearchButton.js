import React from 'react'
function SearchButton(props){
    return(
        <button
        style={{
            background:'none',
            border:'none',
            cursor:'pointer',
        }}
        >
            <img src={props.icon} alt="icon" width="24" height="24" /> 
            </button>
    );
}
export default SearchButton;