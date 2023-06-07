import { t } from "i18next";
import * as yup from "yup";

export const INITIAL_VALUES = { siteTitle: "" };

export const VALIDATION_SCHEMA = yup.object().shape({
  siteTitle: yup
    .string()
    .required(t("validations.required", { entity: t("common.siteTitle") })),
});
