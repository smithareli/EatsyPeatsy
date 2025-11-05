import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import SearchBar from "./SearchBar";
import filter_logo from'./filter-horizontal.svg';
import './App.css';
import SearchButton from './SearchButton';
import FilterButton from './FilterButton'

function App() {
  useEffect(() => {
    document.body.style.backgroundColor="#FFF7EF";
  },[]);

  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch=(term) => {
    console.log("User searched for:", term);
  };

  const handleFilterApply = (categories) => {
    console.log("Selected categories:", categories);
    if (categories.length === 0) return;

    fetch(`http://localhost:8080/filter?keyword=${categories.join(',')}`)
      .then(res => res.json())
      .then(data => {
        console.log("Filtered data:", data);
        setFilteredResults(data); // Save results
      })
      .catch(err => console.error("Error fetching filter results:", err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{position:"fixed", top:0, left:0,width:"100%", display:"flex",flexDirection:"column", alignItems:"center", paddingTop:"20px", paddingBottom:"10px",zIndex:1000,}}>
        
        
        <div style={{
            fontSize: 60,
            color: "#EC5E5E",
            fontWeight: "700",
            marginBottom:"20px",
          }}>
        Eatsy Peatsy
        </div>
        <hr
        style={{
          width:"100%",
          border:"none",
          borderTop:"3px solid #EC5E5E",
          marginBottom:"20px",
        }}/>

        <div style={{ display:"flex",flexDirection:"row", alignItems:"center",justifyContent:"center", width:"40%", maxWidth:"800px", gap:"40px"}}>
          <SearchBar onSearch={handleSearch}/>
          <FilterButton onApply={handleFilterApply} /> 
        </div>
      </div>
      </header>
      <main style={{ paddingTop: "350px" }}>
        {filteredResults.length > 0 && (
          <div>
            <h2>Filtered Results:</h2>
            <ul>
              {filteredResults.map((b) => (
                <li key={b.id}>{b.name} - {b.stars}⭐ - {b.city}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
