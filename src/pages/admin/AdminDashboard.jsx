
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/Axios";
import AdminLayout from "../../components/adminReuseUI/AdminLayout";
import { getUser } from "../../utils/auth";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {

  const [products, setProducts] = useState([]);

  const userInfo = getUser();

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await api.get("/api/admin/products");

        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          setProducts([]);
        }

      } catch (error) {

        console.error(error);

      }

    };

    fetchProducts();

  }, []);

  return (

    <AdminLayout>

      <div className={styles.dashboard}>

        <div className={styles.header}>

          <h1>Admin Dashboard</h1>

          <p>
             Welcome Admin: <strong>{userInfo?.name}</strong>
          </p>

        </div>

        <div className={styles.cards}>

          <Link to="/admin/products" className={styles.card}>
            <div className={styles.icon}>📦</div>
            <h3>Products</h3>
            <p>Manage your products catalogue.</p>
          </Link>

          <Link to="/admin/create-product" className={styles.card}>
            <div className={styles.icon}>➕</div>
            <h3>Create Product</h3>
            <p>Add new products to your store.</p>
          </Link>

          <Link to="/admin/orders" className={styles.card}>
            <div className={styles.icon}>🛒</div>
            <h3>Orders</h3>
            <p>View and manage customer orders.</p>
          </Link>

          <Link to="/admin/stats" className={styles.card}>
            <div className={styles.icon}>📈</div>
            <h3>Analytics</h3>
            <p>Sales reports and business insights.</p>
          </Link>

          <Link to="/admin/users" className={styles.card}>
            <div className={styles.icon}>👥</div>
            <h3>Users</h3>
            <p>Manage registered customers.</p>
          </Link>

          <Link to="/admin/messages" className={styles.card}>
            <div className={styles.icon}>✉️</div>
            <h3>Contact Messages</h3>
            <p>Read enquiries from visitors.</p>
          </Link>

        </div>

        <div className={styles.tableSection}>

          <h2>Products Overview</h2>

          <div className={styles.tableWrapper}>

            <table className={styles.table}>

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Stock Left</th>
                  <th>Total Sold</th>
                </tr>

              </thead>

              <tbody>

                {products.map((product) => (

                  <tr key={product._id}>

                    <td>{product._id}</td>

                    <td>{product.title}</td>

                    <td>₹{product.price}</td>

                    <td>{product.category}</td>

                    <td>{product.stock}</td>

                    <td>{product.totalSold}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </AdminLayout>

  );

};

export default AdminDashboard;




