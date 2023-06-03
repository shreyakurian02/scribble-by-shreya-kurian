import { t } from "i18next";
import * as yup from "yup";

import { SINGULAR } from "constants";

import { formatDate, renderStatus, renderTitle } from "./utils";

export const STATUS_MENU_BLOCKS = [
  { label: t("common.all"), value: "all" },
  { label: t("common.published"), value: "published" },
  { label: t("common.draft"), value: "draft" },
];

export const COLUMN_DATA = [
  {
    dataIndex: "title",
    title: t("common.title"),
    key: "title",
    width: "15%",
    ellipsis: true,
    render: title => renderTitle(title),
  },
  {
    dataIndex: "category",
    title: t("common.category", SINGULAR),
    key: "category",
    width: "18%",
  },
  {
    dataIndex: "author",
    title: t("common.author"),
    key: "author",
    width: "18%",
  },
  {
    dataIndex: "last_published_at",
    title: t("common.lastPublished"),
    key: "lastPublishedAt",
    width: "25%",
    render: date => (date ? formatDate(date) : "-"),
  },
  {
    dataIndex: "status",
    title: t("common.status"),
    key: "status",
    width: "15%",
    render: status => renderStatus(status),
  },
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
