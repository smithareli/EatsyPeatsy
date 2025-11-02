import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import SearchBar from "./SearchBar";
import filter_logo from'./filter-horizontal.svg';
import './App.css';
import SearchButton from './SearchButton';

function App() {
  useEffect(() => {
    document.body.style.backgroundColor="#FFF7EF";
  },[]);
  const handleSearch=(term) => {
    console.log("User searched for:", term);
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
        <div style={{ display:"flex",flexDirection:"row", alignItems:"center",justifyContent:"space-between", width:"40%", maxWidth:"800px", gap:"20px"}}>
          <SearchBar onSearch={handleSearch}/>
          <SearchButton caption="Filter" 
          icon={filter_logo}/>
        </div>
        <hr
        style={{
          width:"100%",
          border:"none",
          borderTop:"3px solid #EC5E5E",
          marginBottom:"20px",
        }}/>
        </div>
        <div style={{marginTop:"200px", textAlign:"center", }}>
          //put content here
        </div>
      </header>
    </div>
  );
}

export default App;
