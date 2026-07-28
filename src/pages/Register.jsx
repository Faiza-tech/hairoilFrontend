import { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { saveUser } from "../utils/auth";
//import axios from "axios";
import api from "../api/Axios";
import {  Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputText } from "primereact/inputtext";
//import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import { registerSchema } from "../validations/authSchema";

import styles from "./Register.module.css";

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);

    const toast = useRef(null);


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async (data) => {

        try {

          
            const res = await api.post(
                "/api/auth/register",
                data
            );

            // save user
            saveUser(res.data);


            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Account created successfully",
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
                    "Registration failed",
                life: 3000,
            });

        }
    };

    return (
        <section className={styles.registerPage}>

            <Toast ref={toast} position="top-center" />

            <div className={styles.card}>

                <h1>Create Account</h1>

                <p>
                    Join us and explore premium hair care products.
                </p>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit(onSubmit)}
                >

                    {/* NAME */}
                    <div className={styles.field}>
                        <label>Name</label>

                        <InputText
                            {...register("name")}
                            className={errors.name ? "p-invalid" : ""}
                        />

                        {errors.name && (
                            <small className="p-error">
                                {errors.name.message}
                            </small>
                        )}
                    </div>

                    {/* EMAIL */}
                    <div className={styles.field}>
                        <label>Email</label>

                        <InputText
                            {...register("email")}
                            className={errors.email ? "p-invalid" : ""}
                        />

                        {errors.email && (
                            <small className="p-error">
                                {errors.email.message}
                            </small>
                        )}
                    </div>

                    {/* PASSWORD */}
                    <div className={styles.field}>
                        <label>Password</label>

                        <div className={styles.passwordWrapper}>

                            <InputText
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                className={errors.password ? "p-invalid" : ""}
                            />

                            <span
                                className={styles.eyeIcon}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>

                        </div>

                        

                        {errors.password && (
                            <small className="p-error">
                                {errors.password.message}
                            </small>
                        )}
                    </div>

                    <Button
                        type="submit"
                        label={
                            isSubmitting
                                ? "Creating Account..."
                                : "Register"
                        }
                        disabled={isSubmitting}
                    />

                </form>

                <div className={styles.bottomText}>
                    Already have an account?

                    <Link to="/login">
                        Login
                    </Link>
                </div>

            </div>

        </section>
    );
};

export default Register;