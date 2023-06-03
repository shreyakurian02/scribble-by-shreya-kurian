import React, { useEffect, useState } from "react";

import { PageLoader, Button } from "neetoui";
import { Header, Container } from "neetoui/layouts";
import { useTranslation } from "react-i18next";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import { SINGULAR, NEW_ARTICLE_URL } from "constants";

import AddCategory from "./AddCategory";
import { ARTICLES_DATA_INITIAL_VALUE } from "./constants";
import List from "./List";
import MenuBar from "./MenuBar";

const Articles = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [articlesData, setArticlesData] = useState(ARTICLES_DATA_INITIAL_VALUE);

  const { t } = useTranslation();

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticles = async () => {
    try {
      const {
        data: { articles, articles_count: count },
      } = await articlesApi.fetch();
      setArticlesData({ articles, count });
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticlesAndCategories = async () => {
    await Promise.all([fetchCategories(), fetchArticles()]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchArticlesAndCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <MenuBar
        articlesCount={articlesData.count}
        categories={categories}
        setIsNewCategoryModalOpen={setIsNewCategoryModalOpen}
        showMenu={isMenuOpen}
      />
      <Container>
        <Header
          menuBarToggle={() => setIsMenuOpen(isMenuOpen => !isMenuOpen)}
          title={t("common.allArticles")}
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
        <List articlesData={articlesData} />
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
