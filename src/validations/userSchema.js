

import * as yup from "yup";

const userSchema = yup.object({
  name: yup
    .string()
    .trim()
    .matches(/^[A-Za-z\s]+$/, "Only letters allowed")
    .required("Name is required"),

  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),

  phone: yup
    .string()
    .matches(/^\+?\d{10,15}$/, "Invalid phone number")
    .required("Phone is required"),

  subject: yup
    .string()
    .required("Subject is required"),

  message: yup
    .string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

export default userSchema;