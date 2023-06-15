import { SINGULAR } from "constants";

import React, { useEffect, useState } from "react";

import { Button } from "neetoui";
import { Header, Container } from "neetoui/layouts";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import articlesApi from "apis/articles";
import AddCategory from "components/Dashboard/Common/CategoryForm";
import { NEW_ARTICLE_URL } from "constants/urls";
import { useCategoriesDispatch } from "contexts/categories";
import useDebounce from "hooks/useDebounce";

import {
  ARTICLES_INITIAL_VALUE,
  DEFAULT_PAGE_PROPERTIES,
  HEADER_TITLE,
} from "./constants";
import List from "./List";
import MenuBar from "./MenuBar";
import { pushURLSearchParams, getSearchParams } from "./utils";

const Articles = () => {
  const { status, categories: queryCategories, search } = getSearchParams();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [articleSearchTerm, setArticleSearchTerm] = useState(search);
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [pageProperties, setPageProperties] = useState(DEFAULT_PAGE_PROPERTIES);
  const [isArticlesLoading, setIsArticlesLoading] = useState(true);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [articles, setArticles] = useState(ARTICLES_INITIAL_VALUE);

  const { t } = useTranslation();
  const history = useHistory();
  const debouncedCategorySearchTerm = useDebounce(categorySearchTerm);
  const debouncedArticleSearchTerm = useDebounce(articleSearchTerm);
  const fetchCategories = useCategoriesDispatch();

  const { size: pageSize, page: currentPageNumber } = pageProperties;

  const fetchArticles = async () => {
    setIsArticlesLoading(true);
    try {
      const {
        data: { articles, articles_count: count },
      } = await articlesApi.fetch({
        status,
        search,
        categories: queryCategories,
        per_page: pageSize,
        page_number: currentPageNumber,
      });
      setArticles({ articles, count });
    } catch (error) {
      logger.error(error);
    } finally {
      setIsArticlesLoading(false);
    }
  };

  useEffect(() => {
    pushURLSearchParams({
      history,
      param: "search",
      value: debouncedArticleSearchTerm.trim(),
    });
    setPageProperties(DEFAULT_PAGE_PROPERTIES);
  }, [debouncedArticleSearchTerm]);

  useEffect(() => {
    fetchCategories(debouncedCategorySearchTerm.trim());
  }, [debouncedCategorySearchTerm]);

  useEffect(() => {
    fetchArticles();
  }, [window.location.search, pageProperties]);

  return (
    <>
      <MenuBar
        articlesCount={articles.count}
        categorySearchTerm={categorySearchTerm}
        setCategorySearchTerm={setCategorySearchTerm}
        setIsNewCategoryModalOpen={setIsNewCategoryModalOpen}
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
                entity: t("common.article", SINGULAR),
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
          articles={articles}
          isArticlesLoading={isArticlesLoading}
          pageProperties={pageProperties}
          refetchArticles={fetchArticles}
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
