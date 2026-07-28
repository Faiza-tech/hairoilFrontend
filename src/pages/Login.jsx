import { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

//import axios from "axios";
import api from "../api/Axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { loginSchema } from "../validations/authSchema";
import { saveUser } from "../utils/auth"; // for expiry login

import styles from "./Login.module.css";




const Login = () => {

    const [showPassword, setShowPassword] = useState(false)

    const toast = useRef(null);


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data) => {

        try {

            const res = await api.post("/api/auth/login", data);

            saveUser(res.data);


            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Login successful",
                life: 3000,
            });

            reset();

            setTimeout(() => {
                window.location.href = "/";
            }, 1500);


        } catch (error) {

            toast.current.show({
                severity: "error",
                summary: "Error",
                detail:
                    error.response?.data?.message ||
                      "Incorrect email or password. Please check your details and try again.",
                  //  "Login failed",
                life: 4000,
            });

        }
    };

    return (
        <section className={styles.loginPage}>

            <Toast ref={toast} position="top-center" />

            <div className={styles.card}>

                <h1>Welcome Back</h1>

                <p>Login to continue shopping.</p>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

                    {/* EMAIL */}
                    <div className={styles.field}>
                        <label>Email</label>

                        <input
                            type="email"
                            {...register("email")}
                            className={errors.email ? styles.errorInput : ""}
                        />

                        {errors.email && (
                            <small className={styles.error}>
                                {errors.email.message}
                            </small>
                        )}
                    </div>

                    {/* PASSWORD */}
                    <div className={styles.field}>

                        <label>Password</label>

                        <div className={styles.passwordWrapper}>

                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                className={errors.password ? styles.errorInput : ""}
                            />

                            <span
                                className={styles.eyeIcon}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>

                        </div>

                        {errors.password && (
                            <small className={styles.error}>
                                {errors.password.message}
                            </small>
                        )}

                    </div>

                    <div style={{ textAlign: "left", marginBottom: "10px", fontWeight:"bold"}} >
                        <Link to="/forgot-password">
                            Forgot Password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        label={
                            isSubmitting
                                ? "Logging In..."
                                : "Login"
                        }
                        disabled={isSubmitting}
                    />

                </form>

                <div className={styles.bottomText}>
                    Don’t have an account?

                    <Link to="/register">
                        Register
                    </Link>
                </div>

            </div>

        </section>
    );
};

export default Login;