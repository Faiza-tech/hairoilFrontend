
import { useEffect, useState } from "react";
import api from "../../api/Axios";
import { getToken } from "../../utils/auth";
import AdminLayout from "../../components/adminReuseUI/AdminLayout";
import styles from "./AdminOrders.module.css";

const AdminOrders = () => {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  //order search
  const [search, setSearch] = useState("");


  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const { data } = await api.get(
        "/api/orders",
      );

      setOrders(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {

    try {

      await api.put(
        `/api/orders/${id}/status`,
        { status },
      );

      // REFRESH ORDERS
      fetchOrders();

    } catch (error) {

      console.log(error);

      alert("Failed to update status");

    }
  };


  // CANCEL ORDER
  const cancelOrder = async (id) => {

    try {

      await api.put(
        `/api/orders/${id}/status`,
        { status: "Cancelled" },
      );

      fetchOrders();

    } catch (error) {

      console.log(error);

    }
  };

  //order search
  const filteredOrders = orders.filter((order) =>
    order._id.toLowerCase().includes(search.toLowerCase()) ||
    order.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    order.user?.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h2>Loading orders...</h2>;
  }


  const exportOrdersCSV = () => {

    const headers = [
      "Order ID",
      "Customer",
      "Email",
      "Total",
      "Status",
      "Date",
    ];

    const rows = filteredOrders.map((order) => [

      order._id,

      order.user?.name || "",

      order.user?.email || "",

      order.totalPrice,

      order.status,

      new Date(order.createdAt).toLocaleString(),

    ]);

    const csvContent = [

      headers.join(","),

      ...rows.map((row) => row.join(","))

    ].join("\n");

    const blob = new Blob(
      [csvContent],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "orders.csv";

    link.click();
  };


  return (

    <AdminLayout>

      <div className={styles.page}>

        <h1>Admin Orders</h1>


        {/** order search */}
        <input
          type="text"
          placeholder="Search by Order ID, Customer or Email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />


        {/** Export Button */}
        <button
          onClick={exportOrdersCSV}
          className={styles.exportBtn}
        >
          Export CSV
        </button>


        {orders.length === 0 ? (

          <p>No orders found</p>

        ) : (

          filteredOrders.map((order) => (

            <div
              key={order._id}
              className={styles.card}
            >

              <p>
                <strong>Order ID:</strong>
                {" "}
                {order._id}
              </p>

              <p>
                <strong>User:</strong>
                {" "}
                {order.user?.name}
              </p>

              <p>
                <strong>Email:</strong>
                {" "}
                {order.user?.email}
              </p>


              <hr />

              <p>
                <strong>Customer:</strong>
                {" "}
                {order.shippingAddress?.fullName}
              </p>

              <p>
                <strong>Phone:</strong>
                {" "}
                {order.shippingAddress?.phone}
              </p>

              <p>
                <strong>Address:</strong>
                {" "}
                {order.shippingAddress?.addressLine1}
              </p>

              {order.shippingAddress?.addressLine2 && (
                <p>
                  {order.shippingAddress.addressLine2}
                </p>
              )}

              <p>
                {order.shippingAddress?.city},
                {" "}
                {order.shippingAddress?.state}
              </p>

              <p>
                {order.shippingAddress?.postalCode}
              </p>

              <p>
                {order.shippingAddress?.country}
              </p>

              <hr />


              <p>
                <strong>Total:</strong>
                {" "}
                £{order.totalPrice}
              </p>

              <p>
                <strong>Date:</strong>
                {" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>

              {/* STATUS */}
              <div>

                <strong>Status:</strong>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(
                      order._id,
                      e.target.value
                    )
                  }
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Processing">
                    Processing
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>

                </select>

              </div>

              {/* CANCEL BUTTON */}
              {
                order.status === "Pending" && (

                  <button
                    onClick={() => cancelOrder(order._id)}
                  >
                    Cancel Order
                  </button>
                )
              }

            </div>



          ))

        )}



      </div>

    </AdminLayout>
  );
};

export default AdminOrders;

