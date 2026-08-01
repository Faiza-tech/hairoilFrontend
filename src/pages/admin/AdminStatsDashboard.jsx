
import { useEffect, useState } from "react";
import api from "../../api/Axios";
import { Link } from "react-router-dom"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, } from "recharts";

import AdminLayout from "../../components/adminReuseUI/AdminLayout";
import AdminCard from "../../components/adminReuseUI/AdminCard";

import "./AdminStatsDashboard.css";

const AdminStatsDashboard = () => {

  //console.log('Admin Stats Page')// this runs every render

  const [stats, setStats] = useState(null);

  useEffect(() => {

    //console.log("Admin Stats Page Loaded");

    const fetchStats = async () => {

      try {

        const { data } = await api.get("/api/admin/dashboard");

        console.log(data);

        setStats(data);

      } catch (error) {

        console.log(error);

      }
    };

    fetchStats();

  }, []);

  if (!stats) {
    return (
      <AdminLayout>
        <h2>Loading Dashboard...</h2>
      </AdminLayout>
    );
  }

  //console.log("monthly sales:", stats.monthlySales)

  // console.log(" sales:", stats.monthlySales[0])


  return (

    <AdminLayout>

      <div className="stats-page">

        <h1>Analytics Dashboard</h1>

        <div className="stats-grid">

          <AdminCard
            title="Products"
            value={stats.totalProducts}
          />

          <AdminCard
            title="Users"
            value={stats.totalUsers}
          />

          <AdminCard
            title="Orders"
            value={stats.totalOrders}
          />

          <AdminCard
            title="Revenue"
            value={`£${Number(stats.totalRevenue || 0).toLocaleString()}`}
          />

          <AdminCard
            title="Inventory Left"
            value={stats.inventorySummary.totalInventory}
          />

          <AdminCard
            title="Products Sold"
            value={stats.inventorySummary.totalSold}
          />

          <AdminCard
            title="Pending Orders"
            value={stats.pendingOrders}
          />

          <AdminCard
            title="Shipped Orders"
            value={stats.shippedOrders}
          />

          <AdminCard
            title="Delivered Orders"
            value={stats.deliveredOrders}
          />

        </div>

        {/** chart */}
        <div className="chart-section">
          <h2>Monthly Revenue</h2>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={stats.monthlySales || []}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>


        {/** low stock */}
        <div className="low-stock">

          <h2 className="low-stock-heading">Inventory Report</h2>

          {/* Low Stock Products  */}
          <div className="low-stock-products">

            <h2>
              Low Stock Products (

              {stats.lowStockProducts.length}

              )
            </h2>

            <table>

              {/*  Head of table */}
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Stock Left</th>
                  <th>Sold</th>
                  <th>Total Inventory</th>
                </tr>
              </thead>

              {/*  Body of table */}
              <tbody>

                {stats.lowStockProducts.map((product) => (

                  <tr key={product._id}>

                    <td>{product.title}</td>

                    <td>{product.stock}</td>

                    <td>{product.totalSold}</td>

                    <td>{product.stock + product.totalSold}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* Top Selling Products */}
          <div className="Top-Selling-Products">

            <h2>Top Selling Products</h2>

            <table>

              <thead>

                <tr>
                  <th>Product</th>
                  <th>Sold</th>
                  <th>Stock Left</th>
                </tr>

              </thead>

              <tbody>

                {stats.topSellingProducts.map((product) => (

                  <tr key={product._id}>

                    <td>{product.title}</td>

                    <td>{product.totalSold}</td>

                    <td>{product.stock}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* Recent Orders */}
          <div className="Recent-Orders">

            <h2>Recent Orders</h2>

            <table>

              <thead>

                <tr>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Details </th>
                </tr>

              </thead>

              <tbody>

                {stats.recentOrders.map((order) => (

                  <tr key={order._id}>

                    <td>{order.user?.name}</td>

                    <td>£{order.totalPrice}</td>

                    <td>
                      <span
                        className={`status-badge ${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td>
                      <Link
                        to={`/admin/orders/${order._id}`}
                      >
                        View
                      </Link>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Recent Users */}
          <div className="Recent-Users">
            <h2>Recent Users</h2>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>

              <tbody>
                {stats.recentUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
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

export default AdminStatsDashboard;


