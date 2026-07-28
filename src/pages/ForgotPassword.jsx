import { useForm } from "react-hook-form";
import api from "../api/Axios";
import { useState } from "react";
import styles from "./ForgotPassword.module.css";

const ForgotPassword = () => {

    const { register, handleSubmit, reset, } = useForm();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const res = await api.post("/api/auth/forgot-password", data);

            setMessage(res.data.message);

            reset();

        } catch (err) {

            setMessage(err.response?.data?.message || "Something went wrong");

        }

        setLoading(false);
    };

    return (

        <section className={styles.wrapper}>

            <div className={styles.card}>

                <h1>Forgot Password</h1>

                <p>
                    Enter your registered email and we'll send a
                    password reset link.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <input type="email" placeholder="Enter Email"  {...register("email")} required />

                    <button disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>

                </form>

                {message && (
                    <div className={styles.message}>
                        {message}
                    </div>
                )}

            </div>

        </section>
    );
};

export default ForgotPassword;