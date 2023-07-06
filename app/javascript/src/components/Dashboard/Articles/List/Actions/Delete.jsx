import React from "react";

import { Alert } from "neetoui";
import { useTranslation, Trans } from "react-i18next";
import { SINGULAR } from "src/constants";
import { noop } from "src/utils";

import { useCategoriesDispatch } from "contexts/categories";
import { useDestroyArticle } from "hooks/reactQuery/useArticlesApi";

const Delete = ({ manageDeleteAlert, onClose, setSelectedArticles = noop }) => {
  const { t } = useTranslation();
  const { fetchCategories } = useCategoriesDispatch();
  const { mutate: destroyArticle } = useDestroyArticle({
    onSuccess: () => {
      fetchCategories();
      setSelectedArticles([]);
      onClose();
    },
  });

  const {
    isOpen,
    article: { id, title },
  } = manageDeleteAlert;

  return (
    <Alert
      isOpen={isOpen}
      message={<Trans i18nKey="alert.deleteMessage" values={{ title }} />}
      submitButtonLabel={t("button.delete")}
      title={t("alert.deleteEntity", {
        entity: t("common.article", SINGULAR).toLowerCase(),
      })}
      onClose={onClose}
      onSubmit={() => destroyArticle(id)}
    />
  );
};

export default Delete;
