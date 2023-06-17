import React, { useState } from "react";

import { MenuLayout, MenuVertical } from "neetoicons";
import { Typography, Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

import EditCategory from "components/Dashboard/CategoryForm";

import { DEFAULT_CATEGORY_NAME } from "./constants";
import Delete from "./Delete";

const {
  Menu,
  MenuItem: { Button },
  Divider,
} = Dropdown;

const Item = ({ category, categoriesCount }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const { t } = useTranslation();

  const { name, articles_count: articlesCount } = category;
  const isDefaultCategoryLastCategory =
    categoriesCount === 1 && category.name === DEFAULT_CATEGORY_NAME;

  return (
    <>
      <div className="reorder-item flex w-full items-center">
        <div className="reorder-icon hidden p-1">
          <MenuLayout size={12} />
        </div>
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
              <Button onClick={() => setIsUpdateModalOpen(true)}>
                {t("button.edit")}
              </Button>
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
      <EditCategory
        isEdit
        isOpen={isUpdateModalOpen}
        selectedCategory={category}
        onClose={() => setIsUpdateModalOpen(false)}
      />
    </>
  );
};

export default Item;
