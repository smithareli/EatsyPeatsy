import React,{useEffect, useState} from "react";
const Infocard=({data=[]})=>{
    const[visibleCount, setVisibleCount] = useState(3);
    useEffect(()=>{
        setVisibleCount(12);
    },[data]);
    const handleShowMore=()=>{
        setVisibleCount(prev=>prev+12);
    };

    return(
        <div style={{textAlign:"center"}}>
            <div
            style={{
                display:"grid",
                gridTemplateColumns:"repeat(auto-fill, minmax(250px,1fr))",
                gap: "16px",
                padding:"16px",
            }}
            >
                {data.slice(0,visibleCount).map((item,index) => (
                    <div
                    key={index}
                    style={{
                        backgroundColor:"#F6E6D6",
                        border:"1px solid #F6E6D6",
                        borderRadius:"5px",
                        padding:"16px",
                    }}
                    >
                        <h2 style={{fontSize: "16px", fontWeight:"bold", marginBottom:"8px"}}>
                            {item.name}
                        </h2>
                        <p style={{color:"#EC5E5E", fontSize:"14px"}}>{item.stars}/5 | {item.city}   </p>
                        </div>
                    ))}
                </div>
                {visibleCount<data.length&&(
                    <button
                    onClick={handleShowMore}
                    style={{
                        marginTop:"20px",
                        padding:"10px 20px",
                        fontSize:"16px",
                        backgroundColor:"#EC5E5E",
                        color:"white",
                        border:"none",
                        borderRadius:"28px",
                        cursor:"pointer",
                    }}
                    >
                    Show More
                    </button>
                )} </div>
    );
};
export default Infocard;