const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const predictionRoutes = require("./routes/predictionRoutes");

const app = express();


// ======================
// CONNECT DATABASE
// ======================
connectDB();


// ======================
// MIDDLEWARE
// ======================

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

app.use(express.json());


// ======================
// TEST ROUTE
// ======================

app.get("/test",(req,res)=>{
  res.send("TEST ROUTE WORKING");
});


// ======================
// API ROUTES
// ======================

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

// FIXED ROUTES
app.use("/api", expenseRoutes);
app.use("/api", predictionRoutes);


// ======================
// ROOT ROUTE
// ======================

app.get("/", (req, res) => {
  res.send("AI Warehouse Backend Running");
});


// ======================
// START SERVER
// ======================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});