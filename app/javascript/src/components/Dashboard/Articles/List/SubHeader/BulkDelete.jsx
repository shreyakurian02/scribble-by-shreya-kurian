import React from "react";

import { Alert } from "neetoui";
import { pluck } from "ramda";
import { useTranslation, Trans } from "react-i18next";

import articlesApi from "apis/articles";
import { SINGULAR } from "constants";
import { useCategoriesDispatch } from "contexts/categories";

const BulkDelete = ({
  selectedArticles,
  isOpen,
  onClose,
  refetchArticles,
  setSelectedArticles,
}) => {
  const { t } = useTranslation();

  const fetchCategories = useCategoriesDispatch();

  const handleDelete = async () => {
    try {
      await articlesApi.bulkDestroy({ ids: pluck("id", selectedArticles) });
      refetchArticles();
      fetchCategories();
      setSelectedArticles([]);
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
            title:
              selectedArticles.length > 1
                ? t("common.articleWithCount", {
                    count: selectedArticles.length,
                  })
                : selectedArticles?.[0]?.title,
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
