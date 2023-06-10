import React, { useState } from "react";

import classnames from "classnames";
import { MenuLayout, MenuVertical } from "neetoicons";
import { Typography, Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

const {
  Menu,
  MenuItem: { Button },
  Divider,
} = Dropdown;

const Item = ({ category }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { t } = useTranslation();

  const { name, articles_count: articlesCount } = category;

  return (
    <div
      className={classnames("flex w-full items-center", {
        "pl-0": isHovered,
        "pl-3": !isHovered,
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-1">{isHovered && <MenuLayout size={12} />}</div>
      <div className="hover:neeto-ui-bg-gray-100 flex w-full">
        <div className="w-full px-2 py-3">
          <Typography className="neeto-ui-font-medium" style="h5">
            {name}
          </Typography>
          <Typography className="neeto-ui-text-gray-500" style="body2">
            {t("common.articleWithCount", { count: articlesCount })}
          </Typography>
        </div>
        <Dropdown buttonStyle="text" icon={MenuVertical}>
          <Menu>
            <Button>{t("button.edit")}</Button>
            <Divider />
            <Button style="danger">{t("button.delete")}</Button>
          </Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Item;
