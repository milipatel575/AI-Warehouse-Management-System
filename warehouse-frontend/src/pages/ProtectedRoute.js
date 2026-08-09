import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {

const user = JSON.parse(localStorage.getItem("user"));

// ❌ NOT LOGGED IN
if (!user) {
return <Navigate to="/" replace />;
}

// ❌ ROLE NOT ALLOWED
if (allowedRoles && !allowedRoles.includes(user.role)) {
return <Navigate to="/dashboard" replace />;
}

return children;
}

export default ProtectedRoute;