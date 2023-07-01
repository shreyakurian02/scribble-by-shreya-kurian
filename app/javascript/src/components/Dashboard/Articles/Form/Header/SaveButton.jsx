import React, { useState } from "react";

import classnames from "classnames";
import { useFormikContext } from "formik";
import { Check } from "neetoicons";
import { ActionDropdown } from "neetoui";
import { useTranslation } from "react-i18next";

import Publish from "./Publish";
import Unpublish from "./Unpublish";

import { ARTICLE_STATUS } from "../../constants";

const {
  Menu,
  MenuItem: { Button: MenuButton },
} = ActionDropdown;

const SaveButton = ({ status, setStatus, article, isEdit }) => {
  const [isSaveFormPaneOpen, setIsSaveFormPaneOpen] = useState(false);

  const { t } = useTranslation();
  const { isSubmitting, dirty } = useFormikContext();

  const isArticleStatusDraft = status === ARTICLE_STATUS.draft;

  const draftOptionStyle = classnames({
    "pl-6": !isArticleStatusDraft,
    "font-semibold": isArticleStatusDraft,
  });

  const publishOptionStyle = classnames({
    "pl-6": isArticleStatusDraft,
    "font-semibold": !isArticleStatusDraft,
  });

  const handleSave = status => {
    setStatus(status);
    setIsSaveFormPaneOpen(true);
  };

  return (
    <>
      <ActionDropdown
        disabled={!dirty || isSubmitting}
        label={
          isArticleStatusDraft ? t("button.saveAsDraft") : t("common.publish")
        }
      >
        <Menu>
          <MenuButton
            prefix={!isArticleStatusDraft && <Check size={20} />}
            onClick={() => handleSave(ARTICLE_STATUS.publish)}
          >
            <div className={publishOptionStyle}>{t("common.publish")}</div>
          </MenuButton>
          <MenuButton
            className="pl-6"
            prefix={isArticleStatusDraft && <Check size={20} />}
            onClick={() => handleSave(ARTICLE_STATUS.draft)}
          >
            <div className={draftOptionStyle}>{t("button.saveAsDraft")}</div>
          </MenuButton>
        </Menu>
      </ActionDropdown>
      <Publish
        article={article}
        isEdit={isEdit}
        isOpen={status === ARTICLE_STATUS.publish && isSaveFormPaneOpen}
        onClose={() => setIsSaveFormPaneOpen(false)}
      />
      <Unpublish
        article={article}
        isEdit={isEdit}
        isOpen={status === ARTICLE_STATUS.draft && isSaveFormPaneOpen}
        onClose={() => setIsSaveFormPaneOpen(false)}
      />
    </>
  );
};

export default SaveButton;
