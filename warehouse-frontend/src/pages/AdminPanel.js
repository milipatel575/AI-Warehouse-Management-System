import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel(){

const [users,setUsers] = useState([]);

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

const getUsers = async ()=>{
const res = await axios.get("http://localhost:5000/api/auth/users");
setUsers(res.data);
};

const updateRole = async(id, role)=>{
await axios.put(`http://localhost:5000/api/auth/update-role/${id}`,{role});
getUsers();
};

const deleteUser = async(id)=>{
await axios.delete(`http://localhost:5000/api/auth/delete-user/${id}`);
getUsers();
};

useEffect(()=>{getUsers();},[]);

return(

<div style={pageStyle}>

<h1 style={titleStyle}>👨‍💼 Admin Panel</h1>

<div style={tableContainer}>

<h2>👥 User List ({users.length})</h2>

<table style={tableStyle}>

<thead>
<tr>
<th style={thStyle}>Name</th>
<th style={thStyle}>Email</th>
<th style={thStyle}>Role</th>
<th style={thStyle}>Actions</th>
</tr>
</thead>

<tbody>

{users.length === 0 ? (
<tr>
<td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
No Users Found
</td>
</tr>
) : (

users.map((u)=>(

<tr
key={u._id}
style={trStyle}
onMouseEnter={(e)=>e.currentTarget.style.background="rgba(236, 228, 228, 0.93)"}
onMouseLeave={(e)=>e.currentTarget.style.background="transparent"}
>

<td style={tdStyle}>{u.name}</td>
<td style={tdStyle}>{u.email}</td>

<td style={{
...tdStyle,
fontWeight:"bold",
color: u.role === "admin" ? "#22c55e" : "#f59e0b"
}}>
{u.role}
</td>

<td style={tdStyle}>

<button
onClick={()=>updateRole(u._id,"admin")}
style={plusBtn}
>
Make Admin
</button>

<button
onClick={()=>updateRole(u._id,"staff")}
style={minusBtn}
>
Make Staff
</button>

<button
onClick={()=>deleteUser(u._id)}
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

export default AdminPanel;