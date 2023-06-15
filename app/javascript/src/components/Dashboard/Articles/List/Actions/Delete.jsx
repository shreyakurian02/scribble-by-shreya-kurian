import { SINGULAR } from "constants";

import React from "react";

import { Alert } from "neetoui";
import { useTranslation, Trans } from "react-i18next";

import articlesApi from "apis/articles";
import { useCategoriesDispatch } from "contexts/categories";

const Delete = ({ manageDeleteAlert, onClose, refetchArticles }) => {
  const { t } = useTranslation();
  const fetchCategories = useCategoriesDispatch();

  const {
    isOpen,
    article: { slug, title },
  } = manageDeleteAlert;

  const handleSubmit = async () => {
    try {
      await articlesApi.destroy(slug);
      refetchArticles();
      fetchCategories();
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
      onSubmit={handleSubmit}
    />
  );
};

export default Delete;
