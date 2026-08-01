
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const navigate = useNavigate();

  return (
    <section className={styles["cart-page"]}>
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className={styles["empty-cart"]}>
          <FaShoppingCart className={styles["empty-cart-icon"]} />
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div className={styles["cart-items-wrapper"]}>
          {cartItems.map((item) => (
            <div key={item._id} className={styles["cart-item"]}>
              <img src={item.image} alt={item.title} />

              <div className={styles["cart-item-details"]}>
                <h3>{item.name || item.title}</h3>

                <p className={styles.price}>
            
                 £{item.price.toLocaleString("en-GB")}
                </p>

                <p className={styles.subtotal}>
                  Subtotal: £
                  <h2>Total: £{total.toLocaleString("en-GB")}</h2>
                </p>

                <div className={styles.qtyControls}>
                  <button onClick={() => decreaseQty(item._id)} className={styles.qtyBtn}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item._id)} className={styles.qtyBtn}>+</button>
                </div>

                <button
                  className={styles.remove}
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}


          <div className={styles["cart-total"]}>
            <h2>Total: £{total.toLocaleString("en-PK")}</h2>

            <button
              onClick={() => navigate("/checkout")}
              className={styles.checkoutBtn}
            >
              Proceed to Checkout
            </button>
          </div>


        </div>
      )}
    </section>
  );
};


export default Cart;
