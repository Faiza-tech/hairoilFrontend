import { useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import api from "../api/Axios";
import { resetPasswordSchema } from "../validations/authSchema";

import styles from "./ResetPassword.module.css";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const toast = useRef(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(resetPasswordSchema),
    });

    const onSubmit = async (data) => {
        try {
            await api.put(`/api/auth/reset-password/${token}`, {
                password: data.password,
            });

            toast.current.show({
                severity: "success",
                summary: "Password Reset",
                detail: "Your password has been reset successfully.",
                life: 3000,
            });

            setTimeout(() => {
                navigate("/login");
            }, 1800);


        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: "Reset Failed",
                detail:
                    error.response?.data?.message ||
                    "Reset link is invalid or expired.",
                life: 4000,
            });
        }
    };

    return (
        <section className={styles.page}>
            <Toast ref={toast} position="top-center" />

            <div className={styles.card}>
                <div className={styles.icon}>🔐</div>

                <h1>Reset Password</h1>

                <p className={styles.subtitle}>
                    Create a new password for your account.
                </p>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* PASSWORD */}
                    <div className={styles.field}>
                        <label>New Password</label>


                        <div className={styles.passwordWrapper}>

                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                className={
                                    errors.password ? styles.errorInput : ""
                                }
                                placeholder="Enter new password"
                            />

                            <button type="button" className={styles.eyeButton} onClick={() => setShowPassword(!showPassword)} >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>

                        {errors.password && (
                            <small className={styles.error}>
                                {errors.password.message}
                            </small>
                        )}
                    </div>


                    {/* CONFIRM PASSWORD */}
                    <div className={styles.field}>
                        <label>Confirm Password</label>

                        <div className={styles.passwordWrapper}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword")}
                                className={
                                    errors.confirmPassword
                                        ? styles.errorInput
                                        : ""
                                }
                                placeholder="Confirm new password"
                            />

                            <button type="button" className={styles.eyeButton} onClick={() => setShowConfirmPassword(!showConfirmPassword)} >
                                {showConfirmPassword ? (<FaEyeSlash />) : (<FaEye />)}
                            </button>

                        </div>

                        {errors.confirmPassword && (
                            <small className={styles.error}>
                                {errors.confirmPassword.message}
                            </small>
                        )}
                    </div>

                    <Button
                        type="submit"
                        label={isSubmitting ? "Resetting Password..." : "Reset Password"}
                        disabled={isSubmitting}
                        className={styles.submitButton}
                    />

                </form>


                <div className={styles.backLogin}>
                    Remember your password?
                    <Link to="/login"> Login</Link>
                </div>
            </div>
        </section>
    );
};

export default ResetPassword;