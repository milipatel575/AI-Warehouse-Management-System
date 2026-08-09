import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Expenses from "./pages/Expenses";
import Prediction from "./pages/Prediction";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {

const user = JSON.parse(localStorage.getItem("user"));

return (

<Router>

<div>

{/* NAVBAR */}
<div className="navbar">

<Link to="/">Login</Link>
{user?.role === "admin" && (
<Link to="/admin">Admin Panel</Link>
)}
<Link to="/dashboard">Dashboard</Link>
<Link to="/inventory">Inventory</Link>
<Link to="/expenses">Expenses</Link>

{/* ADMIN ONLY */}
{user?.role === "admin" && (
<Link to="/prediction">Prediction</Link>
)}

{/* LOGOUT */}
{user && (
<button
onClick={()=>{
localStorage.removeItem("user");
window.location.href="/";
}}
style={{
marginLeft:"20px",
padding:"5px 10px",
cursor:"pointer"
}}
>
Logout
</button>
)}
</div>

<div className="container">

<Routes>

{/* LOGIN */}
<Route path="/" element={<Login />} />

{/* ADMIN + STAFF */}
<Route path="/dashboard" element={
<ProtectedRoute allowedRoles={["admin","staff"]}>
<Dashboard />
</ProtectedRoute>
} />

<Route path="/inventory" element={
<ProtectedRoute allowedRoles={["admin","staff"]}>
<Inventory />
</ProtectedRoute>
} />

<Route path="/expenses" element={
<ProtectedRoute allowedRoles={["admin","staff"]}>
<Expenses />
</ProtectedRoute>
} />

{/* ADMIN ONLY */}
<Route path="/prediction" element={
<ProtectedRoute allowedRoles={["admin"]}>
<Prediction />
</ProtectedRoute>
} />

<Route path="/admin" element={
<ProtectedRoute allowedRoles={["admin"]}>
<AdminPanel />
</ProtectedRoute>
} />

<Route path="/register" element={<Register />} />

</Routes>

</div>

</div>

</Router>

);

}

export default App;