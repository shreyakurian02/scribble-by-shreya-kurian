import { SINGULAR } from "constants";

import { t } from "i18next";
import { isEditorEmpty } from "neetoeditor";
import * as yup from "yup";

export const INITIAL_VALUES = {
  category: null,
  title: "",
  description: "<p></p>",
};

export const EDITOR_ADDONS = [
  "code-block",
  "block-quote",
  "image-upload",
  "undo",
  "redo",
];

export const VALIDATION_SCHEMA = yup.object().shape({
  category: yup
    .object()
    .shape({ label: yup.string(), value: yup.string() })
    .nullable()
    .required(
      t("validations.required", { entity: t("common.category", SINGULAR) })
    ),
  title: yup
    .string()
    .matches(/.*[a-zA-Z0-9].*/, t("validations.validAlphaNumeric"))
    .required(t("validations.required", { entity: t("common.title") })),
  description: yup
    .string()
    .test(
      "description",
      t("validations.required", { entity: t("common.description") }),
      value => !isEditorEmpty(value)
    ),
});
