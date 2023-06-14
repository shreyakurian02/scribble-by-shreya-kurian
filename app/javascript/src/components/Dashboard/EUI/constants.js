import { t } from "i18next";
import * as yup from "yup";

export const LOGIN_INTIAL_VALUES = { password: "" };

export const LOGIN_VALIDATION_SCHEMA = yup.object().shape({
  password: yup
    .string()
    .required(t("validations.required", { entity: t("input.password") })),
});
