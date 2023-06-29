import { t } from "i18next";
import * as yup from "yup";

export const INITIAL_VALUE = { fromPath: "", toPath: "" };

export const VALIDATION_SCHEMA = yup.object().shape({
  fromPath: yup
    .string()
    .matches(
      /^(\/([-a-zA-Z0-9@:%._\\+~#?&//=]*))*$/,
      t("validations.invalidFromPath")
    )
    .required(t("validations.required", { entity: "From path" })),
  toPath: yup
    .string()
    .matches(
      /^(?:https?:\/\/)?(?:(?:www\.)?(?:(?:\d{1,3}\.){3}\d{1,3}|localhost|(?:[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.[a-zA-Z]{2,})))?(?::\d+)?(?:\/[\w\-./]*)?(?:\?[\w\-./=&]*)?$/,
      t("validations.invalidToPath")
    )
    .required(t("validations.required", { entity: "To path" })),
});
