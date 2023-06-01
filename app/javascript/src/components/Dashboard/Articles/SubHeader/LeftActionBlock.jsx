import React from "react";

import { Typography, Button, Dropdown } from "neetoui";
import { useTranslation, Trans } from "react-i18next";

const {
  Menu,
  MenuItem: { Button: MenuButton },
} = Dropdown;

const LeftActionBlock = ({ selectedRowsCount, articleCount = 0 }) => {
  const { t } = useTranslation();

  if (selectedRowsCount === 0) {
    return (
      <Typography component="h4" style="h4">
        {t("common.articleWithCount", { count: articleCount })}
      </Typography>
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
            articleCount,
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
