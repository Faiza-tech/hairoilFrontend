//  ORDER SUCCESS PAGE

/**After user places order:

show confirmation
show order ID
button → “View My Orders”*/



import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/Axios";
import { getToken } from "../../utils/auth";
import styles from "./OrderSuccess.module.css";

const OrderSuccess = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchOrder = async () => {

      try {

        console.log("OrderSuccess page loaded");
        console.log("ID:", id);

        const { data } = await api.get("/api/orders/my",)


        console.log("ORDERS:", data);
        console.log("CURRENT ID:", id);

        const foundOrder = data.find((o) => o._id === id);

        console.log("FOUND:", foundOrder);

        localStorage.removeItem("shippingAddress");

        setOrder(foundOrder);

      } catch (err) {
        console.log(err);

        console.log(err.response);
        console.log(err.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <h2 className={styles.loading}>Loading order...</h2>;
  }

  if (!order) {
    return <h2 className={styles.error}>Order not found</h2>;
  }

  return (
    <div className={styles.page}>

      {/* SUCCESS HEADER */}
      <div className={styles.successBox}>
        <div className={styles.checkIcon}>✔</div>

        <h1>Order Placed Successfully!</h1>

        <p className={styles.subText}>
          Thank you for your purchase. Your order is confirmed.
        </p>

        <div className={styles.orderId}>
          Order ID: <span>{order._id}</span>
        </div>


        <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`} >
          {order.status}
        </span>

      </div>

      {/* CONTENT GRID */}
      <div className={styles.grid}>

        {/* LEFT - ITEMS */}
        <div className={styles.card}>
          <h2>Items</h2>

          {order.orderItems.map((item, i) => (
            <div key={i} className={styles.item}>
              <img src={item.image} alt={item.name} />

              <div>
                <h4>{item.name}</h4>
                <p>Qty: {item.qty}</p>
                <p>₹{item.price}</p>
              </div>

              <div className={styles.itemTotal}>
                ₹{item.qty * item.price}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT - SUMMARY */}
        <div className={styles.card}>
          <h2>Order Summary</h2>

          <p>
            <b>Total:</b> ₹{order.totalPrice}
          </p>

          <p>
            <b>Status:</b> {order.status}
          </p>

          <p>
            <b>Date:</b>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>

          <hr />

          <h3>Shipping</h3>

          <p>
            <strong>
              {order.shippingAddress.fullName}
            </strong>
          </p>


          <p>{order.shippingAddress.addressLine1}</p>

          {order.shippingAddress.addressLine2 && (
            <p>{order.shippingAddress.addressLine2}</p>
          )}

          <p>
            {order.shippingAddress.city},
            {" "}
            {order.shippingAddress.state}
          </p>

          <p>
            {order.shippingAddress.postalCode}
          </p>

          <p>
            {order.shippingAddress.country}
          </p>

          <p>
            {order.shippingAddress.phone}
          </p>

        </div>

      </div>

      {/* BUTTONS */}
      <div className={styles.buttons}>
        <button onClick={() => navigate("/my-orders")}>
          View My Orders
        </button>

        <button onClick={() => navigate("/products")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;



