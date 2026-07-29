# 🛍️ Hair Oil Ecommerce Frontend

A modern, responsive ecommerce frontend built with **React** and **Vite**.

The application provides a complete online shopping experience including product browsing, cart management, authentication, checkout, Stripe payment integration, order history, and a protected admin dashboard.

---

## 🚀 Project Overview

This project is the **frontend application** for a full-stack hair oil ecommerce platform.

It communicates with a separate Node.js/Express backend through REST APIs.

### Main Areas

* Customer storefront
* Product browsing
* Shopping cart
* User authentication
* Forgot Password / Reset Password
* Checkout
* Stripe payment
* Order history
* Admin dashboard
* Product management
* Order management
* User management
* Analytics
* Admin messages

---

## ✨ Customer Features

* 🏠 Home page
* 🛍️ Product listing
* 📄 Product details
* 🔍 Product search
* 🏷️ Category filtering
* 💰 Price filtering
* 🛒 Shopping cart
* ➕ Increase product quantity
* ➖ Decrease product quantity
* ❌ Remove cart items
* 💾 Persistent cart using Local Storage
* 👤 User registration
* 🔐 User login
* 👁️ Show/hide password
* 🔑 Forgot Password
* 🔄 Reset Password
* 📦 Place orders
* 💳 Stripe Checkout
* ✅ Payment success page
* 📜 My Orders
* 📱 Responsive design

---

# 👨‍💼 Admin Dashboard

The application includes a protected admin panel accessible only to authorized administrators.

## 📊 Dashboard

* Revenue statistics
* Monthly sales information
* Total products
* Total users
* Total orders
* Inventory information
* Low-stock products
* Top-selling products
* Recent orders
* Recent users

## 📈 Analytics

* Business statistics
* Sales information
* Revenue data
* Visual charts using Recharts

## 📦 Product Management

* Create products
* Edit products
* Delete products
* Search products
* Product pagination
* Product images
* Cloudinary image upload

## 🛒 Order Management

* View all orders
* Search orders
* View order details
* Update order status
* Cancel pending orders
* Export orders as CSV

## 👥 User Management

* View registered users
* Search users
* Admin-protected routes

## 💬 Messages

* Admin message management
* View customer messages

## 📐 Admin UI

The admin dashboard includes:

* Collapsible sidebar
* Sidebar navigation icons
* Responsive layout
* Dashboard cards
* Tables
* Charts
* Admin-only protected routes

---

# 🛠️ Technology Stack

## Frontend

* React
* Vite
* JavaScript
* React Router DOM
* Context API
* Axios
* React Hook Form
* Yup
* CSS Modules
* Custom CSS

## UI Libraries

* React Icons
* Lucide React
* PrimeReact
* PrimeIcons

## Charts

* Recharts

## Payments

* Stripe
* `@stripe/react-stripe-js`
* `@stripe/stripe-js`

---

# 📦 Main Dependencies

```bash
npm install axios
npm install react-router-dom
npm install react-hook-form
npm install yup
npm install @hookform/resolvers
npm install react-icons
npm install lucide-react
npm install primereact primeicons
npm install recharts
npm install @stripe/react-stripe-js
npm install @stripe/stripe-js
```

---

# 📁 Project Structure

```
UiHairOil/
│
├── public/
│
├── src/
│   │
│   ├── api/
│   │   └── Axios.js
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── AdminRoute.jsx
│   │   ├── ScrollToTop.jsx
│   │   └── admin/
│   │       ├── AdminLayout.jsx
│   │       └── Sidebar.jsx
│   │
│   ├── context/
│   │   └── CartContext.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Cart.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── ResetPassword.jsx
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminProducts.jsx
│   │   │   ├── AdminCreateProduct.jsx
│   │   │   ├── AdminEditProduct.jsx
│   │   │   ├── AdminOrders.jsx
│   │   │   ├── AdminOrderDetails.jsx
│   │   │   ├── AdminStatsDashboard.jsx
│   │   │   ├── AdminUser.jsx
│   │   │   └── AdminMessages.jsx
│   │   │
│   │   └── order/
│   │       ├── Checkout.jsx
│   │       ├── OrderSuccess.jsx
│   │       ├── MyOrders.jsx
│   │       └── PaymentSuccess.jsx
│   │
│   ├── utils/
│   │   └── auth.js
│   │
│   ├── validations/
│   │   └── authSchema.js
│   │
│   ├── Styles/
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

# 🔐 Environment Variables

The frontend uses Vite environment variables.

Create a local `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

