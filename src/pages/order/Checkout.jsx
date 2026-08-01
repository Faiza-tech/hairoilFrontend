
import { useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import api from "../../api/Axios";
import { useCart } from "../../context/CartContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "../../validations/checkoutSchema";
import './Checkout.css'

const Checkout = () => {

    const { cartItems, clearCart } = useCart();

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );


    //Get reset from useForm
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, } = useForm({
        resolver: yupResolver(checkoutSchema),
        mode: "onTouched",
    });

    //Restore saved address
    useEffect(() => {

        const saved = localStorage.getItem("shippingAddress");

        if (saved) {
            reset(JSON.parse(saved));
        }

    }, [reset]);


    const handleStripePayment = async (formData) => {

        //Save address before redirecting to Stripe
        localStorage.setItem(
            "shippingAddress",
            JSON.stringify(formData)
        );

        try {
            // calling Stripe directly
            const orderData = {
                orderItems: cartItems.map(item => ({
                    name: item.name || item.title,
                    qty: item.quantity,
                    image: item.image,
                    price: item.price,
                    product: item._id,
                })),
                shippingAddress: formData,
                totalPrice,
            };

            const orderRes = await api.post(
                "/api/orders",
                orderData,
            );
            const paymentRes = await api.post(
                "/api/payment/create-checkout-session",
                {
                    orderId: orderRes.data._id,
                }
            );

            window.location.href = paymentRes.data.url;

        } catch (error) {

            console.log("FULL ERROR:");

            console.log(error.response?.data);

            alert(
                JSON.stringify(error.response?.data)
            );
        }
    };



    return (
        <div className="checkout-page">

            <h1 className="checkout-title"> Checkout </h1>

            {/* SHIPPING FORM */}

            <div className="checkout-form">

                <div className="form-group">
                    <input
                        {...register("fullName")}
                        placeholder="Full Name"
                    />

                    {errors.fullName && (
                        <small className="error">
                            {errors.fullName.message}
                        </small>
                    )}
                </div>


                <div className="form-group">
                    <input
                        {...register("phone")}
                        placeholder="Phone Number"
                    />

                    {errors.phone && (
                        <small className="error">
                            {errors.phone.message}
                        </small>
                    )}
                </div>


                <div className="form-group">
                    <input
                        {...register("addressLine1")}
                        placeholder="Address Line 1"
                    />

                    {errors.addressLine1 && (
                        <small className="error">
                            {errors.addressLine1.message}
                        </small>
                    )}
                </div>


                <input
                    {...register("addressLine2")}
                    placeholder="Address Line 2 (Optional)"
                />


                <div className="form-group">
                    <input
                        {...register("city")}
                        placeholder="City"
                    />

                    {errors.city && (
                        <small className="error">
                            {errors.city.message}
                        </small>
                    )}
                </div>


                <div className="form-group">
                    <input
                        {...register("state")}
                        placeholder="County / State"
                    />

                    {errors.state && (
                        <small className="error">
                            {errors.state.message}
                        </small>
                    )}
                </div>


                <div className="form-group">
                    <input
                        {...register("postalCode")}
                        placeholder="Postcode"
                    />

                    {errors.postalCode && (
                        <small className="error">
                            {errors.postalCode.message}
                        </small>
                    )}
                </div>


                <div className="form-group">
                    <input
                        {...register("country")}
                        placeholder="Country"
                    />

                    {errors.country && (
                        <small className="error">
                            {errors.country.message}
                        </small>
                    )}
                </div>

            </div>

            {/* ORDER SUMMARY */}
            <div className="checkout-summary">

                <div className="checkout-total">
                    Total: £{totalPrice}   
                </div>


                <button
                    className="place-order-btn"
                    onClick={handleSubmit(handleStripePayment)}
                >
                    Pay With Stripe
                </button>

            </div>

        </div>
    );
};

export default Checkout;

