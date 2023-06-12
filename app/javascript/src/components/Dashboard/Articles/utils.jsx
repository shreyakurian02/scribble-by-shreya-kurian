import React from "react";

import dayjs from "dayjs";
import { t } from "i18next";
import { MenuHorizontal } from "neetoicons";
import { Dropdown, Tooltip } from "neetoui";
import { stringify, parse } from "qs";
import { without } from "ramda";
import { Link } from "react-router-dom";

import { SINGULAR } from "constants";

import { ARTICLE_STATUS } from "./Form/constants";

const {
  Menu,
  Divider,
  MenuItem: { Button },
} = Dropdown;

export const isArticleStatusDraft = status => status === ARTICLE_STATUS.draft;

export const formatDate = date => dayjs(date).format("MMM DD, YYYY, hh:mm A");

export const handleFilterByCategories = ({
  queryCategories,
  history,
  selectedCategory,
}) => {
  const selectedCategories = queryCategories?.includes(selectedCategory)
    ? without([selectedCategory], queryCategories)
    : [...queryCategories, selectedCategory];
  pushURLSearchParams(history, "categories", selectedCategories);
};

export const renderAction = ({
  article,
  setManageDeleteAlert,
  setManageUpdateModal,
}) => (
  <Dropdown buttonStyle="text" icon={MenuHorizontal}>
    <Menu>
      <Button
        onClick={() =>
          setManageUpdateModal({
            isOpen: true,
            article,
            status: isArticleStatusDraft(article.status)
              ? ARTICLE_STATUS.publish
              : ARTICLE_STATUS.draft,
          })
        }
      >
        {isArticleStatusDraft(article.status)
          ? t("common.publish")
          : t("button.unpublish")}
      </Button>
      <Divider />
      <Button
        style="danger"
        onClick={() => setManageDeleteAlert({ isOpen: true, article })}
      >
        {t("actions.delete")}
      </Button>
    </Menu>
  </Dropdown>
);

export const renderStatus = status => (
  <span className="capitalize">{status}</span>
);

export const renderTitle = ({ title, slug }) => (
  <Tooltip content={title} followCursor="horizontal" position="bottom">
    <Link className="neeto-ui-text-primary-500" to={`articles/${slug}/edit`}>
      {title}
    </Link>
  </Tooltip>
);

export const getColumnData = () => [
  {
    dataIndex: "title",
    title: t("common.title"),
    key: "title",
    width: "15%",
    ellipsis: true,
    render: (title, record) => renderTitle({ title, slug: record.slug }),
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

export const getAllowedColumns = ({
  filteredColumns,
  setManageDeleteAlert,
  setManageUpdateModal,
}) => [
  ...getColumnData().filter(column =>
    filteredColumns.includes(column.dataIndex)
  ),
  {
    key: "action",
    render: (_, article) =>
      renderAction({ article, setManageDeleteAlert, setManageUpdateModal }),
  },
];

export const pushURLSearchParams = (history, param, value) => {
  const queryParams = getSearchParams();
  history.push({ search: stringify({ ...queryParams, [param]: value }) });
};

export const getSearchParams = () => {
  const {
    status = "all",
    categories = [],
    search = "",
  } = parse(location.search, { ignoreQueryPrefix: true });

  return { status, categories, search };
};