For production, this value should point to the deployed backend API.

Example:

```env
VITE_API_URL=https://your-production-backend-url
```

### ⚠️ Security

Never commit your real `.env` file to GitHub.

The repository should contain `.env.example` instead:

```env
VITE_API_URL=
```

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone git@github.com:Faiza-tech/hairoilFrontend.git
```

## 2. Enter the project

```bash
cd hairoilFrontend
```

## 3. Install dependencies

```bash
npm install
```

## 4. Configure environment variables

Create:

```
.env
```

and add:

```env
VITE_API_URL=http://localhost:5000
```

## 5. Start development server

```bash
npm run dev
```

The Vite development server normally runs on:

```
http://localhost:5173
```

---

# 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

# 📸 Screenshots

Screenshots can be stored inside:

```
screenshots/
```

Recommended screenshots:

* Home page
* Products page
* Product details
* Shopping cart
* Login
* Forgot Password
* Reset Password
* Checkout
* Stripe payment
* Payment success
* My Orders
* Admin dashboard
* Analytics
* Product management
* Order management
* User management

Example:

```markdown
![Home Page](./screenshots/home.png)

```

---

# 💳 Payment Flow

The customer checkout flow is:

```
Browse Products
      ↓
Add to Cart
      ↓
Checkout
      ↓
Enter Shipping Details
      ↓
Stripe Checkout
      ↓
Payment
      ↓
Payment Success
      ↓
Order Confirmation
      ↓
Order History
```

---

# 🔐 Authentication Flow

```
Register
   ↓
Login
   ↓
JWT Authentication
   ↓
Protected Requests
   ↓
User Account
```

Forgot Password:

```
Forgot Password
      ↓
Enter Email
      ↓
Backend Sends Reset Email
      ↓
Open Reset Link
      ↓
Create New Password
      ↓
Login With New Password
```

---

# 👨‍💼 Admin Flow

```
Admin Login
     ↓
AdminRoute Protection
     ↓
Admin Dashboard
     ↓
┌───────────────┐
│ Dashboard     │
│ Analytics     │
│ Products      │
│ Orders        │
│ Users         │
│ Messages      │
└───────────────┘
```

The admin sidebar can be collapsed to provide more workspace for the dashboard.

---

# 🧠 What I Learned

Through this project I worked with:

* React component architecture
* Vite
* React Router
* Protected routes
* JWT authentication
* Context API
* Local Storage
* REST API integration
* Axios interceptors
* Form validation
* React Hook Form
* Yup
* Stripe Checkout
* Payment confirmation
* Order management
* Admin dashboard architecture
* CRUD operations
* Search and filtering
* Pagination
* Recharts
* Cloudinary
* Responsive UI design
* Forgot Password / Reset Password workflows
* Email-based authentication workflows

---

# 📌 Future Improvements

Potential future improvements include:

* ❤️ Wishlist
* ⭐ Product reviews and ratings
* 🎟️ Coupon system
* 🏷️ Discount management
* 🌙 Dark mode
* 🌍 Multi-language support
* 📱 Progressive Web App support
* 🔔 More notification features
* 📦 Advanced inventory management
* 📊 More advanced analytics

---

# 🔗 Related Repository

Backend repository:

```
https://github.com/Faiza-tech/hairoilbackend
```

---

# 👨‍💻 Author

**Faiza**

GitHub:

```
https://github.com/Faiza-tech
```

If you find this project useful, feel free to ⭐ the repository.
