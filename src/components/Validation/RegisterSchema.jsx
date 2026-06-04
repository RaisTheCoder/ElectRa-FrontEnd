import * as yup from "yup";

let maximumNameChar = 32;
let minimumNameChar = 3;

let minimumPassChar = 8;
let maximumPassChar = 64;

export const RegisterSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[a-zA-Z0-9._-]+$/)
    .min(
      minimumNameChar,
      `Your name has to be at least ${minimumNameChar} charaters long.`,
    )
    .max(
      maximumNameChar,
      `Your name cannot be longer than ${maximumNameChar} charaters long.`,
    )
    .required("Please enter your first name..."),
  lastName: yup
    .string()
    .matches(/^[a-zA-Z0-9._-]+$/)
    .min(
      minimumNameChar,
      `Your surname has to be at least ${minimumNameChar} charaters long.`,
    )
    .max(
      maximumNameChar,
      `Your surname cannot be longer than ${maximumNameChar} charaters long.`,
    )
    .required("Please enter your last name..."),
  username: yup.string().required("Username cannot be empty."),
  email: yup
    .string()
    .email("Invalid email format.")
    .required("Please enter your email..."),
  password: yup
    .string()
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .min(
      minimumPassChar,
      `Your password has to be at least ${minimumPassChar} characters long.`,
    )
    .max(
      maximumPassChar,
      `Your password cannot be longer than ${maximumPassChar} characters.`,
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match."),
  phone: yup.number("Invalid phone number format."),
});
