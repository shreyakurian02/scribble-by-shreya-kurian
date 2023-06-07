import React from "react";

import { pluck } from "ramda";
import { useTranslation } from "react-i18next";

import articlesApi from "apis/articles";
import { useCategoriesDispatch } from "contexts/categories";

import UpdateModal from "../../UpdateModal";

const BulkUpdate = ({
  bulkUpdateData,
  onClose,
  refetchArticles,
  selectedArticles,
  setSelectedArticles,
}) => {
  const { t } = useTranslation();

  const fetchCategories = useCategoriesDispatch();

  const {
    isModalOpen,
    payload: { categoryName = "", categoryId = "", status = "" },
    type,
  } = bulkUpdateData;

  const shouldUpdateCategory = type === "category";
  const modalTitle = shouldUpdateCategory ? categoryName : status;

  const handleUpdate = async () => {
    try {
      const payload = shouldUpdateCategory
        ? { category_id: categoryId }
        : { status };

      await articlesApi.bulkUpdate({
        ids: pluck("id", selectedArticles),
        payload,
      });
      setSelectedArticles([]);
      refetchArticles();
      fetchCategories();
      onClose();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <UpdateModal
      attribute={type}
      handleUpdate={handleUpdate}
      isOpen={isModalOpen}
      modalTitle={modalTitle}
      entity={
        selectedArticles.length > 1
          ? t("common.articleWithCount", {
              count: selectedArticles.length,
            })
          : selectedArticles?.[0]?.title
      }
      onClose={onClose}
    />
  );
};

export default BulkUpdate;
