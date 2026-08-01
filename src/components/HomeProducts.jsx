import { useEffect, useState } from "react";
import api from "../api/Axios";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";


import "./HomeProducts.css";
import "../Styles/CommonStyles.css";

const HomeProducts = () => {

  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);


  // FETCH PRODUCTS
  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await api.get("/api/products");
        
        setProducts(res.data.products);

      } catch (error) {

        console.error(
          "Error fetching products:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

    fetchProducts();

  }, []);


  // FIND CART ITEM
  const getItem = (id) =>
    cartItems.find(
      (item) => item._id === id
    );


  // LOADING
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section id="products" className="home-products">
      <div className="section-container">

        {/* HEADER */}
        <div className="section-header">
          <h2 className="section-title">Our Signature Collection</h2>
          <p className="section-subtitle">
            Each blend is carefully formulated to nourish your hair
          </p>
        </div>

        {/* PRODUCTS GRID (ONLY 4 PRODUCTS) */}
        <div className="home-products-grid">
          {products.slice(0, 4).map((product) => {
            const item = getItem(product._id);

            return (
              <div key={product._id} className="home-product-card">

                {/* CLICK IMAGE → PRODUCT DETAILS PAGE */}
                <Link to={`/product/${product._id}`}>
                  <div className="home-product-image">
                    <img src={product.image} alt={product.title} />
                  </div>
                </Link>

                {/* PRODUCT INFO */}
                <div className="home-product-info">
                  <h3 className="home-product-name">{product.title}</h3>
                  <p className="home-product-description">{product.description}</p>

                  <div className="home-product-footer">
                    <span className="home-product-price">
                      £{product.price}
                    </span>

                    {/* CART BUTTON LOGIC */}
                    {item ? (
                      <div className="home-qty-controls">
                        <button onClick={() => decreaseQty(product._id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQty(product._id)}>+</button>
                      </div>
                    ) : (
                      <button
                        className="btn-primary btn-sm "
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* VIEW ALL BUTTON */}
        <div className="pbtn">
          <Link to="/products" className="soft-btnn">
            View Products
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HomeProducts;