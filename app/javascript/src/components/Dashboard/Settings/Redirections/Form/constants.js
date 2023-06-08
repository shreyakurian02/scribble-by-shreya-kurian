import { t } from "i18next";
import * as yup from "yup";

export const VALIDATION_SCHEMA = yup.object().shape({
  from: yup
    .string()
    .matches(/^(\/([-a-zA-Z0-9@:%._\\+~#?&//=]*))*$/, "Invalid URL")
    .required(t("validations.required", { entity: "From path" })),
  to: yup
    .string()
    .matches(
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(:[0-9]+)?(\/.*)?$|^\/.*$/,
      "Invalid URL"
    )
    .required(t("validations.required", { entity: "To path" })),
});
