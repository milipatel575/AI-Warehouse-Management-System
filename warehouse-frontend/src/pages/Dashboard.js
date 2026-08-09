import React, { useEffect, useState } from "react";
import axios from "axios";
import InventoryChart from "../components/InventoryChart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard(){

const [products,setProducts] = useState([]);
const [lowStock,setLowStock] = useState([]);
const [totalProducts,setTotalProducts] = useState(0);
const [totalUnits,setTotalUnits] = useState(0);
const [restock,setRestock] = useState([]);

/* LOGIN CHECK */
useEffect(()=>{
const user = localStorage.getItem("user");

if(!user){
alert("Please login first");
window.location.href="/";
}
},[]);

/* SAMPLE CHART DATA */
const data = [
{month:"Jan",stock:40},
{month:"Feb",stock:55},
{month:"Mar",stock:30},
{month:"Apr",stock:80},
];

/* GET PRODUCTS */
const getProducts = async () => {
try{
const res = await axios.get("https://ai-warehouse-management-system.onrender.com/api/products/all");

setProducts(res.data);
setTotalProducts(res.data.length);

const units = res.data.reduce(
(sum,item)=>sum+Number(item.quantity),0
);

setTotalUnits(units);

calculateRestock(res.data);

}catch(error){
console.log(error);
}
};

/* LOW STOCK */
const getLowStock = async () => {
try{
const res = await axios.get("https://ai-warehouse-management-system.onrender.com/api/products/low-stock");
setLowStock(Array.isArray(res.data)?res.data:[]);
}catch(error){
console.log(error);
}
};

/* RESTOCK LOGIC */
const calculateRestock = (products)=>{
const suggestions = products
.filter((p)=>Number(p.quantity)<5)
.map((p)=>({
...p,
orderAmount:20-Number(p.quantity)
}));

setRestock(suggestions);
};

/* LOAD DATA */
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {

  const fetchData = async () => {
    await getProducts();
    await getLowStock();
  };

  fetchData();

}, []);

return(

<div style={container}>

<h1 style={title}>📊 AI Warehouse Dashboard</h1>

{/* CARDS */}
<div style={cardContainer}>

<div style={card}>
<h4>Total Products</h4>
<h2>{totalProducts}</h2>
</div>

<div style={card}>
<h4>Low Stock</h4>
<h2>{lowStock.length}</h2>
</div>

<div style={card}>
<h4>Total Units</h4>
<h2>{totalUnits}</h2>
</div>

</div>

{/* ALERT + RESTOCK */}
<div style={row}>

<div style={box}>
<h3>⚠ Low Stock Alert</h3>
<ul>
{lowStock.map((item)=>(
<li key={item._id}>
{item.name} ({item.quantity})
</li>
))}
</ul>
</div>

<div style={box}>
<h3>🤖 Restock Suggestion</h3>
<ul>
{restock.map((item)=>(
<li key={item._id}>
{item.name} → {item.orderAmount}
</li>
))}
</ul>
</div>

</div>

{/* CHARTS */}
<div style={chartContainer}>

<div style={chartBox}>
<h3>📊 Inventory Distribution</h3>
<InventoryChart products={products}/>
</div>

<div style={chartBox}>
<h3>📈 Monthly Stock Trend</h3>

<ResponsiveContainer width="100%" height={250}>
<LineChart data={data}>
<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="month"/>
<YAxis/>
<Tooltip/>
<Line type="monotone" dataKey="stock" stroke="#4CAF50"/>
</LineChart>
</ResponsiveContainer>

</div>

</div>

</div>

);
}

/* ===== STYLES ===== */

const container = {
  padding: "30px",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea, #764ba2)"
};

const title = {
  color: "white",
  marginBottom: "25px"
};

const cardContainer = {
  display: "flex",
  gap: "20px",
  marginBottom: "30px"
};

const card = {
  flex: 1,
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  textAlign: "center"
};

const row = {
  display: "flex",
  gap: "20px",
  marginBottom: "30px"
};

const box = {
  flex: 1,
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
};

const chartContainer = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap"
};

const chartBox = {
  flex: "1 1 48%",
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
};

export default Dashboard;