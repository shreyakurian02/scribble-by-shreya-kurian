import { SINGULAR } from "constants";

import React from "react";

import EmptyStateImage from "images/EmptyState";
import { NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { NEW_ARTICLE_URL } from "constants/urls";

import { getSearchParams, pushURLSearchParams } from "./utils";

const EmptyState = ({ setArticleSearchTerm }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const { search } = getSearchParams();

  const handleClearSearch = () => {
    setArticleSearchTerm("");
    pushURLSearchParams({ history, param: "search", value: "" });
  };

  if (!isEmpty(search)) {
    return (
      <NoData
        description={t("noData.searchResultDescription")}
        image={EmptyStateImage}
        title={t("noData.searchResultTitle", { searchTerm: search })}
        secondaryButtonProps={{
          onClick: handleClearSearch,
          label: t("button.clearSearch"),
        }}
      />
    );
  }

  return (
    <NoData
      description={t("noData.articleDescription")}
      image={EmptyStateImage}
      title={t("noData.articleTitle")}
      primaryButtonProps={{
        to: NEW_ARTICLE_URL,
        label: t("button.addEntity", { entity: t("common.article", SINGULAR) }),
      }}
    />
  );
};

export default EmptyState;
