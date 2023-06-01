import React from "react";

import { t } from "i18next";
import { MenuHorizontal } from "neetoicons";
import { Dropdown } from "neetoui";

import { COLUMN_DATA } from "./constants";

const {
  Menu,
  MenuItem: { Button },
} = Dropdown;

export const renderAction = () => (
  <Dropdown buttonStyle="text" className="p-4" icon={MenuHorizontal}>
    <Menu>
      <Button>{t("actions.edit")}</Button>
      <Button>{t("actions.delete")}</Button>
    </Menu>
  </Dropdown>
);

export const buildColumnData = filteredColumns => [
  ...COLUMN_DATA.filter(column => filteredColumns.includes(column.dataIndex)),
  {
    dataIndex: "action",
    key: "action",
    render: renderAction,
  },
];
