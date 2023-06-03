import { t } from "i18next";
import * as yup from "yup";

export const STATUS_MENU_BLOCKS = [
  { label: t("common.all"), value: "all" },
  { label: t("common.published"), value: "published" },
  { label: t("common.draft"), value: "draft" },
];

export const NEW_CATEGORY_INITIAL_VALUES = { category: "" };

export const CATEGORY_VALIDATION_SCHEMA = yup.object().shape({
  category: yup
    .string()
    .required(t("validations.required", { entity: t("common.title") })),
});

export const ARTICLES_DATA_INITIAL_VALUE = {
  articles: [],
  count: { all: 0, draft: 0, published: 0 },
};
