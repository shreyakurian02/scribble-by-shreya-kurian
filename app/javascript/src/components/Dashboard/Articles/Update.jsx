import React from "react";

import { useTranslation } from "react-i18next";

import articlesApi from "apis/articles";

import UpdateModal from "./UpdateModal";

const Update = ({ manageUpdateModal, refetchArticles, onClose }) => {
  const { t } = useTranslation();

  const {
    isOpen,
    article: { slug, title: articleTitle },
    status,
  } = manageUpdateModal;

  const handleUpdate = async () => {
    try {
      const payload = { status };
      await articlesApi.update({ slug, payload });
      refetchArticles();
      onClose();
    } catch (error) {
      logger.error(error);
    }
  };

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
