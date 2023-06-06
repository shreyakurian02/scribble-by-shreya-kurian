import React from "react";

import { Typography, Modal, Button } from "neetoui";
import { useTranslation } from "react-i18next";

import articlesApi from "apis/articles";
import { useCategoriesDispatch } from "contexts/categories";

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
  const modalActionTitle = shouldUpdateCategory ? categoryName : status;

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
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <Modal.Header>
        <Typography style="h2">
          {t("modal.updateTitle", { action: modalActionTitle })}
        </Typography>
      </Modal.Header>
      <Modal.Body className="space-y-2">
        <Typography lineHeight="normal" style="body2">
          {t("modal.updateDescription", {
            action: type,
            type: modalActionTitle,
            articleWithCount: t("common.articleWithCount", {
              count: selectedRowIds.length,
            }),
          })}
        </Typography>
      </Modal.Body>
      <Modal.Footer className="space-x-2">
        <Button label={t("button.proceed")} onClick={handleUpdate} />
        <Button label={t("button.cancel")} style="text" onClick={onClose} />
      </Modal.Footer>
    </Modal>
  );
};

export default BulkUpdate;
