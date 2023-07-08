import React from "react";

import { Alert } from "neetoui";
import { pluck } from "ramda";
import { useTranslation, Trans } from "react-i18next";

import { useBulkDestroyArticles } from "hooks/reactQuery/useArticlesApi";

const BulkDelete = ({
  selectedArticles,
  isOpen,
  onClose,
  setSelectedArticles,
}) => {
  const { t } = useTranslation();
  const { mutate: bulkDestroyArticles } = useBulkDestroyArticles({
    onSuccess: () => {
      setSelectedArticles([]);
      onClose();
    },
  });

  const selectedArticlesCount = selectedArticles.length;

  const handleDelete = () =>
    bulkDestroyArticles({ ids: pluck("id", selectedArticles) });

  return (
    <Alert
      isOpen={isOpen}
      submitButtonLabel={t("button.delete")}
      message={
        <Trans
          i18nKey="alert.deleteMessage"
          values={{
            title:
              selectedArticlesCount > 1
                ? t("common.articleWithCount", {
                    count: selectedArticlesCount,
                  })
                : selectedArticles?.[0]?.title,
          }}
        />
      }
      title={t("alert.deleteEntity", {
        entity: t("common.article", {
          count: selectedArticlesCount,
        }).toLowerCase(),
      })}
      onClose={onClose}
      onSubmit={handleDelete}
    />
  );
};

export default BulkDelete;
