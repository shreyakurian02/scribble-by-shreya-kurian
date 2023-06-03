import { isEditorEmpty } from "@bigbinary/neeto-editor";
import { t } from "i18next";
import * as yup from "yup";

import { SINGULAR } from "constants";

export const INITIAL_VALUES = {
  category: null,
  title: "",
  description: "<p></p>",
};

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
    .required(t("validations.required", { entity: t("common.title") })),
  description: yup
    .string()
    .test(
      "description",
      t("validations.required", { entity: t("common.description") }),
      value => !isEditorEmpty(value)
    ),
});

export const SUBMIT_OPTIONS = {
  draft: "draft",
  publish: "publish",
};
