import React from "react";

import classnames from "classnames";
import { Check } from "neetoicons";
import { ActionDropdown } from "neetoui";
import { useTranslation } from "react-i18next";

import { ARTICLE_STATUS } from "../../constants";

const {
  Menu,
  MenuItem: { Button: MenuButton },
} = ActionDropdown;

const SaveButton = ({ status, setStatus }) => {
  const { t } = useTranslation();

  const isArticleStatusDraft = status === ARTICLE_STATUS.draft;

  const draftOptionStyle = classnames({
    "pl-6": !isArticleStatusDraft,
    "font-semibold": isArticleStatusDraft,
  });

  const publishOptionStyle = classnames({
    "pl-6": isArticleStatusDraft,
    "font-semibold": !isArticleStatusDraft,
  });

  return (
    <ActionDropdown
      buttonProps={{ type: "submit" }}
      label={
        isArticleStatusDraft ? t("button.saveAsDraft") : t("common.publish")
      }
    >
      <Menu>
        <MenuButton
          prefix={!isArticleStatusDraft && <Check size={20} />}
          onClick={() => setStatus(ARTICLE_STATUS.publish)}
        >
          <div className={publishOptionStyle}>{t("common.publish")}</div>
        </MenuButton>
        <MenuButton
          className="pl-6"
          prefix={isArticleStatusDraft && <Check size={20} />}
          onClick={() => setStatus(ARTICLE_STATUS.draft)}
        >
          <div className={draftOptionStyle}>{t("button.saveAsDraft")}</div>
        </MenuButton>
      </Menu>
    </ActionDropdown>
  );
};

export default SaveButton;
