import React from "react";

import { Alert } from "neetoui";
import { useTranslation, Trans } from "react-i18next";

import articlesApi from "apis/articles";
import { SINGULAR } from "constants";
import { useCategoriesDispatch } from "contexts/categories";

const BulkDelete = ({ selectedRowIds, isOpen, onClose, refetchArticles }) => {
  const { t } = useTranslation();

  const fetchCategories = useCategoriesDispatch();

  const handleDelete = async () => {
    try {
      await articlesApi.bulkDestroy({ ids: selectedRowIds });
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
      submitButtonLabel={t("button.proceed")}
      message={
        <Trans
          i18nKey="alert.deleteMessage"
          values={{
            title: t("common.articleWithCount", {
              count: selectedRowIds.length,
            }),
          }}
        />
      }
      title={t("alert.deleteEntity", {
        entity: t("common.article", SINGULAR).toLowerCase(),
      })}
      onClose={onClose}
      onSubmit={handleDelete}
    />
  );
};

export default BulkDelete;
