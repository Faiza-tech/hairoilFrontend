
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/Axios";
import { getUser } from "../utils/auth";



const AdminRoute = ({ children }) => {

  const navigate = useNavigate();

  const userInfo = getUser();

  useEffect(() => {

    const checkUser = async () => {

      try {

        await api.get("/api/auth/profile");

      } catch (error) {

        localStorage.removeItem("userInfo");

        navigate("/login");

      }

    };

    if (userInfo?.token) {
      checkUser();
    }

  }, []);

  if (!userInfo || !userInfo.isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;


