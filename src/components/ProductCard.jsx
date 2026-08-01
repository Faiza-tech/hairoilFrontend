
import { useCart } from "../context/CartContext";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ _id, image, title, description, price, onImageClick, ratings, numReviews, view }) => {


  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();
  const item = cartItems.find((i) => i._id === _id);

  const navigate = useNavigate();


  return (
    <>

      <div className={view === "list" ? styles["list-card"] : styles["product-card"]}>

        <img
          src={image}
          alt={title}
          onClick={() => navigate(`/product/${_id}`)}
          loading="lazy"
        />

        <div className={styles["product-info"]}>
          <h3>{title}</h3>

          <p className={styles.rating}>
            ⭐ {ratings?.toFixed(1) || 0} {" "} ({numReviews || 0} reviews)
          </p>


          <p>{description}</p>
          <span className={styles.price}>£{price}</span>
       
          {item ? (

            <div className={styles["qty-controls"]}>
              <button onClick={() => decreaseQty(_id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQty(_id)}>+</button>
            </div>
          ) : (
            <button className={styles["add-btn"]} onClick={() => addToCart({ _id, image, title, description, price })}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;

