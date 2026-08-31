# ManageY — ERP & CRM System

A full-stack ERP & CRM web application for managing customers, products, suppliers, challans (delivery notes), and stock movements — built with a modern TypeScript stack and deployed end-to-end on Render with a MySQL database on Railway.

## 🚀 Live Demo

- **App:** [https://managey-frontend.onrender.com](https://managey-frontend.onrender.com)
- **API:** [https://managey.onrender.com](https://managey.onrender.com)

> ⚠️ **Note:** This app is hosted on Render's free tier, so both the frontend and backend may take **30–60 seconds** to wake up on the first request if they've been inactive. This is expected — just refresh after a moment.

## ✨ Features

- 🔐 **Authentication** — JWT-based login with role-based access control (admin-only actions)
- 👥 **Customer Management** — track leads, active, and inactive customers with follow-up dates
- 📦 **Product Catalog** — manage inventory with stock levels, SKUs, and warehouse locations
- 🏭 **Supplier Management** — maintain supplier contact and address records
- 📄 **Challans (Delivery Notes)** — create and track challans linked to customers
- 📊 **Stock Movements** — log inbound/outbound inventory changes with reasons and audit trail
- 🔍 **Search & Filter** — client-side search across all list views
- ✏️ **Full CRUD** — create, read, update, and delete across every module
- 📱 **Responsive Dashboard** — live counts of customers, products, and challans

## 🛠️ Tech Stack

**Frontend**
- React + TypeScript
- Vite
- React Router
- Axios

**Backend**
- Node.js + Express + TypeScript
- MySQL (via `mysql2/promise`)
- JWT authentication (`jsonwebtoken`)
- Password hashing (`bcryptjs`)

**Infrastructure**
- Frontend hosted as a static site on **Render**
- Backend hosted as a web service on **Render**
- MySQL database hosted on **Railway**

## 📁 Project Structure

```
ERP-CRM/
├── backend/
│   ├── src/
│   │   ├── config/         # Database connection pool
│   │   ├── controllers/    # Route handlers for each module
│   │   ├── middleware/     # Auth & role-based access middleware
│   │   ├── models/         # Database query logic
│   │   ├── routes/         # Express route definitions
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Navbar, ProtectedRoute, etc.
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/          # Login, Dashboard, Customers, Products, Challans, Suppliers, Stock
│   │   ├── services/       # Axios API client
│   │   └── App.tsx
│   └── package.json
└── database/                # Exported schema & seed SQL
```

## ⚙️ Local Setup

### Prerequisites
- Node.js (v18+)
- MySQL Server

### 1. Clone the repo
```bash
git clone https://github.com/Anjali0091/ManageY.git
cd ManageY
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=erp_crm
JWT_SECRET=your_secret_key
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` and expects the backend at `http://localhost:5000/api` by default (configurable via `VITE_API_URL`).

## 🔑 Environment Variables

**Backend (`backend/.env`)**
| Variable | Description |
|---|---|
| `PORT` | Port for the Express server |
| `DB_HOST` | MySQL host |
| `DB_PORT` | MySQL port |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | MySQL database name |
| `JWT_SECRET` | Secret key for signing JWTs |

**Frontend (Render environment variable)**
| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the deployed backend API |

## 📌 Database Schema

Core tables: `users`, `roles`, `customers`, `customers_followups`, `products`, `suppliers`, `challans`, `challan_items`, `stock_movements`.

## 👩‍💻 Author

**Anjali** — Final-year B.Tech Computer Science student
[GitHub](https://github.com/Anjali0091)

## 📄 License

This project is open source and available for educational purposes.
