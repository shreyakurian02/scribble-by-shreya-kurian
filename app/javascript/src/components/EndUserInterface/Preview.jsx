import React, { useState, useEffect } from "react";

import { Spinner } from "neetoui";
import { isEmpty } from "ramda";
import { useHistory, useParams } from "react-router";

import categoriesApi from "apis/public/categories";

import AccordianItem from "./AccordianItem";
import Article from "./Article";
import Header from "./Header";

const Preview = ({ site }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [article, setArticle] = useState({});

  const history = useHistory();
  const { slug } = useParams();

  const { title } = site;

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
      const firstCategoryWithArticles = categories.find(
        category => !isEmpty(category.articles)
      );

      if (!slug && firstCategoryWithArticles) {
        history.push(`/articles/${firstCategoryWithArticles.articles[0].slug}`);
      }
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Header siteTitle={title} />
      {isLoading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex w-full">
          <div className="border-r accordian-wrapper w-1/4 overflow-hidden pl-5">
            {categories.map(category => (
              <AccordianItem
                category={category}
                isCategoryExpanded={article.category_id === category.id}
                key={category.id}
              />
            ))}
          </div>
          <Article article={article} setArticle={setArticle} />
        </div>
      )}
    </>
  );
};

export default Preview;
