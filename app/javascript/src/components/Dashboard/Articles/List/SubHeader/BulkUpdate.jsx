import React from "react";

import { pluck } from "ramda";
import { useTranslation } from "react-i18next";

import { useBulkUpdateArticles } from "hooks/reactQuery/useArticlesApi";

import UpdateModal from "../UpdateModal";

const BulkUpdate = ({
  bulkUpdateData,
  onClose,
  selectedArticles,
  setSelectedArticles,
}) => {
  const { t } = useTranslation();
  const { mutate: bulkUpdateArticles } = useBulkUpdateArticles({
    onSuccess: () => {
      setSelectedArticles([]);
      onClose();
    },
  });

  const {
    isModalOpen,
    type,
    payload: { categoryName = "", categoryId = "", status = "" },
  } = bulkUpdateData;

  const selectedArticlesCount = selectedArticles.length;
  const shouldUpdateCategory = type === "category";
  const modalTitle = shouldUpdateCategory ? categoryName : status;

  const handleUpdate = () => {
    const payload = shouldUpdateCategory
      ? { category_id: categoryId }
      : { status };
    bulkUpdateArticles({ ids: pluck("id", selectedArticles), payload });
  };

  return (
    <UpdateModal
      attribute={type}
      handleUpdate={handleUpdate}
      isOpen={isModalOpen}
      modalTitle={modalTitle}
      selectedArticlesCount={selectedArticlesCount}
      entity={
        selectedArticlesCount > 1
          ? t("common.articleWithCount", {
              count: selectedArticlesCount,
            })
          : selectedArticles?.[0]?.title
      }
      onClose={onClose}
    />
  );
};

export default BulkUpdate;
