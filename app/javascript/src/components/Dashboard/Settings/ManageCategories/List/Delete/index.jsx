import { SINGULAR } from "constants";

import React, { useState } from "react";

import { Alert } from "neetoui";
import { useTranslation } from "react-i18next";

import categoriesApi from "apis/categories";
import { useCategoriesDispatch } from "contexts/categories";

import Message from "./Message";

const Delete = ({ isOpen, onClose, selectedCategory }) => {
  const { t } = useTranslation();

  const [selectedMoveToCategory, setSelectedMoveToCategory] = useState({});

  const { fetchCategories } = useCategoriesDispatch();

  const { id: selectedCategoryId } = selectedCategory;

  const handleSubmit = async () => {
    try {
      const params = { move_to_category_id: selectedMoveToCategory.value };
      await categoriesApi.destroy({ id: selectedCategoryId, params });
      fetchCategories();
      onClose();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Alert
      isOpen={isOpen}
      submitButtonLabel={t("button.delete")}
      message={
        <Message
          selectedCategory={selectedCategory}
          selectedMoveToCategory={selectedMoveToCategory}
          setSelectedMoveToCategory={setSelectedMoveToCategory}
        />
      }
      title={t("alert.deleteEntity", {
        entity: t("common.category", SINGULAR).toLowerCase(),
      })}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default Delete;
