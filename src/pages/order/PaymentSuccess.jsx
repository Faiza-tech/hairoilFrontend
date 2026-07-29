import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const PaymentSuccess = () => {

  const navigate = useNavigate();

  const { clearCart } = useCart();

  const [searchParams] = useSearchParams();

 

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



