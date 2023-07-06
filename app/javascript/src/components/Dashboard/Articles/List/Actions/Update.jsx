import React from "react";

import { useTranslation } from "react-i18next";

import { useUpdateArticle } from "hooks/reactQuery/useArticlesApi";

import UpdateModal from "../UpdateModal";

const Update = ({ manageUpdateModal, onClose, setSelectedArticles }) => {
  const { t } = useTranslation();

  const {
    isOpen,
    article: { id, title: articleTitle },
    status,
  } = manageUpdateModal;

  const { mutate: updateArticle } = useUpdateArticle(id, {
    onSuccess: () => {
      setSelectedArticles([]);
      onClose();
    },
  });

  const handleUpdate = () => updateArticle({ id, payload: { status } });

  return (
    <UpdateModal
      attribute={t("common.status").toLowerCase()}
      entity={articleTitle}
      handleUpdate={handleUpdate}
      isOpen={isOpen}
      modalTitle={status}
      onClose={onClose}
    />
  );
};

export default Update;
