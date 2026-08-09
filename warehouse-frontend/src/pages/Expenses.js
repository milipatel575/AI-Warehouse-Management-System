import React,{useState,useEffect} from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Expenses(){

const [expenses,setExpenses] = useState([]);
const [products,setProducts] = useState([]);
const [productName,setProductName] = useState("");
const [amount,setAmount] = useState("");
const [type,setType] = useState("");
const [description,setDescription] = useState("");
const [totalExpense,setTotalExpense] = useState(0);

/* LOGIN CHECK */
useEffect(() => {
const user = localStorage.getItem("user");

if (!user) {
alert("Please login first");
window.location.href = "/";
}
}, []);

const getProducts = async()=>{
const res = await axios.get("https://ai-warehouse-management-system.onrender.com/api/products/all");
setProducts(res.data);
};

const getExpenses = async()=>{
const res = await axios.get("https://ai-warehouse-management-system.onrender.com/api/expense/list");
setExpenses(res.data);
setTotalExpense(res.data.reduce((s,i)=>s+i.amount,0));
};

const addExpense = async(e)=>{
e.preventDefault();

await axios.post("https://ai-warehouse-management-system.onrender.com/api/expense/add",{productName,amount,type,description});

alert("✅ Added");
setProductName(""); setAmount(""); setType(""); setDescription("");
getExpenses();
};

const exportExcel=()=>{
const ws=XLSX.utils.json_to_sheet(expenses);
const wb=XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb,ws,"Expenses");
const buf=XLSX.write(wb,{bookType:"xlsx",type:"array"});
saveAs(new Blob([buf]),"Expenses.xlsx");
};

useEffect(()=>{getExpenses();getProducts();},[]);

return(

<div style={pageStyle}>

<h1 style={titleStyle}>💰 Expense Management</h1>

{/* ADD EXPENSE CARD */}
<div style={cardStyle}>

<h3>Add Expense</h3>

<form onSubmit={addExpense}>

<select value={productName} onChange={(e)=>setProductName(e.target.value)} style={inputStyle}>
<option>Select Product</option>
{products.map(p=><option key={p._id}>{p.name}</option>)}
</select>

<input type="number" placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)} style={inputStyle}/>

<select value={type} onChange={(e)=>setType(e.target.value)} style={inputStyle}>
<option value="">Select Type</option>
<option value="Food">Food</option>
<option value="Transport">Transport</option>
<option value="Maintenance">Maintenance</option>
<option value="Salary">Salary</option>
<option value="Other">Other</option>
</select>

<input placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} style={inputStyle}/>

<button style={addBtn}>Add Expense</button>

</form>

</div>

{/* TOTAL */}
<h2 style={{color:"white", marginBottom:"10px"}}>
Total Expense: ₹ {totalExpense}
</h2>

{/* EXPORT */}
<button onClick={exportExcel} style={exportBtn}>
Export Excel
</button>

{/* TABLE */}
<div style={tableContainer}>

<h2>💰 Expense List ({expenses.length})</h2>

<table style={tableStyle}>

<thead>
<tr>
<th style={thStyle}>Product</th>
<th style={thStyle}>Amount</th>
<th style={thStyle}>Type</th>
<th style={thStyle}>Description</th>
</tr>
</thead>

<tbody>

{expenses.length === 0 ? (
<tr>
<td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
No Expenses Found
</td>
</tr>
) : (

expenses.map((e)=>(

<tr
key={e._id}
style={trStyle}
onMouseEnter={(ev)=>ev.currentTarget.style.background="rgba(236, 228, 228, 0.93)"}
onMouseLeave={(ev)=>ev.currentTarget.style.background="transparent"}
>

<td style={tdStyle}>{e.productName}</td>

<td style={{
...tdStyle,
fontWeight:"bold",
color:"#ef4444"
}}>
₹ {e.amount}
</td>

<td style={tdStyle}>{e.type}</td>

<td style={tdStyle}>{e.description}</td>

</tr>

))

)}

</tbody>

</table>

</div>

</div>
);
}

/* 🎨 SAME INVENTORY STYLES */

const pageStyle = {
padding: "30px",
minHeight: "100vh",
background: "linear-gradient(135deg, #667eea, #764ba2)"
};

const titleStyle = {
marginBottom: "20px",
color: "#1e293b"
};

const cardStyle = {
background: "white",
padding: "20px",
borderRadius: "12px",
boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
marginBottom: "20px",
width: "400px"
};

const inputStyle = {
margin: "10px",
padding: "10px",
borderRadius: "6px",
border: "1px solid #ccc"
};

const addBtn = {
background: "#4f46e5",
color: "white",
padding: "8px 15px",
border: "none",
borderRadius: "6px",
cursor: "pointer"
};

const exportBtn = {
marginBottom: "20px",
background: "#0ea5e9",
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

export default Expenses;