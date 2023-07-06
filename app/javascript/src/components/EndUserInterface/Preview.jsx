import React from "react";

import { Spinner } from "neetoui";
import { useHistory, useParams } from "react-router";

import { useShowArticle } from "hooks/reactQuery/public/useArticlesApi";
import { useFetchCategories } from "hooks/reactQuery/public/useCategoriesApi";

import AccordianItem from "./AccordianItem";
import Article from "./Article";
import Header from "./Header";

const Preview = ({ site }) => {
  const history = useHistory();
  const { slug } = useParams();
  const { data: article = {} } = useShowArticle(slug);

  const onSuccess = categories => {
    const firstArticle = categories[0]?.articles[0];

    if (!slug && firstArticle) {
      history.push(`/articles/${firstArticle?.slug}`);
    }
  };

  const { isLoading, data: categories = [] } = useFetchCategories({
    onSuccess,
  });

  const { title } = site;

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
          <Article />
        </div>
      )}
    </>
  );
};

export default Preview;
