import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import Nlogo from "../assets/logoNav.png";
import "./Navbar.css";
import { getUser } from "../utils/auth";
import { logout } from "../utils/auth";


const Navbar = () => {

  const { cartItems } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [activeLink, setActiveLink] = useState("");


  const userInfo = getUser();
  //console.log(userInfo);

  // TOTAL CART QTY
  const totalQty = cartItems.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  // LOGOUT
  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  // ACTIVE SCROLL LINK
  useEffect(() => {

    const sections = document.querySelectorAll("section");

    const handleScroll = () => {

      let current = "";

      sections.forEach((section) => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

          current = section.getAttribute("id");

        }

      });

      setActiveLink(current);

    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);

  return (

    <nav className="navbar">

      <div className="nav-container">

        {/* LOGO */}
        <Link to="/" className="logo-wrapper">

          <img src={Nlogo} alt="logo" className="nav-logo" />

        </Link>

        {/* DESKTOP LINKS */}
        <div className="nav-links">

          <Link to="/">Home</Link>

          <a href="/#benefits" className={activeLink === "benefits" ? "active" : ""} >
            Benefits
          </a>

          <Link to="/products">
            Products
          </Link>

          <Link to="/about">
            About
          </Link>

          {/* USER AUTH */}

          {userInfo ? (

            <>

              {/* MY ORDERS */}
              <Link to="/my-orders">
                My Orders
              </Link>

              {/* ADMIN DASHBOARD */}
              {userInfo?.isAdmin && (

                <>
                  <Link to="/admin">
                    Admin
                  </Link>

                  {/* ADMIN ORDERS 
                  <Link to="/admin/orders">
                    Admin Orders
                  </Link>*/}
                </>

              )}

              {/* LOGOUT */}
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>

            </>

          ) : (

            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>

          )}

          {/* CART */}
          <Link to="/cart" className="cart-icon" >

            <FaShoppingCart />

            {totalQty > 0 && (
              <span className="cart-badge">
                {totalQty}
              </span>
            )}

          </Link>

          {/* SHOP BUTTON */}
          <Link to="/products" className="btn-primary" >
            Shop Now
          </Link>

        </div>

        {/* MOBILE RIGHT SIDE */}
        <div className="nav-right">

          <Link to="/cart" className="mobile-cart" >

            <FaShoppingCart />

            {totalQty > 0 && (<span className="cart-badge">
              {totalQty}
            </span>
            )}

          </Link>

          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} >

            {isMenuOpen ? (<X size={22} />) : (<Menu size={22} />)}

          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (

        <div className="mobile-menu">

          <a href="/#benefits" onClick={() => setIsMenuOpen(false)} >
            Benefits
          </a>

          <Link to="/products" onClick={() => setIsMenuOpen(false)} >
            Products
          </Link>

          <Link to="/about" onClick={() => setIsMenuOpen(false)} >
            About
          </Link>

          {/* AUTH */}
          {userInfo ? (

            <>
              {/***  Your admin link logic is properly added in:  Mobile menu  ***/}

              {/* MY ORDERS */}
              <Link to="/my-orders" onClick={() => setIsMenuOpen(false)} >
                My Orders
              </Link>

              {/* ADMIN LINKS */}
              {userInfo?.isAdmin && (

                <>
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)} >
                    Admin
                  </Link>

                  <Link to="/admin/orders" onClick={() => setIsMenuOpen(false)} >
                    Admin Orders
                  </Link>
                </>

              )}

              {/* LOGOUT */}
              <button onClick={handleLogout} className="mobile-logout" >
                Logout
              </button>

            </>

          ) : (

            <>

              <Link to="/login" onClick={() => setIsMenuOpen(false)} >
                Login
              </Link>

              <Link to="/register" onClick={() => setIsMenuOpen(false)} >
                Register
              </Link>

            </>

          )}

        </div>

      )}

    </nav>
  );
};

export default Navbar;


