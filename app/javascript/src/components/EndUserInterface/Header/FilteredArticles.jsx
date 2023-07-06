import React from "react";

import { Typography, Spinner } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import HighlightedTypography from "components/Common/HighlightedTypography";
import { useFetchArticles } from "hooks/reactQuery/public/useArticlesApi";

const FilteredArticles = ({
  setSearchTerm,
  searchTerm,
  debouncedSearchTerm,
}) => {
  const { t } = useTranslation();
  const { isLoading, data: filteredArticles = [] } = useFetchArticles({
    search: debouncedSearchTerm,
  });

  if (isLoading) {
    return (
      <div className="neeto-ui-bg-white flex h-16 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="neeto-ui-bg-white neeto-ui-shadow-lg max-h-1/4 space-y-2 overflow-y-scroll">
      {!isEmpty(searchTerm) &&
        filteredArticles.map(
          ({ title, slug, id, matched_content: matchedContent }) => (
            <div
              className="hover:neeto-ui-bg-gray-200 neeto-ui-bg-white neeto-ui-rounded-sm relative w-full p-3"
              key={id}
            >
              <Link className="w-full" to={`/articles/${slug}`}>
                <div onClick={() => setSearchTerm("")}>
                  <HighlightedTypography
                    searchTerm={debouncedSearchTerm}
                    style="h6"
                    text={title}
                  />
                  {matchedContent?.map(content => (
                    <HighlightedTypography
                      className="neeto-ui-text-gray-600"
                      key={uuid()}
                      searchTerm={debouncedSearchTerm}
                      text={content}
                    />
                  ))}
                </div>
              </Link>
            </div>
          )
        )}
      {isEmpty(filteredArticles) && !isEmpty(debouncedSearchTerm) && (
        <Typography className="neeto-ui-text-gray-800 w-full p-5" style="body3">
          {t("noData.searchResultTitle", { searchTerm: debouncedSearchTerm })}
        </Typography>
      )}
    </div>
  );
};

export default FilteredArticles;
