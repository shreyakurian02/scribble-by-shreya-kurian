import React, { useEffect } from "react";

import { EditorContent } from "neetoeditor";
import { Typography } from "neetoui";
import { useParams } from "react-router";

import articlesApi from "apis/public/articles";

const Preview = ({ article, setArticle }) => {
  const { slug } = useParams();

  const { title, description } = article;

  const fetchArticle = async () => {
    try {
      const {
        data: { article },
      } = await articlesApi.show(slug);
      setArticle(article);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  return (
    <div className="editor-preview__wrapper w-3/4 space-y-5">
      <Typography className="" style="h1">
        {title}
      </Typography>
      <EditorContent content={description} />
    </div>
  );
};

export default Preview;
