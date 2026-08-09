import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Inventory() {

const [products, setProducts] = useState([]);
const [name, setName] = useState("");
const [quantity, setQuantity] = useState("");
const [history, setHistory] = useState([]);

/* LOGIN CHECK */
useEffect(() => {
const user = localStorage.getItem("user");

if (!user) {
alert("Please login first");
window.location.href = "/";
}
}, []);


const getHistory = async () => {
  const res = await axios.get("http://localhost:5000/api/products/history");
  setHistory(res.data);
};

/* GET PRODUCTS */
const getProducts = async () => {
try {
const res = await axios.get("http://localhost:5000/api/products/all");
setProducts(res.data);
} catch (error) {
console.log(error);
}
};

/* ADD PRODUCT */
const addProduct = async (e) => {
e.preventDefault();

try {
await axios.post("http://localhost:5000/api/products/add", {
name,
quantity
});

alert("✅ Product Added");

setName("");
setQuantity("");

getProducts();

} catch (error) {
console.log(error);
}
};

/* DELETE PRODUCT */
const deleteProduct = async (id) => {
try {
await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
getProducts();
} catch (error) {
console.log(error);
}
};

/* UPDATE QUANTITY */
const updateQuantity = async (id, newQty) => {
try {
await axios.put(`http://localhost:5000/api/products/update/${id}`, {
quantity: newQty
});
getProducts();
} catch (error) {
console.log(error);
}
};

/* EXPORT EXCEL */
const exportExcel = () => {

const worksheet = XLSX.utils.json_to_sheet(products);
const workbook = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");

const excelBuffer = XLSX.write(workbook, {
bookType: "xlsx",
type: "array"
});

const data = new Blob([excelBuffer], {
type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
});

saveAs(data, "Inventory.xlsx");

};

/* LOAD DATA */
useEffect(() => {
getProducts();
getHistory();
}, []);

return (

<div style={pageStyle}>

<h1 style={titleStyle}>📦 Inventory Management</h1>

{/* ADD PRODUCT CARD */}
<div style={cardStyle}>

<h3>Add Product</h3>

<form onSubmit={addProduct}>

<input
type="text"
placeholder="Product Name"
value={name}
onChange={(e) => setName(e.target.value)}
style={inputStyle}
/>

<input
type="number"
placeholder="Quantity"
value={quantity}
onChange={(e) => setQuantity(e.target.value)}
style={inputStyle}
/>

<button style={addBtn}>Add Product</button>

</form>

</div>

{/* EXPORT BUTTON */}
<button onClick={exportExcel} style={exportBtn}>
Export Excel
</button>

{/* PRODUCT TABLE */}
<div style={tableContainer}>

<h2>📦 Product List ({products.length})</h2>

<table style={tableStyle}>

<thead>
<tr>
<th style={thStyle}>Product</th>
<th style={thStyle}>Quantity</th>
<th style={thStyle}>Actions</th>
</tr>
</thead>

<tbody>

{products.length === 0 ? (
<tr>
<td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
No Products Found
</td>
</tr>
) : (

products.map((p) => (

<tr
key={p._id}
style={trStyle}
onMouseEnter={(e)=>e.currentTarget.style.background="rgba(236, 228, 228, 0.93)"}
onMouseLeave={(e)=>e.currentTarget.style.background="transparent"}
>

<td style={tdStyle}>{p.name}</td>

<td style={{
...tdStyle,
fontWeight: "bold",
color: p.quantity < 5 ? "red" : "green"
}}>
{p.quantity}
</td>

<td style={tdStyle}>

<button
onClick={() => updateQuantity(p._id, Number(p.quantity) + 1)}
style={plusBtn}
>
+
</button>

<button
onClick={() => updateQuantity(p._id, Math.max(0, Number(p.quantity) - 1))}
style={minusBtn}
>
-
</button>

<button
onClick={() => deleteProduct(p._id)}
style={deleteBtn}
>
Delete
</button>

</td>

</tr>

))

)}

</tbody>


</table>

</div>{/* STOCK HISTORY */}
<div style={{...tableContainer, marginTop:"20px"}}>

<h2>📜 Stock History</h2>

<table style={tableStyle}>

<thead>
<tr>
<th style={thStyle}>Product</th>
<th style={thStyle}>Change</th>
<th style={thStyle}>Type</th>
<th style={thStyle}>Date</th>
</tr>
</thead>

<tbody>

{history.map(h=>(
<tr key={h._id} style={trStyle}>
<td style={tdStyle}>{h.productName}</td>

<td style={{
...tdStyle,
fontWeight:"bold",
color: h.type==="IN"?"green":"red"
}}>
{h.change}
</td>

<td style={tdStyle}>{h.type}</td>

<td style={tdStyle}>
{new Date(h.date).toLocaleString()}
</td>

</tr>
))}

</tbody>

</table>

</div>

</div>


);
}

/* 🎨 STYLES */

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
background: "rgba(255, 255, 255, 0.6)",   // glass effect
padding: "20px",
borderRadius: "12px",
boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
backdropFilter: "blur(10px)",             // modern glass UI
border: "1px solid rgba(255,255,255,0.3)"
};

const tableStyle = {
width: "100%",
borderCollapse: "collapse"
};

const thStyle = {
padding: "12px",
background: "#c7d2fe",   // soft blue header
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

const plusBtn = {
background: "#22c55e",
color: "white",
border: "none",
padding: "6px 10px",
marginRight: "5px",
borderRadius: "5px",
cursor: "pointer"
};

const minusBtn = {
background: "#f59e0b",
color: "white",
border: "none",
padding: "6px 10px",
marginRight: "5px",
borderRadius: "5px",
cursor: "pointer"
};

const deleteBtn = {
background: "#ef4444",
color: "white",
border: "none",
padding: "6px 10px",
borderRadius: "5px",
cursor: "pointer"
};

export default Inventory;