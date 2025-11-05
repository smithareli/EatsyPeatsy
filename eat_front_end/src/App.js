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

  const handleSearch=(term) => {
    console.log("User searched for:", term);
  };

  const [showFilter, setShowFilter] = useState(false);
  const toggleFilter = () => {
    setShowFilter(!showFilter);
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
          <FilterButton onClick ={toggleFilter}/>

          {showFilter && (
            <div style={{
              position: "absolute",       // positioned relative to container
              top: "220px",                // distance below the button
              right: "450px",                   // align right edge of container
              backgroundColor: "#FFF7EF",   // box color
              border: "2px solid #EC5E5E", // border color
              padding: "20px",            // spacing inside box
              width: "250px",
              height: "300px",         // box width
              boxShadow: "0px 4px 8px rgba(0,0,0,0.1)", // subtle shadow
              zIndex: 100,                // layer above other content
              borderRadius: "0px"         // ✅ sharp edges
            }}>
  
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#EC5E5E" , margin: "0 0 15px 0", textAlign: "center"}}>Filter Options</h3>

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
                <label style={{ fontSize: "14px", color: "#333" }}>
                  <input type="checkbox" style={{ marginRight: "5px" }} />
                  Italian
                </label>
                <label style={{ fontSize: "14px", color: "#333" }}>
                  <input type="checkbox" style={{ marginRight: "5px" }} />
                  Mexican
                </label>
                <label style={{ fontSize: "14px", color: "#333" }}>
                  <input type="checkbox" style={{ marginRight: "5px" }} />
                  Japanese
                </label>
                <label style={{ fontSize: "14px", color: "#333" }}>
                  <input type="checkbox" style={{ marginRight: "5px" }} />
                  Chinese
                </label>
                <label style={{ fontSize: "14px", color: "#333" }}>
                  <input type="checkbox" style={{ marginRight: "5px" }} />
                  Burgers
                </label>
                <label style={{ fontSize: "14px", color: "#333" }}>
                  <input type="checkbox" style={{ marginRight: "5px" }} />
                  Pizza
                </label>
                <label style={{ fontSize: "14px", color: "#333" }}>
                  <input type="checkbox" style={{ marginRight: "5px" }} />
                  Sandwiches
                </label>
                 <label style={{ fontSize: "14px", color: "#333" }}>
                  <input type="checkbox" style={{ marginRight: "5px" }} />
                  Fast Food
                </label>
              </div>
            </div>
          )}

        </div>

        <hr style={{
          width: "100%",
          border: "none",
          borderTop: "3px solid #EC5E5E",
          marginBottom: "20px"
        }} />
      </div>

      </header>
    </div>
  );
}

export default App;
