
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import styles from "./ProductDetails.module.css";
import axios from "axios";
import api from "../api/Axios";
import { getToken } from "../utils/auth";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";


const ProductDetails = () => {

  const { id } = useParams();

  // PRODUCT STATE
  const [product, setProduct] = useState(null);

  // ✅ Accordion state (IMPORTANT)
  const [openSection, setOpenSection] = useState(null);

  // REVIEW STATES
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // REVIEW MENU
  const [openMenu, setOpenMenu] = useState(null);

  // EDIT REVIEW
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);


  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();


  // FETCH SINGLE PRODUCT
  useEffect(() => {

    window.scrollTo(0, 0);

    const fetchProduct = async () => {
      try {

        const res = await api.get(
          `/api/products/${id}`
        );

        setProduct(res.data);

      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();

  }, [id]);


  // SUBMIT REVIEW
  const submitReview = async (e) => {

    e.preventDefault();

    if (!comment.trim()) {
      return alert("Please write comment");
    }

    try {

      await api.post(
        `/api/products/${id}/reviews`,
        {
          rating,
          comment,
        },
      );

      alert("Review added");
      window.location.reload();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Review failed"
      );

    }

  };

  // DELETE REVIEW
  const deleteReview = async (reviewId) => {

    try {

      await api.delete(
        `/api/products/${id}/reviews/${reviewId}`,
      );

      alert("Review deleted");

      window.location.reload();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Delete failed"
      );

    }
  };


  // EDIT REVIEW
  const updateReview = async (reviewId) => {

    try {

      await api.put(
        `/api/products/${id}/reviews/${reviewId}`,
        {
          rating: editRating,
          comment: editComment,
        },
      );

      alert("Review updated");

      window.location.reload();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Update failed"
      );
    }
  };


  // LOADING
  if (!product) {
    return <p>Loading...</p>;
  }

  // ✅ simple cart (no size) -> CART ITEM
  const item = cartItems.find(i => i._id === product._id);

  // CURRENT USER
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  return (
    <>
      <div className={styles.container}>

        {/* TOP SECTION */}
        <div className={styles.topSection}>

          {/* IMAGE */}
          <div className={styles.imageBox}>
            <img src={product.image} alt={product.title} />
          </div>

          {/* DETAILS */}
          <div className={styles.details}>
            <h2>{product.title}</h2>

            {/* ⭐ RATING */} <p> ⭐ {product.ratings?.toFixed(1) || 0} {" "} ({product.numReviews} reviews) </p>

            <p className={styles.price}> ₹{product.price} </p>


            {/* CART CONTROLS */}
            {item ? (
              <div className={styles.qtyControls}>
                <button onClick={() => decreaseQty(product._id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(product._id)}>+</button>
              </div>
            ) : (
              <button
                className={styles.addBtn}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>

        {/* DESCRIPTION + FEATURES */}
        {/* ACCORDION */}
        <div className={styles.accordion}>

          {/* DESCRIPTION */}
          <div className={styles.section}>
            <div
              className={styles.header}
              onClick={() =>
                setOpenSection(openSection === "desc" ? null : "desc")
              }
            >
              <span>Description</span>
              <span>{openSection === "desc" ? "-" : "+"}</span>
            </div>

            {openSection === "desc" && (
              <p className={styles.content}>
                {product.description}
              </p>
            )}
          </div>

          {/* FEATURES */}
          <div className={styles.section}>
            <div
              className={styles.header}
              onClick={() =>
                setOpenSection(openSection === "features" ? null : "features")
              }
            >
              <span>Features</span>
              <span>{openSection === "features" ? "-" : "+"}</span>
            </div>

            {openSection === "features" && (
              product.features && product.features.length > 0 ? (
                <ul className={styles.content}>
                  {product.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              ) : (
                <p className={styles.content}>No features available</p>
              )
            )}
          </div>

        </div>



        {/* REVIEWS */}
        <div className={styles.reviewSection}>

          <h2 className={styles.reviewTitle}>
            Customer Reviews
          </h2>

          {product.reviews?.length === 0 ? (

            <p>No reviews yet</p>

          ) : (

            product.reviews.map((review) => (
              <div key={review._id} className={styles.reviewCard}>

                {/* LEFT SIDE: name, rating, comment */}
                <div className={styles.reviewContent}>
                  <h4 className={styles.reviewName}>{review.name}</h4>

                  <p className={styles.reviewRating}>
                    {"⭐".repeat(review.rating)}
                  </p>

                  <p className={styles.reviewComment}>{review.comment}</p>
                </div>

                {/* RIGHT SIDE: 3-dot menu */}

                {getToken() &&
                  (
                    review.user.toString() === userInfo?._id.toString()
                    || userInfo?.isAdmin
                  ) && (

                    <div className={styles.menuWrapper}>
                      <button
                        className={styles.menuBtn}
                        onClick={() =>
                          setOpenMenu(openMenu === review._id ? null : review._id)
                        }
                      >
                        {/**  <BsThreeDotsVertical />  */}
                        <HiOutlineDotsVertical />
                      </button>

                      {openMenu === review._id && (
                        <div className={styles.dropdownMenu}>

                          {review.user.toString() === userInfo?._id.toString() && (
                            <button

                              onClick={() => {
                                setEditingReviewId(review._id);
                                setEditComment(review.comment);
                                setEditRating(review.rating);
                                setOpenMenu(null);
                              }}
                            >
                              <FiEdit2 />
                              Edit
                            </button>
                          )}


                          <button onClick={() => deleteReview(review._id)}>
                            <RiDeleteBin6Line /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}

              </div>
            ))

          )}

        </div>

        {/* EDIT MODAL */}
        {editingReviewId && (

          <div className={styles.modalOverlay}>

            <div className={styles.modal}>

              <h3>Edit Review</h3>

              {/* STARS */}
              <div className={styles.starContainer}>

                {[1, 2, 3, 4, 5].map((star) => (

                  <span
                    key={star}
                    className={
                      star <= editRating
                        ? styles.activeStar
                        : styles.star
                    }
                    onClick={() =>
                      setEditRating(star)
                    }
                  >
                    ★
                  </span>

                ))}

              </div>

              {/* COMMENT */}
              <textarea
                className={styles.reviewTextarea}
                value={editComment}
                onChange={(e) =>
                  setEditComment(e.target.value)
                }
              />

              <div className={styles.modalButtons}>

                <button
                  onClick={() =>
                    updateReview(editingReviewId)
                  }
                  className={styles.reviewBtn}
                >
                  Save
                </button>

                <button
                  onClick={() =>
                    setEditingReviewId(null)
                  }
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        )}


        {/* REVIEW FORM */}
        <div className={styles.reviewForm}>

          {getToken() ? (

            <form onSubmit={submitReview}>

              <h3>Write Review</h3>

              {/* STAR RATING */}
              <div className={styles.starContainer}>
                {
                  [1, 2, 3, 4, 5].map((star) => (

                    <span key={star} className={star <= rating ? styles.activeStar : styles.star}
                      onClick={() => setRating(star)} >
                      ★ </span>
                  ))
                }
              </div>


              {/* COMMENT */}
              <textarea
                className={styles.reviewTextarea}
                placeholder="Write your review..."
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
              />

              <button
                type="submit"
                className={styles.reviewBtn}
              >
                Submit Review
              </button>



            </form>

          ) : (

            <p>Please login to write review</p>

          )}

        </div>


      </div>

    </>
  );
};

export default ProductDetails;


