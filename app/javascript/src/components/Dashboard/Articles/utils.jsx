import React from "react";

import { t } from "i18next";
import { MenuHorizontal } from "neetoicons";
import { Dropdown } from "neetoui";

import { SINGULAR } from "constants";

const {
  Menu,
  MenuItem: { Button },
} = Dropdown;

const renderAction = () => (
  <Dropdown buttonStyle="text" className="p-4" icon={MenuHorizontal}>
    <Menu>
      <Button>{t("actions.edit")}</Button>
      <Button>{t("actions.delete")}</Button>
    </Menu>
  </Dropdown>
);

export const buildColumnData = () => [
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
  {
    dataIndex: "action",
    key: "action",
    render: renderAction,
  },
];
