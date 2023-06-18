import { t } from "i18next";
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
    .min(6, t("validations.minimumPasswordLength"))
    .matches(VALID_PASSWORD_REGEX, t("validations.passwordFormat"))
    .required(t("validations.required", { entity: t("input.password") })),
});

export const INPUT_TYPE = {
  text: "text",
  password: "password",
};
