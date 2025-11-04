import React,{useState, useEffect} from "react";
function SearchBar({ onSearch }){
    const [searchTerm, setSearchTerm]= useState('');
    const [suggestions, setSuggestions] = useState([]);
    const handleChange= async (event)=>{
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
        if (value.length > 0) {
          try {
            const response = await fetch(`http://localhost:8080/autocomplete?prefix=${value}`);
            const data = await response.json();
            setSuggestions(data.slice(0, 5));
          } catch (error) {
            console.error("Error fetching autocomplete:", error);
          }
        } else {
          setSuggestions([]);
        }
    };

    const handleSelect = (suggestion) => {
      setSearchTerm(suggestion);
      setSuggestions([]);
    };

    return(
        <div style={{ position: "relative", width: "100%" }}>
        <input 
        style={{
            padding:"10px 15px",
            fontSize: "16px",
            borderRadius:'28px',
            border: "3px solid #EC5E5E",
            width: "100%",
            color: "black",
            textTransform: "none",
        }}
        type="text"
        placeholder='Search...'
        value={searchTerm}
        onChange={handleChange}
        />
        {suggestions.length > 0 && (
        <ul 
          style={{
            listStyleType: "none",
            padding: 0,
            margin: 0,
            border: "1px solid #ccc",
            borderRadius: "8px",
            position: "absolute",
            top: "45px",
            left: 5,
            right: -30,
            background: "white",
            zIndex: 1000,
            color: "black",
            textTransform: "none",
          }}
        >
            {suggestions.map((s, i) => (
            <li 
              key={i}
                onClick={() => handleSelect(s)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  color: "black",
                  fontSize: "16px",
                  textTransform: "none",
                }}
                onMouseOver={(e) => (e.target.style.background = "#f9f9f9")}
                onMouseOut={(e) => (e.target.style.background = "white")}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
    );
}
export default SearchBar;