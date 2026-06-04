import * as Yup from "yup";

export const CheckoutSchema = Yup.object({
  address: Yup.string()
    .min(5, "Address too short")
    .required("Address is required"),

  phone: Yup.string()
    .matches(/^[0-9+\s()-]{6,20}$/, "Invalid phone number")
    .required("Phone is required"),

  note: Yup.string().max(200, "Note too long"),

  cardNumber: Yup.string()
    .matches(/^[0-9\s]{16,19}$/, "Invalid card number")
    .required("Card number is required"),

  expiry: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry (MM/YY)")
    .required("Expiry is required"),

  cvc: Yup.string()
    .matches(/^[0-9]{3,4}$/, "Invalid CVC")
    .required("CVC is required"),

  cardName: Yup.string()
    .min(3, "Name too short")
    .required("Name on card is required"),
});
