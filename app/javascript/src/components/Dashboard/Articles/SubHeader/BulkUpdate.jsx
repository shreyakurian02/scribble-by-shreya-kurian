import React from "react";

import { useTranslation } from "react-i18next";

import articlesApi from "apis/articles";
import { useCategoriesDispatch } from "contexts/categories";

import UpdateModal from "../UpdateModal";

const BulkUpdate = ({
  selectedRowIds,
  bulkUpdateData,
  onClose,
  refetchArticles,
  setSelectedRowIds,
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
      const updatePayload = shouldUpdateCategory
        ? { category_id: categoryId }
        : { status };
      await articlesApi.bulkUpdate(selectedRowIds, updatePayload);
      setSelectedRowIds([]);
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
      entity={t("common.articleWithCount", {
        count: selectedRowIds.length,
      })}
      onClose={onClose}
    />
  );
};

export default BulkUpdate;
