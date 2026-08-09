import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [loading,setLoading] = useState(false);

const navigate = useNavigate();

const handleLogin = async (e) => {

e.preventDefault();
setLoading(true);

try{

const res = await axios.post(
"http://localhost:5000/api/auth/login",
{ email, password }
);

if(res.data.success){

// ✅ STORE USER WITH ROLE
localStorage.setItem("user", JSON.stringify(res.data.user));

alert("✅ Login Successful");

// 👉 GO TO DASHBOARD
navigate("/dashboard");

}

}catch(err){
alert("❌ Invalid Email or Password");
}

setLoading(false);
};

return(

<div className="login-container">

<div className="login-box">

<h2>AI Warehouse System</h2>
<p>Login to continue</p>
<p>
Don't have account? <a href="/register">Register</a>
</p>

<form onSubmit={handleLogin}>

<input
type="email"
placeholder="Enter Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Enter Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button type="submit">
{loading ? "Logging in..." : "Login"}
</button>

</form>

</div>

</div>

);

}

export default Login;