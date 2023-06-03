import React from "react";

import dayjs from "dayjs";
import { t } from "i18next";
import { MenuHorizontal } from "neetoicons";
import { Dropdown, Tooltip } from "neetoui";
import { Link } from "react-router-dom";

import { SINGULAR } from "constants";

const {
  Menu,
  MenuItem: { Button },
} = Dropdown;

export const formatDate = date => dayjs(date).format("MMM DD, YYYY, hh:MM A");

export const renderAction = () => (
  <Dropdown buttonStyle="text" className="p-4" icon={MenuHorizontal}>
    <Menu>
      <Button>{t("actions.edit")}</Button>
      <Button>{t("actions.delete")}</Button>
    </Menu>
  </Dropdown>
);

export const renderStatus = status => (
  <span className="capitalize">{status}</span>
);

export const renderTitle = title => (
  <Tooltip content={title} followCursor="horizontal" position="bottom">
    <Link className="neeto-ui-text-primary-500">{title}</Link>
  </Tooltip>
);

export const buildColumnData = filteredColumns => [
  ...[
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
  ].filter(column => filteredColumns.includes(column.dataIndex)),
  {
    dataIndex: "action",
    key: "action",
    render: renderAction,
  },
];

export const getCategoryOptions = categories =>
  categories.map(({ name, id }) => ({
    label: name,
    value: id,
  }));
