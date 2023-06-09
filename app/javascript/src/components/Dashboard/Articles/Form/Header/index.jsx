import React, { useState } from "react";

import { useFormikContext } from "formik";
import { MenuHorizontal } from "neetoicons";
import { Button, Dropdown, Typography } from "neetoui";
import { Select } from "neetoui/formik";
import { useTranslation, Trans } from "react-i18next";
import { useHistory } from "react-router";

import categoriesApi from "apis/categories";
import { ARTICLES_BASE_URL } from "constants";
import { useCategories } from "contexts/categories";

import SaveButton from "./SaveButton";

import { MANAGE_DELETE_ALERT_INITIAL_VALUE } from "../../constants";
import { Delete } from "../../List/Actions";
import { getCategoryOptions } from "../../utils";
import { formatDate, titlize } from "../utils";

const Header = ({ status, setStatus, article = {}, isEdit = false }) => {
  const [manageDeleteAlert, setManageDeleteAlert] = useState(
    MANAGE_DELETE_ALERT_INITIAL_VALUE
  );

  const { t } = useTranslation();
  const history = useHistory();
  const { setFieldValue } = useFormikContext();

  const [categories, fetchCategories] = useCategories();

  const handleCreateCategory = async category => {
    try {
      const payload = { name: category };
      const {
        data: { category_id },
      } = await categoriesApi.create(payload);
      setFieldValue("category", { label: category, value: category_id });
      fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="flex justify-between px-5">
      <div className="w-64">
        <Select
          isCreateable
          name="category"
          options={getCategoryOptions(categories)}
          placeholder={t("placeholder.searchCategory")}
          onCreateOption={handleCreateCategory}
        />
      </div>
      <div className="flex items-center  space-x-5">
        {isEdit && (
          <Typography className="titlize" style="body2">
            <Trans
              i18nKey="labels.articleSavedDate"
              values={{
                status: titlize(article.status),
                date: formatDate(article.updated_at),
              }}
            />
          </Typography>
        )}
        <Button label={t("button.cancel")} style="secondary" type="reset" />
        <SaveButton setStatus={setStatus} status={status} />
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
