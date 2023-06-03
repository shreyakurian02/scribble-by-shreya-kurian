import { t } from "i18next";
import * as yup from "yup";

import { SINGULAR } from "constants";

export const ARTICLES = [
  {
    id: 1,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver smith",
    lastPublished: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 2,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver smith",
    lastPublished: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 3,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver smith",
    lastPublished: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 4,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver smith",
    lastPublished: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 5,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver smith",
    lastPublished: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 6,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver smith",
    lastPublished: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 7,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver smith",
    lastPublished: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 8,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver smith",
    lastPublished: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 9,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver smith",
    lastPublished: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 10,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver smith",
    lastPublished: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 11,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver smith",
    lastPublished: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 12,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver smith",
    lastPublished: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 13,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver smith",
    lastPublished: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 14,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver smith",
    lastPublished: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
];

export const COLUMN_DATA = [
  {
    dataIndex: "title",
    title: t("common.title"),
    key: "title",
  },
  {
    dataIndex: "category",
    title: t("common.category", SINGULAR),
    key: "category",
  },
  {
    dataIndex: "author",
    title: t("common.author"),
    key: "author",
  },
  {
    dataIndex: "lastPublished",
    title: t("common.lastPublished"),
    key: "lastPublished",
  },
  {
    dataIndex: "status",
    title: t("common.status"),
    key: "status",
  },
];

export const NEW_CATEGORY_INITIAL_VALUES = { category: "" };

export const CATEGORY_VALIDATION_SCHEMA = yup.object().shape({
  category: yup
    .string()
    .required(t("validations.required", { entity: t("common.title") })),
});
