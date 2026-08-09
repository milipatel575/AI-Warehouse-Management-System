import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://ai-warehouse-management-system.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
          role
        }
      );

      if (res.data.success) {

        alert("✅ Registered Successfully");

        window.location.href = "/";

      }

    } catch (err) {

      console.log("REGISTER ERROR:", err);

      if (err.response) {

        alert(
          err.response.data?.message ||
          `Server Error (${err.response.status})`
        );

      } else if (err.request) {

        alert("❌ Cannot connect to the server.");

      } else {

        alert("❌ Registration failed.");

      }

    }

  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h2>Create Account</h2>

        <p>Register for AI Warehouse Management System</p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >

            <option value="staff">
              Staff
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

          <button type="submit">
            Register
          </button>

        </form>

      </div>

    </div>

  );

}

export default Register;