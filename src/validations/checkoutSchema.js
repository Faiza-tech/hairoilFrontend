import * as yup from "yup";

export const checkoutSchema = yup.object({

  fullName: yup
    .string()
    .required("Full Name is required")
    .min(2, "Minimum 2 characters")
    .matches(
      /^[a-zA-Z\s]+$/,
      "Name can contain only letters"
    ),

  phone: yup
    .string()
    .required("Phone is required")
    .matches(
      /^\d{10,15}$/,
      "Phone must contain only numbers (10-15 digits)"
    ),

  addressLine1: yup
    .string()
    .required("Address Line 1 is required")
    .min(5, "Address is too short"),

  addressLine2: yup
    .string(),

  city: yup
    .string()
    .required("City is required")
    .matches(
      /^[a-zA-Z\s]+$/,
      "City can contain only letters"
    ),

  state: yup
    .string()
    .required("County / State is required")
    .matches(
      /^[a-zA-Z\s]+$/,
      "State can contain only letters"
    ),

  postalCode: yup
    .string()
    .trim()
    .required("Postcode is required")
    .matches(
      /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i,
      "Enter a valid UK postcode"
    ),

  country: yup
    .string()
    .required("Country is required")
    .matches(
      /^[a-zA-Z\s]+$/,
      "Country can contain only letters"
    ),

});