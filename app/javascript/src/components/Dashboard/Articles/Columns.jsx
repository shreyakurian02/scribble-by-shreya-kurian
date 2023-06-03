import React from "react";

import { ActionDropdown, Checkbox } from "neetoui";
import { without } from "ramda";
import { useTranslation } from "react-i18next";

import { getColumnData } from "./utils";

const {
  Menu,
  MenuItem: { Button: MenuButtton },
} = ActionDropdown;

const Columns = ({ filteredColumns, setFilteredColumns }) => {
  const { t } = useTranslation();

  const handleChange = ({ target: { name, checked } }) => {
    checked
      ? setFilteredColumns([...filteredColumns, name])
      : setFilteredColumns(without([name], filteredColumns));
  };

  return (
    <ActionDropdown
      buttonStyle="secondary"
      dropdownProps={{ closeOnSelect: false }}
      label={t("common.columns")}
    >
      <Menu>
        {getColumnData().map(({ dataIndex, title }) => (
          <MenuButtton key={dataIndex}>
            <Checkbox
              checked={filteredColumns.includes(dataIndex)}
              disabled={dataIndex === "title"}
              id={dataIndex}
              label={title}
              name={dataIndex}
              onChange={handleChange}
            />
          </MenuButtton>
        ))}
      </Menu>
    </ActionDropdown>
  );
};

export default Columns;
