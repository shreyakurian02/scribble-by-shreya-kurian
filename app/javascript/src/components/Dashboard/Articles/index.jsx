import React, { useEffect, useState } from "react";

import { Button } from "neetoui";
import { Header, Container } from "neetoui/layouts";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import { SINGULAR, NEW_ARTICLE_URL } from "constants";

import AddCategory from "./AddCategory";
import { ARTICLES_DATA_INITIAL_VALUE, HEADER_TITLE } from "./constants";
import List from "./List";
import MenuBar from "./MenuBar";
import { pushURLSearchParams, getSearchParams } from "./utils";

const Articles = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [isArticlesLoading, setIsArticlesLoading] = useState(true);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [articlesData, setArticlesData] = useState(ARTICLES_DATA_INITIAL_VALUE);

  const { t } = useTranslation();
  const history = useHistory();

  const { status, categories: queryCategories, search } = getSearchParams();

  const fetchCategories = async () => {
    setIsCategoriesLoading(true);
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsCategoriesLoading(false);
    }
  };

  const fetchArticles = async () => {
    setIsArticlesLoading(true);
    try {
      const {
        data: { articles, articles_count: count },
      } = await articlesApi.fetch({
        status,
        categories: queryCategories,
        search,
      });
      setArticlesData({ articles, count });
    } catch (error) {
      logger.error(error);
    } finally {
      setIsArticlesLoading(false);
    }
  };

  const handleSearch = ({ target: { value } }) => {
    setSearchTerm(value);
    pushURLSearchParams(history, "search", value);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [window.location.search]);

  return (
    <>
      <MenuBar
        articlesCount={articlesData.count}
        categories={categories}
        isCategoriesLoading={isCategoriesLoading}
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
            onChange: handleSearch,
            value: searchTerm,
          }}
        />
        <List
          articlesData={articlesData}
          categories={categories}
          isArticlesLoading={isArticlesLoading}
          refetchArticles={fetchArticles}
          refetchCategories={fetchCategories}
          setSearchTerm={setSearchTerm}
        />
        <AddCategory
          isOpen={isNewCategoryModalOpen}
          refetchCategories={fetchCategories}
          onClose={() => setIsNewCategoryModalOpen(false)}
        />
      </Container>
    </>
  );
};

export default Articles;
