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
    .matches(/.*[a-zA-Z0-9].*/, t("validations.validAlphaNumeric"))
    .required(t("validations.required", { entity: t("common.title") })),
});

export const ARTICLES_DATA_INITIAL_VALUE = {
  articles: [],
  count: { all: 0, draft: 0, published: 0, filtered: 0 },
};

export const MANAGE_DELETE_ALERT_INITIAL_VALUE = {
  isOpen: false,
  article: {},
};

export const HEADER_TITLE = {
  all: t("common.allArticles"),
  draft: t("common.draft"),
  published: t("common.published"),
};
