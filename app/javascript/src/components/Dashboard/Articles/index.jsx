import { SINGULAR } from "constants";

import React, { useEffect, useState } from "react";

import { Button } from "neetoui";
import { Header, Container } from "neetoui/layouts";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import AddCategory from "components/Dashboard/CategoryForm";
import { DEFAULT_PAGE_PROPERTIES } from "components/Dashboard/constants";
import { NEW_ARTICLE_URL } from "constants/urls";
import { useCategoriesDispatch } from "contexts/categories";
import { useFetchArticles } from "hooks/reactQuery/useArticlesApi";
import useDebounce from "hooks/useDebounce";

import { HEADER_TITLE } from "./constants";
import List from "./List";
import MenuBar from "./MenuBar";
import { pushUrlSearchParams, getQueryParams } from "./utils";

const Articles = () => {
  const { t } = useTranslation();
  const { status, categories: queryCategories, search } = getQueryParams();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [articleSearchTerm, setArticleSearchTerm] = useState(search);
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [pageProperties, setPageProperties] = useState(DEFAULT_PAGE_PROPERTIES);
  // const [isArticlesLoading, setIsArticlesLoading] = useState(true);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  // const [articles, setArticles] = useState(ARTICLES_INITIAL_VALUE);

  const history = useHistory();
  const debouncedCategorySearchTerm = useDebounce(categorySearchTerm);
  const debouncedArticleSearchTerm = useDebounce(articleSearchTerm);
  const { fetchCategories } = useCategoriesDispatch();

  const { data: { articles_count: articlesCount = {} } = {} } =
    useFetchArticles({
      status,
      search,
      categories: queryCategories,
      per_page: pageSize,
      page_number: currentPageNumber,
    });

  const { size: pageSize, page: currentPageNumber } = pageProperties;

  useEffect(() => {
    pushUrlSearchParams({
      history,
      param: "search",
      value: debouncedArticleSearchTerm.trim(),
    });
    setPageProperties(DEFAULT_PAGE_PROPERTIES);
  }, [debouncedArticleSearchTerm]);

  useEffect(() => {
    fetchCategories(debouncedCategorySearchTerm.trim());
  }, [debouncedCategorySearchTerm]);

  return (
    <>
      <MenuBar
        articlesCount={articlesCount}
        categorySearchTerm={categorySearchTerm}
        setCategorySearchTerm={setCategorySearchTerm}
        setIsNewCategoryModalOpen={setIsNewCategoryModalOpen}
        setPageProperties={setPageProperties}
        showMenu={isMenuOpen}
      />
      <Container>
        <Header
          menuBarToggle={() => setIsMenuOpen(isMenuOpen => !isMenuOpen)}
          title={HEADER_TITLE[status]}
          actionBlock={
            <Button
              to={NEW_ARTICLE_URL}
              label={t("button.addEntity", {
                entity: t("common.article", SINGULAR).toLowerCase(),
              })}
            />
          }
          searchProps={{
            placeholder: t("placeholder.searchArticles"),
            onChange: ({ target: { value } }) => setArticleSearchTerm(value),
            value: articleSearchTerm,
          }}
        />
        <List
          pageProperties={pageProperties}
          setArticleSearchTerm={setArticleSearchTerm}
          setPageProperties={setPageProperties}
        />
        <AddCategory
          isOpen={isNewCategoryModalOpen}
          onClose={() => setIsNewCategoryModalOpen(false)}
        />
      </Container>
    </>
  );
};

export default Articles;
