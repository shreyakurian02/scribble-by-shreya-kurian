import { SINGULAR } from "constants";

import React, { useState } from "react";

import { Alert } from "neetoui";
import { useTranslation } from "react-i18next";

import { useDestroyCategory } from "hooks/reactQuery/useCategoriesApi";

import Message from "./Message";

const Delete = ({ isOpen, onClose, selectedCategory }) => {
  const { t } = useTranslation();

  const [selectedMoveToCategory, setSelectedMoveToCategory] = useState({});

  const { mutate: destroyCategory } = useDestroyCategory();

  const { id: selectedCategoryId } = selectedCategory;

  const handleSubmit = () => {
    const params = { move_to_category_id: selectedMoveToCategory.value };
    destroyCategory({ id: selectedCategoryId, params });
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
