import React, { useState, useEffect } from "react";

import { ActionDropdown, Button } from "neetoui";
import { Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import categoriesApi from "apis/categories";

import { ARTICLE_STATUS } from "./constants";

import { getCategoryOptions } from "../utils";

const {
  Menu,
  MenuItem: { Button: MenuButton },
} = ActionDropdown;

const Header = ({ status, setStatus }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useTranslation();

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex justify-between px-5">
      <div className="w-64">
        <Select
          isLoading={isLoading}
          name="category"
          options={getCategoryOptions(categories)}
          placeholder={t("placeholder.searchCategory")}
        />
      </div>
      <div className="space-x-3">
        <Button label={t("button.cancel")} style="secondary" type="reset" />
        <ActionDropdown
          buttonProps={{ type: "submit" }}
          label={
            status === ARTICLE_STATUS.draft
              ? t("button.saveAsDraft")
              : t("common.publish")
          }
        >
          <Menu>
            <MenuButton onClick={() => setStatus(ARTICLE_STATUS.publish)}>
              {t("common.publish")}
            </MenuButton>
            <MenuButton onClick={() => setStatus(ARTICLE_STATUS.draft)}>
              {t("button.saveAsDraft")}
            </MenuButton>
          </Menu>
        </ActionDropdown>
      </div>
    </div>
  );
};

export default Header;
