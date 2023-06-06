import React, { useEffect, useState } from "react";

import { Button } from "neetoui";
import { Header, Container } from "neetoui/layouts";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import articlesApi from "apis/articles";
import { SINGULAR, NEW_ARTICLE_URL } from "constants";
import { useCategoriesDispatch } from "contexts/categories";
import useDebounce from "hooks/useDebounce";

import AddCategory from "./AddCategory";
import {
  ARTICLES_DATA_INITIAL_VALUE,
  DEFAULT_PAGE_PROPERTIES,
  HEADER_TITLE,
} from "./constants";
import List from "./List";
import MenuBar from "./MenuBar";
import { pushURLSearchParams, getSearchParams } from "./utils";

const Articles = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [pageProperties, setPageProperties] = useState(DEFAULT_PAGE_PROPERTIES);
  const [isArticlesLoading, setIsArticlesLoading] = useState(true);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [articlesData, setArticlesData] = useState(ARTICLES_DATA_INITIAL_VALUE);

  const { t } = useTranslation();
  const history = useHistory();
  const debouncedCategorySearchTerm = useDebounce(categorySearchTerm);
  const debouncedArticleSearchTerm = useDebounce(searchTerm);

  const fetchCategories = useCategoriesDispatch();

  const { status, categories: queryCategories, search } = getSearchParams();

  const fetchArticles = async () => {
    setIsArticlesLoading(true);
    try {
      const {
        data: { articles, articles_count: count },
      } = await articlesApi.fetch({
        status,
        categories: queryCategories,
        search,
        per_page: pageProperties.size,
        page_number: pageProperties.index,
      });
      setArticlesData({ articles, count });
    } catch (error) {
      logger.error(error);
    } finally {
      setIsArticlesLoading(false);
    }
  };

  useEffect(() => {
    pushURLSearchParams(history, "search", debouncedArticleSearchTerm);
  }, [debouncedArticleSearchTerm]);

  useEffect(() => {
    fetchCategories(debouncedCategorySearchTerm);
  }, [debouncedCategorySearchTerm]);

  useEffect(() => {
    fetchArticles();
  }, [window.location.search, pageProperties]);

  return (
    <>
      <MenuBar
        articlesCount={articlesData.count}
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
            onChange: ({ target: { value } }) => setSearchTerm(value),
            value: searchTerm,
          }}
        />
        <List
          articlesData={articlesData}
          isArticlesLoading={isArticlesLoading}
          pageProperties={pageProperties}
          refetchArticles={fetchArticles}
          setPageProperties={setPageProperties}
          setSearchTerm={setSearchTerm}
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
