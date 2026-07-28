import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Footer from './components/Footer'
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import { CartProvider } from "./context/CartContext";

import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCreateProduct from "./pages/admin/AdminCreateProduct";
import AdminEditProduct from "./pages/admin/AdminEditProduct";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminStatsDashboard from "./pages/admin/AdminStatsDashboard";
import AdminUsers from "./pages/admin/AdminUser";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
import AdminMessages from "./pages/admin/AdminMessages";

import Checkout from "./pages/order/Checkout";
import OrderSuccess from "./pages/order/OrderSuccess";
import MyOrders from "./pages/order/MyOrders";
import PaymentSuccess from "./pages/order/PaymentSuccess";
import ProductDetails from "./pages/ProductDetails";
import ScrollToTop from "./components/ScrollToTop";

import "./App.css";
import './Styles/CommonStyles.css' // css




function App() {

  return (

    <div className="app">
      {/**  <CartProvider>*/}
      <BrowserRouter>
      
        <Navbar />
        <ScrollToTop />

        <div className="page-content">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />


            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>}
            />

            <Route path="/admin/products" element={
              <AdminRoute>
                <AdminProducts />
              </AdminRoute>
            }
            />

            <Route path="/admin/create-product" element={
              <AdminRoute>
                <AdminCreateProduct />
              </AdminRoute>
            }
            />

            <Route path="/admin/product/:id/edit" element={
              <AdminRoute>
                <AdminEditProduct />
              </AdminRoute>
            }
            />

           
            <Route path="/admin/orders"
              element={
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              }
            />

            <Route path="/admin/stats" element={
              <AdminRoute>
                <AdminStatsDashboard />
              </AdminRoute>
            }
            />


            <Route path="/admin/users" element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
            />

             <Route path="/admin/messages" element={
              <AdminRoute>
                <AdminMessages />
              </AdminRoute>
            }
            />

            <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />

            <Route path="/checkout" element={<Checkout />} />

            <Route path="/order-success/:id" element={<OrderSuccess />} />

            <Route path="/my-orders" element={<MyOrders />} />

            <Route path="/payment-success" element={<PaymentSuccess />} />

           

          </Routes>

        </div>

        <Footer />

      </BrowserRouter>
      {/** </CartProvider>*/}

    </div>
  );
}

export default App;