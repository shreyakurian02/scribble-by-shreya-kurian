import React, { useState, useEffect } from "react";

import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { useFormikContext } from "formik";
import { ActionDropdown, Button, Dropdown } from "neetoui";
import { Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import { ARTICLES_BASE_URL } from "constants";
import { useCategoriesState } from "contexts/categories";

import { ARTICLE_STATUS } from "./constants";

import Delete from "../Alert/Delete";
import { MANAGE_DELETE_ALERT_INITIAL_VALUE } from "../constants";
import { getCategoryOptions, isArticleStatusDraft } from "../utils";

const {
  Menu,
  MenuItem: { Button: MenuButton },
} = ActionDropdown;

const Header = ({ status, setStatus, article = {}, isEdit = false }) => {
  const [options, setOptions] = useState([]);
  const [manageDeleteAlert, setManageDeleteAlert] = useState(
    MANAGE_DELETE_ALERT_INITIAL_VALUE
  );

  const { t } = useTranslation();
  const history = useHistory();
  const { setFieldValue } = useFormikContext();

  const categories = useCategoriesState();

  const handleCreateCategory = async category => {
    try {
      const newOption = { label: category, value: category };
      setFieldValue("category", newOption);
      setOptions([...options, newOption]);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => setOptions(getCategoryOptions(categories)), [categories]);

  return (
    <div className="flex justify-between px-5">
      <div className="w-64">
        <Select
          isCreateable
          name="category"
          options={options}
          placeholder={t("placeholder.searchCategory")}
          onCreateOption={handleCreateCategory}
        />
      </div>
      <div className="flex items-center  space-x-5 ">
        <Button label={t("button.cancel")} style="secondary" type="reset" />
        <ActionDropdown
          buttonProps={{ type: "submit" }}
          label={
            isArticleStatusDraft(status)
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
        {isEdit && (
          <Dropdown buttonStyle="text" icon={MenuHorizontal}>
            <Dropdown.Menu>
              <Dropdown.MenuItem.Button
                style="danger"
                onClick={() => setManageDeleteAlert({ isOpen: true, article })}
              >
                {t("button.delete")}
              </Dropdown.MenuItem.Button>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
      <Delete
        manageDeleteAlert={manageDeleteAlert}
        refetchArticles={() => history.push(ARTICLES_BASE_URL)}
        onClose={() => setManageDeleteAlert(MANAGE_DELETE_ALERT_INITIAL_VALUE)}
      />
    </div>
  );
};

export default Header;
