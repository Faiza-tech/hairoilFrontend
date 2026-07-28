/**API: MyOrders.jsx → USER page

GET /api/orders/my

User can see:

all past orders
status (pending / shipped / delivered)
total price
date

👉 This is what makes it a REAL ecommerce app */


import { useEffect, useState } from "react";
import api from "../../api/Axios";
import { getToken } from "../../utils/auth";
import styles from "./MyOrders.module.css";

const MyOrders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchOrders = async () => {

      try {
        {/**  GET /api/orders/my   means:  “Give me ONLY MY orders” ,
           we have 2 types of order 
           1.user ->  GET /api/orders/my -> Only logged-in user's orders
           2.admin  -> GET /api/orders -> ALL orders in system

           SIMPLE MEMORY TRICK
            /my = “MY orders page”
             / = “ALL orders (admin)”       

           */}

       /* const { data } = await api.get("/api/orders/my", {

          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });*/

        const { data } = await api.get("/api/orders/my");

        setOrders(data);

      } catch (error) {
        console.log(error);
      }
      finally {

        setLoading(false);

      }
    };

    fetchOrders();

  }, []);

  if (loading) {
    return <h2>Loading orders...</h2>;
  }

  return (

    <div className={styles.page}>

      <h1 className={styles.title}> My Orders </h1>

      {orders.length === 0 ? (

        <p className={styles.empty}> No orders found</p>

      ) : (

        orders.map((order) => (

          <div
            key={order._id}
            className={styles.orderCard}
          >

            <div className={styles.orderRow}>
              <span className={styles.label}>
                Order ID:
              </span>{" "}
              {order._id}
            </div>

            <div className={styles.orderRow}>
              <span className={styles.label}>
                Total:
              </span>{" "}
              ₹{order.totalPrice}
            </div>

            <div className={styles.orderRow}>
              <span className={styles.label}>
                Status:
              </span>{" "}

              <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`} >
                {order.status}
              </span>

              <div
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  color: order.isPaid ? "green" : "red",
                }}
              >
                {order.isPaid
                  ? "✅ Payment Completed"
                  : "❌ Payment Pending"}
              </div>
            </div>

            <div className={styles.orderRow}>
              <span className={styles.label}>
                Date:
              </span>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </div>

          </div>

        ))

      )}

    </div>
  );
};

export default MyOrders;


{/* {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p>Order ID: {order._id}</p>
          <p>Total: ₹{order.totalPrice}</p>
          <p>Status: {order.status}</p>
        </div>

      ))}

    </div>
  );
};

export default MyOrders;*/}