import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const PaymentSuccess = () => {

  const navigate = useNavigate();

  const { clearCart } = useCart();

  const [searchParams] = useSearchParams();

  /* useEffect(() => {
 
     const orderId = searchParams.get("orderId");
 
     clearCart();
 
     localStorage.removeItem("pendingOrder");
 
     if (orderId) {
       navigate(`/order-success/${orderId}`, {
         replace: true,
       });
     }
 
     // eslint-disable-next-line
   }, []);*/

  useEffect(() => {

    const orderId = searchParams.get("orderId");
    console.log("ORDER ID:", orderId);

    clearCart();

    localStorage.removeItem("pendingOrder");

    if (orderId) {

      console.log("Navigating to:", `/order-success/${orderId}`);

      navigate(`/order-success/${orderId}`, {
        replace: true,
      });
    }

  }, []);

  return <h2>Loading...</h2>;
};

export default PaymentSuccess;







/*import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {

  const navigate = useNavigate();

 useEffect(() => {

    setTimeout(() => {
      //navigate("/my-orders");
       navigate(`/order-success/${data._id}`);
    }, 3000);

  }, [navigate]);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px",
      }}
    >
      <h2>✅ Payment Successful</h2>

      <p>Your payment was successful.</p>

      <p>Order confirmation email will arrive shortly.</p>
    </div>
  );
};

export default PaymentSuccess;*/

















/*import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/Axios";
import { getToken } from "../../utils/auth";
import { useCart } from "../../context/CartContext";

import { useSearchParams, } from "react-router-dom";




const PaymentSuccess = () => {

  const [message, setMessage] = useState("Processing Order...");

  const navigate = useNavigate();

  const { clearCart } = useCart();

  const hasCreatedOrder = useRef(false);


  const [searchParams] = useSearchParams(); //stripe

  const sessionId = searchParams.get("session_id");



  useEffect(() => {

    if (hasCreatedOrder.current) return;

    hasCreatedOrder.current = true;

    const createOrder = async () => {

      try {

        const savedOrder = JSON.parse(localStorage.getItem("pendingOrder"));

        if (!savedOrder) return;

        const token = getToken();

        /*  const orderData = {
  
            orderItems: savedOrder.cartItems.map(item => ({
  
              name: item.name || item.title,
              qty: item.quantity,
              image: item.image,
              price: item.price,
              product: item._id,
  
            })),
  
            shippingAddress: savedOrder.shippingAddress,
  
            totalPrice: savedOrder.totalPrice,
  
            stripeSessionId: sessionId,
          };
  
          setMessage("Creating your order...");*
  
          const { data } = await api.post("/api/orders", orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          localStorage.removeItem("pendingOrder");

        clearCart();

        navigate(`/order-success/${data._id}`);

        setMessage("Redirecting...");

        navigate(`/order-success/${data._id}`);

      } catch (error) {

        console.log(error.response?.data);

        alert(
          error.response?.data?.message ||
          "Order creation failed"
        );

        navigate("/cart");
      }
      {/**catch (error) {

  const errorMessage =
    error.response?.data?.message ||
    "Order failed";

  setMessage(errorMessage);

  setTimeout(() => {

    navigate("/cart");

  }, 3000);
} *
    };

    createOrder();

  }, []);

  /*useEffect(() => {

    const createOrder = async () => {

      try {

        const savedOrder =
          JSON.parse(
            localStorage.getItem("pendingOrder")
          );

        if (!savedOrder) return;

        const token = getToken();

        const orderData = {
          orderItems: savedOrder.cartItems.map(item => ({
            name: item.name || item.title,
            qty: item.quantity,
            image: item.image,
            price: item.price,
            product: item._id,
          })),
          shippingAddress:
            savedOrder.shippingAddress,
          totalPrice:
            savedOrder.totalPrice,
        };

        const { data } =
          await api.post(
            "/api/orders",
            orderData,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        clearCart();

        localStorage.removeItem(
          "pendingOrder"
        );

        navigate(
          `/order-success/${data._id}`
        );

      } catch (error) {
        console.log(
          "ORDER ERROR:",
          error.response?.data || error.message
        );
      }
    };

    createOrder();

  }, []);*/



/**  return <h2>Processing Order...</h2>;*
return (
  <div
    style={{
      textAlign: "center",
      padding: "60px",
    }}
  >
    <h2>{message}</h2>

    {message.includes("out of stock") && (
      <p>
        Redirecting to cart...
      </p>
    )}
  </div>

);

};

export default PaymentSuccess;
*/





