const express = require("express");
const router = express.Router();
const User = require("../models/User");


// =====================
// REGISTER USER
// =====================
router.post("/register", async (req, res) => {

const { name, email, password, role } = req.body;

try {

// CHECK EXISTING USER
const existingUser = await User.findOne({ email });

if (existingUser) {
return res.status(400).json({ message: "User already exists" });
}

// CREATE USER
const newUser = new User({
name,
email,
password,
role: role || "staff"
});

await newUser.save();

res.json({
success: true,
message: "User Registered Successfully"
});

} catch (err) {
console.log("REGISTER ERROR:", err);
res.status(500).json({ message: "Server Error" });
}

});


// =====================
// LOGIN USER
// =====================
router.post("/login", async (req, res) => {

const { email, password } = req.body;

try {

const user = await User.findOne({ email });

if (!user) {
return res.status(400).json({ message: "Invalid Email or Password" });
}

if (user.password !== password) {
return res.status(400).json({ message: "Invalid Email or Password" });
}

res.json({
success: true,
message: "Login Successful",
user: user
});

} catch (error) {
console.log(error);
res.status(500).json({ message: "Server Error" });
}

});


// =====================
// ADMIN APIs
// =====================

// GET USERS
router.get("/users", async (req, res) => {
try {
const users = await User.find();
res.json(users);
} catch (err) {
res.status(500).json({ message: "Error fetching users" });
}
});

// UPDATE ROLE
router.put("/update-role/:id", async (req, res) => {
try {
const { role } = req.body;
await User.findByIdAndUpdate(req.params.id, { role });
res.json({ message: "Role updated" });
} catch (err) {
res.status(500).json({ message: "Error updating role" });
}
});

// DELETE USER
router.delete("/delete-user/:id", async (req, res) => {
try {
await User.findByIdAndDelete(req.params.id);
res.json({ message: "User deleted" });
} catch (err) {
res.status(500).json({ message: "Error deleting user" });
}
});

module.exports = router;