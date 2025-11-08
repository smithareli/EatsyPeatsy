import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import SearchBar from "./SearchBar";
import filter_logo from'./filter-horizontal.svg';
import './App.css';
import SearchButton from './SearchButton';
import FilterButton from './FilterButton'
import Infocard from "./Infocard";

function App() {
    const[noFilter, setNoFilter] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
 useEffect(() => {
  document.body.style.backgroundColor = "#FFF7EF";
  fetch("http://localhost:8080/full")
    .then(res => res.json())
    .then(data => {
      setNoFilter(data);
    })
    .catch(err => {
      console.error("Fetch error:", err);
    });
}, []);

  const handleSearch=(term) => {
    setSearchTerm(term);
  };
  
  const handleSearchButtonClick = async() => {
    if (!searchTerm) {
    setFilteredResults([]);
    return;
  }

  const filtered = noFilter.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered full results:", filtered);
  setFilteredResults(filtered);
  };

  const handleFilterApply = (categories) => {
    console.log("Selected categories:", categories);
    if (categories.length === 0) {
      setFilteredResults([]);
      return;
    }
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
        <div style={{top:0, left:0,width:"100%", display:"flex",flexDirection:"column", alignItems:"center", zIndex:1000,}}>
        
        
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
          <SearchBar onSearch={handleSearch} onEnter={handleSearchButtonClick} />
          <SearchButton onClick={handleSearchButtonClick} />
          <FilterButton onApply={handleFilterApply} /> 
        </div>
        <hr
        style={{
          width:"100%",
          border:"none",
          borderTop:"3px solid #EC5E5E",
          marginBottom:"0px",
        }}/>
        
      </div>
      
      </header>
      <div style={{ maxWidth:"900px", margin:"40px auto"}}>
               {filteredResults.length > 0 ? (
                  <Infocard data={filteredResults} />
                ) : (
                  <Infocard data={noFilter} />
                )}

      </div>
      
    </div>
  );
} 

export default App;
