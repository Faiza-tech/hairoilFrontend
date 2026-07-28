

import { Link, useLocation } from "react-router-dom";

import {
  FaBars,
  FaHome,
  FaChartLine,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaEnvelope,
} from "react-icons/fa";

import "./SideBar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {

  const location = useLocation();

  const menus = [

    {
      name: "Dashboard",
      path: "/admin",
      icon: <FaHome />
    },

    {
      name: "Analytics",
      path: "/admin/stats",
      icon: <FaChartLine />
    },

    {
      name: "Products",
      path: "/admin/products",
      icon: <FaBoxOpen />
    },

    {
      name: "Orders",
      path: "/admin/orders",
      icon: <FaShoppingCart />
    },

    {
      name: "Users",
      path: "/admin/users",
      icon: <FaUsers />
    },

    {
      name: "Messages",
      path: "/admin/messages",
      icon: <FaEnvelope />
    },

  ];

  return (

    <div className={collapsed ? "admin-sidebar collapsed" : "admin-sidebar"} >

      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)} >
        <FaBars />
      </button>

      {!collapsed && (

        <h2 className="sidebar-title">
          Admin Panel
        </h2>

      )}

      <div className="sidebar-links">

        {menus.map((menu) => (

          <Link key={menu.path} to={menu.path} className={location.pathname === menu.path ? "sidebar-link active" : "sidebar-link"}  >

            <span className="sidebar-icon">
              {menu.icon}
            </span>

            <span className="sidebar-text">{menu.name}</span>

    
          </Link>

        ))}

      </div>

    </div>

  );

};

export default Sidebar;
