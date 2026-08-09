import React,{useEffect,useState} from "react";
import axios from "axios";

function Prediction(){

const [predictions,setPredictions] = useState([]);

/* LOGIN CHECK */
useEffect(() => {
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
alert("Please login first");
window.location.href = "/";
}

if(user.role !== "admin"){
alert("Access Denied");
window.location.href = "/dashboard";
}
}, []);

const getPredictions = async()=>{
const res = await axios.get("https://ai-warehouse-management-system.onrender.com/api/predictions");
setPredictions(res.data);
};

const generatePrediction = async()=>{
const res = await axios.post("https://ai-warehouse-management-system.onrender.com/api/predict");
alert(res.data.message);
getPredictions();
};

useEffect(()=>{getPredictions();},[]);

return(

<div style={pageStyle}>

<h1 style={titleStyle}>🤖 AI Prediction</h1>

{/* GENERATE BUTTON */}
<button onClick={generatePrediction} style={generateBtn}>
Generate Prediction
</button>

{/* TABLE */}
<div style={tableContainer}>

<h2>📊 Prediction Results ({predictions.length})</h2>

<table style={tableStyle}>

<thead>
<tr>
<th style={thStyle}>Product</th>
<th style={thStyle}>Demand</th>
<th style={thStyle}>Risk</th>
<th style={thStyle}>Confidence</th>
</tr>
</thead>

<tbody>

{predictions.length===0?(
<tr>
<td colSpan="4" style={{textAlign:"center", padding:"20px"}}>
No Data Available
</td>
</tr>
):(

predictions.map(p=>(

<tr
key={p._id}
style={trStyle}
onMouseEnter={(e)=>e.currentTarget.style.background="rgba(236, 228, 228, 0.93)"}
onMouseLeave={(e)=>e.currentTarget.style.background="transparent"}
>

<td style={tdStyle}>{p.productId?.name}</td>

<td style={{
...tdStyle,
fontWeight:"bold",
color:"#22c55e"
}}>
{p.predictedDemand}
</td>

<td style={{
...tdStyle,
fontWeight:"bold",
color: p.riskLevel === "High" ? "#ef4444" : "#f59e0b"
}}>
{p.riskLevel}
</td>

<td style={{
...tdStyle,
fontWeight:"bold",
color:"#0ea5e9"
}}>
{p.confidenceScore}%
</td>

</tr>

))

)}

</tbody>

</table>

</div>

</div>
);
}

/* 🎨 SAME INVENTORY STYLE */

const pageStyle = {
padding: "30px",
minHeight: "100vh",
background: "linear-gradient(135deg, #667eea, #764ba2)"
};

const titleStyle = {
marginBottom: "20px",
color: "#1e293b"
};

const generateBtn = {
marginBottom: "20px",
background: "#4f46e5",
color: "white",
padding: "10px 20px",
border: "none",
borderRadius: "6px",
cursor: "pointer"
};

const tableContainer = {
background: "rgba(255, 255, 255, 0.6)",
padding: "20px",
borderRadius: "12px",
boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
backdropFilter: "blur(10px)",
border: "1px solid rgba(255,255,255,0.3)"
};

const tableStyle = {
width: "100%",
borderCollapse: "collapse"
};

const thStyle = {
padding: "12px",
background: "#c7d2fe",
textAlign: "left",
borderBottom: "2px solid #a5b4fc"
};

const tdStyle = {
padding: "12px",
borderBottom: "1px solid #c7d2fe"
};

const trStyle = {
transition: "0.2s"
};

export default Prediction;