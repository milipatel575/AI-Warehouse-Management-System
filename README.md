# 🚀 AI-Driven Warehouse and Expense Management System

A full-stack web application designed to manage warehouse inventory, stock operations, expenses, users, and AI-based demand prediction through a centralized dashboard.

## 🌐 Live Demo

🔗 **Live Application:**  
https://ai-warehouse-frontend.onrender.com

🔗 **GitHub Repository:**  
https://github.com/milipatel575/AI-Warehouse-Management-System

---

## 📌 Project Overview

The **AI-Driven Warehouse and Expense Management System** is a full-stack web application developed to simplify warehouse inventory and expense management.

The system provides a centralized dashboard where users can manage products, monitor stock levels, track expenses, manage users, and generate demand predictions.

The project combines a React.js frontend with a Node.js/Express.js backend, MongoDB Atlas for database management, and Python-based demand prediction functionality.

---

## ✨ Key Features

### 🔐 Authentication & User Management

- User registration
- User login
- Role-based user management
- Admin user management
- Update user roles
- Delete users
- Protected application pages

### 📊 Dashboard

- Centralized warehouse overview
- Inventory information
- Stock monitoring
- Low-stock information
- Expense information
- Data visualization

### 📦 Inventory Management

- Add new products
- Update product information
- Increase/decrease stock quantity
- Delete products
- Monitor inventory levels
- Track stock history
- Low-stock monitoring

### 💰 Expense Management

- Add expenses
- Select products
- Record expense amount
- Categorize expenses
- Add expense descriptions
- View expense records
- Monitor total expenses

### 🤖 AI Demand Prediction

- Generate product demand predictions
- Analyze inventory-related information
- Display predicted demand
- Support better inventory planning

### 👨‍💼 Admin Panel

- View registered users
- Manage user roles
- Delete users
- Manage administrative information

---

## 🛠️ Technologies Used

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Axios

### Backend

- Node.js
- Express.js
- REST API

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### AI / Prediction

- Python
- Demand prediction module

### Development Tools

- Visual Studio Code
- Git
- GitHub
- MySQL Workbench / database tools used during development

### Deployment

- Render
- MongoDB Atlas

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │      User           │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      (Render)       │
                    └──────────┬──────────┘
                               │
                            REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Node.js + Express   │
                    │      Backend        │
                    │      (Render)       │
                    └──────┬─────────┬────┘
                           │         │
                           │         ▼
                           │   ┌──────────────┐
                           │   │ Python AI    │
                           │   │ Prediction   │
                           │   └──────────────┘
                           │
                           ▼
                    ┌─────────────────────┐
                    │    MongoDB Atlas    │
                    │      Database       │
                    └─────────────────────┘


📂 Project Structure
AI_Warehouse_System/
│
├── ai/
│   ├── demandPrediction.js
│   └── predict.py
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── productController.js
│
├── models/
│   ├── Expense.js
│   ├── Inventory.js
│   ├── Prediction.js
│   ├── Product.js
│   ├── StockHistory.js
│   └── User.js
│
├── routes/
│   ├── authRoutes.js
│   ├── expenseRoutes.js
│   ├── inventoryRoutes.js
│   ├── predictionRoutes.js
│   └── productRoutes.js
│
├── warehouse-frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   └── pages/
│   ├── package.json
│   └── package-lock.json
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md


⚙️ Installation & Setup

1. Clone the Repository
git clone https://github.com/milipatel575/AI-Warehouse-Management-System.git

Move into the project directory:

cd AI-Warehouse-Management-System

🔧 Backend Setup

Install backend dependencies:

npm install

Create a .env file in the project root:

MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000