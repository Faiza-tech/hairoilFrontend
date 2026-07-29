
import { useState } from "react";
import Sidebar from "./SideBar";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {

  const [collapsed, setCollapsed] = useState(false);

  return (

    <div className="admin-layout">

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={
          collapsed
            ? "admin-main expanded"
            : "admin-main"
        }
      >

        {children}

      </div>

    </div>

  );

};

export default AdminLayout;

