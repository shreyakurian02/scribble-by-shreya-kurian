import * as yup from "yup";

export const VALID_PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d).*$/;

export const MINIMUM_PASSWORD_LENGTH = 6;

export const INITIAL_FORM_VALUES = {
  isSecured: false,
  password: "",
};

export const VALIDATION_SCHEMA = yup.object().shape({
  password: yup
    .string()
    .min(6, "Have at least 6 characters")
    .matches(VALID_PASSWORD_REGEX, "Include at least 1 letter and 1 number")
    .required("Password is required"),
});

export const INPUT_TYPE = {
  text: "text",
  password: "password",
};
