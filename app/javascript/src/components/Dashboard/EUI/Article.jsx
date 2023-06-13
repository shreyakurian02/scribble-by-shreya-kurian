import React, { useState, useEffect } from "react";

import { EditorContent } from "neetoeditor";
import { Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import articlesApi from "apis/public/articles";

const Article = ({ article, setArticle }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { slug } = useParams();
  const { t } = useTranslation();

  const { title, description } = article;

  const fetchArticle = async () => {
    setIsLoading(true);
    try {
      const {
        data: { article },
      } = await articlesApi.show(slug);
      setArticle(article);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  if (!isLoading && isEmpty(article)) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Typography style="h5">{t("noData.publishedArticles")}</Typography>
      </div>
    );
  }

  return (
    <div className="editor-preview__wrapper w-3/4 space-y-5">
      <Typography style="h1">{title}</Typography>
      <EditorContent content={description} />
    </div>
  );
};

export default Article;
