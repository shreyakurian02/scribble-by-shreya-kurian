import React, { useState, useEffect } from "react";

import { Typography, Spinner } from "neetoui";
import { isEmpty } from "ramda";
import { useHistory, useParams } from "react-router";

import categoriesApi from "apis/public/categories";

import AccordianItem from "./AccordianItem";
import Article from "./Article";

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
      <div className="border-b sticky z-10 flex h-16 w-full items-center justify-center px-6 py-4">
        <Typography className="neeto-ui-text-gray-800" style="h4">
          {title}
        </Typography>
      </div>
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
