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
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(:[0-9]+)?(\/.*)?$|^\/.*$/,
      t("validations.invalidToPath")
    )
    .required(t("validations.required", { entity: "To path" })),
});
