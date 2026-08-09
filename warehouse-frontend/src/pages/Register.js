import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Register(){

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [role,setRole] = useState("staff");

const handleRegister = async (e)=>{
e.preventDefault();

try{

const res = await axios.post(
"http://localhost:5000/api/auth/register",
{ name, email, password, role }
);

if(res.data.success){
alert("✅ Registered Successfully");
window.location.href = "/";
}

}catch(err){
alert(err.response?.data?.message || "Server Error");
}

};

return(

<div className="login-container">

<div className="login-box">

<h2>Create Account</h2>
<p>Register new user</p>

<form onSubmit={handleRegister}>

<input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required/>

<input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>

<input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>

<select value={role} onChange={(e)=>setRole(e.target.value)}>
<option value="staff">Staff</option>
<option value="admin">Admin</option>
</select>

<button type="submit">Register</button>

</form>

<p>Already have account? <a href="/">Login</a></p>

</div>

</div>

);
}

export default Register;