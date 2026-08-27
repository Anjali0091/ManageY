import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Customers from "./pages/Customers/Customers";
import Products from "./pages/Products/Products";
import ProtectedRoute from "./components/ProtectedRoute";
import Challans from "./pages/Challans/Challans";
import CustomerForm from "./pages/Customers/CustomerForm";
import ProductForm from "./pages/Products/ProductForm";
import ChallanForm from "./pages/Challans/ChallanForm";
import Suppliers from "./pages/Suppliers/Suppliers";
import SupplierForm from "./pages/Suppliers/SupplierForm";
import StockMovements from "./pages/StockMovements/StockMovements";
import StockMovementForm from "./pages/StockMovements/StockMovementForm";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/challans"
          element={
            <ProtectedRoute>
              <Challans />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers/new"
          element={
            <ProtectedRoute>
              <CustomerForm />
            </ProtectedRoute>
          }
        />

         <Route
          path="/products/new"
          element={
            <ProtectedRoute>
              <ProductForm />
            </ProtectedRoute>
          }
        />

         <Route
          path="/challans/new"
          element={
            <ProtectedRoute>
              <ChallanForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/suppliers"
          element={
            <ProtectedRoute>
              <Suppliers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/suppliers/new"
          element={
            <ProtectedRoute>
              <SupplierForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/stock-movements"
          element={
            <ProtectedRoute>
              <StockMovements/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/stock-movements/new"
          element={
            <ProtectedRoute>
              <StockMovementForm/>
            </ProtectedRoute>
          }
        />
        <Route path="/customers/edit/:id" 
        element={<ProtectedRoute>
          <CustomerForm />
        </ProtectedRoute>
        }
        />

        <Route path="/products/edit/:id" 
        element={<ProtectedRoute>
          <ProductForm />
        </ProtectedRoute>
        }
        />

        <Route path="/challans/edit/:id" 
        element={<ProtectedRoute>
          <ChallanForm />
        </ProtectedRoute>
        }
        />

        <Route path="/suppliers/edit/:id" 
        element={<ProtectedRoute>
          <SupplierForm />
        </ProtectedRoute>
        }
        />

        <Route path="/stock-movements/edit/:id" 
        element={<ProtectedRoute>
          <StockMovementForm />
        </ProtectedRoute>
        }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;