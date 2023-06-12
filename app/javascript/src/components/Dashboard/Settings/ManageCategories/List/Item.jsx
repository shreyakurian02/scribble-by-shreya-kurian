import React, { useState } from "react";

import classnames from "classnames";
import { MenuLayout, MenuVertical } from "neetoicons";
import { Typography, Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

import { DEFAULT_CATEGORY_NAME } from "./constants";
import Delete from "./Delete";

const {
  Menu,
  MenuItem: { Button },
  Divider,
} = Dropdown;

const Item = ({ category, categoriesCount }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const { t } = useTranslation();

  const { name, articles_count: articlesCount } = category;
  const isDefaultCategoryLastCategory =
    categoriesCount === 1 && category.name === DEFAULT_CATEGORY_NAME;

  return (
    <>
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
              {!isDefaultCategoryLastCategory && (
                <>
                  <Divider />
                  <Button
                    style="danger"
                    onClick={() => setIsDeleteAlertOpen(true)}
                  >
                    {t("button.delete")}
                  </Button>
                </>
              )}
            </Menu>
          </Dropdown>
        </div>
      </div>
      <Delete
        category={category}
        isOpen={isDeleteAlertOpen}
        onClose={() => setIsDeleteAlertOpen(false)}
      />
    </>
  );
};

export default Item;
