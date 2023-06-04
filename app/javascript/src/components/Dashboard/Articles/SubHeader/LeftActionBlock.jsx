import React from "react";

import { Typography, Button, Dropdown, Tag } from "neetoui";
import { without, isEmpty } from "ramda";
import { useTranslation, Trans } from "react-i18next";
import { useHistory } from "react-router";
import { uuid } from "uuidv4";

import { getSearchParams, pushURLSearchParams } from "../utils";

const {
  Menu,
  MenuItem: { Button: MenuButton },
} = Dropdown;

const LeftActionBlock = ({ selectedRowsCount, articlesCount = 0 }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const { search, categories } = getSearchParams();

  if (selectedRowsCount === 0) {
    return (
      <div className="flex space-x-2">
        <Typography component="h4" style="h4">
          {isEmpty(search)
            ? t("common.articleWithCount", { count: articlesCount })
            : t("common.searchResult", { count: articlesCount, search })}
        </Typography>
        {categories?.map(category => (
          <Tag
            className="p-1"
            key={uuid()}
            label={category}
            style="secondary"
            onClose={() => {
              const selectedCategories = without([category], categories);
              pushURLSearchParams(history, "categories", selectedCategories);
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Typography component="h4" style="h4">
        <Trans
          components={{ span: <span className="neeto-ui-text-gray-600" /> }}
          i18nKey="common.selectedOf"
          values={{
            selectedCount: selectedRowsCount,
            resource: t("common.article", {
              count: selectedRowsCount,
            }).toLowerCase(),
            articlesCount,
          }}
        />
      </Typography>
      <Dropdown buttonStyle="secondary" label={t("button.changeCategory")} />
      <Dropdown buttonStyle="secondary" label={t("button.changeStatus")}>
        <Menu>
          <MenuButton>{t("common.draft")}</MenuButton>
          <MenuButton>{t("common.publish")}</MenuButton>
        </Menu>
      </Dropdown>
      <Button label={t("button.delete")} style="danger" />
    </div>
  );
};

export default LeftActionBlock;
