import React, { useState, useEffect } from "react";

import { useFormikContext } from "formik";
import { MenuHorizontal } from "neetoicons";
import { Button, Dropdown, Typography } from "neetoui";
import { Select } from "neetoui/formik";
import { useTranslation, Trans } from "react-i18next";
import { useHistory } from "react-router";

import categoriesApi from "apis/categories";
import { getCategoryOptions } from "components/Dashboard/utils";
import { ARTICLES_URL } from "constants/urls";
import { useCategories } from "contexts/categories";

import SaveButton from "./SaveButton";

import { MANAGE_DELETE_ALERT_INITIAL_VALUE } from "../../constants";
import { Delete } from "../../List/Actions";
import { formatDate, titlize } from "../utils";

const Header = ({ status, setStatus, article = {}, isEdit = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [manageDeleteAlert, setManageDeleteAlert] = useState(
    MANAGE_DELETE_ALERT_INITIAL_VALUE
  );

  const { t } = useTranslation();
  const history = useHistory();
  const [categories, { fetchCategories }] = useCategories();

  const {
    setFieldValue,
    values: { category },
  } = useFormikContext();

  const { status: articleStatus, updated_at: articleUpdatedAt } = article;

  const handleCreateCategory = async category => {
    setIsLoading(true);
    try {
      const payload = { name: category };
      await categoriesApi.create(payload);
      setFieldValue("category", {
        label: category,
        value: category,
      });
      fetchCategories();
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const setNewCategory = () => {
    const newCategory = category?.label;
    if (newCategory) {
      setFieldValue("category", {
        label: newCategory,
        value: categories?.find(({ name }) => name === newCategory)?.id,
      });
    }
  };

  useEffect(() => {
    setNewCategory();
  }, [categories]);

  return (
    <div className="flex justify-between px-5">
      <div className="w-64">
        <Select
          isCreateable
          loading={isLoading}
          name="category"
          options={getCategoryOptions(categories)}
          placeholder={t("placeholder.searchCategory")}
          onCreateOption={handleCreateCategory}
        />
      </div>
      <div className="flex items-center space-x-5">
        {isEdit && (
          <Typography className="titlize" style="body2">
            <Trans
              i18nKey="labels.articleSavedDate"
              values={{
                status: titlize(articleStatus),
                date: formatDate(articleUpdatedAt),
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
        refetchArticles={() => history.push(ARTICLES_URL)}
        onClose={() => setManageDeleteAlert(MANAGE_DELETE_ALERT_INITIAL_VALUE)}
      />
    </div>
  );
};

export default Header;
