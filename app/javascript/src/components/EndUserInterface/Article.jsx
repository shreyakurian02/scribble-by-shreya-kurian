import React from "react";

import { EditorContent } from "neetoeditor";
import { Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { useShowArticle } from "hooks/reactQuery/public/useArticlesApi";

const Article = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const { data: article = {} } = useShowArticle(slug);

  const { title, description } = article;

  if (isEmpty(article) && !slug) {
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
