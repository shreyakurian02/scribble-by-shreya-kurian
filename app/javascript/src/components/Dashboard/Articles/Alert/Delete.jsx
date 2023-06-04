import React from "react";

import { Alert } from "neetoui";
import { useTranslation, Trans } from "react-i18next";

import articlesApi from "apis/articles";
import { SINGULAR } from "constants";

const Delete = ({ manageDeleteAlert, onClose, refetchArticles }) => {
  const { t } = useTranslation();

  const {
    isOpen,
    article: { slug, title },
  } = manageDeleteAlert;

  const handleDelete = async () => {
    try {
      await articlesApi.destroy(slug);
      refetchArticles();
      onClose();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Alert
      isOpen={isOpen}
      message={<Trans i18nKey="alert.deleteMessage" values={{ title }} />}
      submitButtonLabel={t("button.proceed")}
      title={t("alert.deleteEntity", {
        entity: t("common.article", SINGULAR).toLowerCase(),
      })}
      onClose={onClose}
      onSubmit={handleDelete}
    />
  );
};

export default Delete;
