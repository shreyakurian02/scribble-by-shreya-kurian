import React from "react";

import { Typography, Spinner } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const List = ({
  filteredArticles,
  setSearchTerm,
  searchTerm,
  debouncedSearchTerm,
  isLoading,
}) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="neeto-ui-bg-white flex h-16 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="neeto-ui-bg-white neeto-ui-shadow-lg space-y-2">
      {!isEmpty(searchTerm) &&
        filteredArticles.map(({ title, slug, id }) => (
          <div
            className="hover:neeto-ui-bg-gray-200 neeto-ui-bg-white neeto-ui-rounded-sm relative w-full p-3"
            key={id}
          >
            <Link className="w-full" to={`/articles/${slug}`}>
              <Typography
                className="neeto-ui-text-gray-800"
                style="h5"
                weight="semibold"
                onClick={() => setSearchTerm("")}
              >
                {title}
              </Typography>
            </Link>
          </div>
        ))}
      {isEmpty(filteredArticles) && !isEmpty(debouncedSearchTerm) && (
        <Typography className="neeto-ui-text-gray-300 w-full p-5" style="body3">
          {t("noData.searchResultTitle", { searchTerm: debouncedSearchTerm })}
        </Typography>
      )}
    </div>
  );
};

export default List;
