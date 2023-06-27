import React, { useRef, useState, useEffect } from "react";

import { Formik, Form } from "formik";
import { PageLoader } from "neetoui";
import { useHistory, useParams } from "react-router";

import articlesApi from "apis/articles";
import { ADMIN_URL, ARTICLES_URL } from "constants/urls";

import { VALIDATION_SCHEMA } from "./constants";
import Editor from "./Editor";
import Header from "./Header";
import { buildInitialValues } from "./utils";

import { ARTICLE_STATUS } from "../constants";

const Update = () => {
  const [article, setArticle] = useState({});
  const [status, setStatus] = useState(ARTICLE_STATUS.draft);
  const [isLoading, setIsLoading] = useState(true);

  const editorRef = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  const handleSubmit = async values => {
    const payload = { ...values, status, category_id: values.category.value };
    try {
      await articlesApi.update({ id, payload });
      history.push(ADMIN_URL);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleReset = ({ description }) => {
    editorRef.current.editor.commands.setContent(description);
    history.push(ARTICLES_URL);
  };

  const fetchArticle = async () => {
    setIsLoading(true);
    try {
      const {
        data: { article },
      } = await articlesApi.show(id);
      setArticle(article);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="w-full pt-5">
      <Formik
        enableReinitialize
        initialValues={buildInitialValues(article)}
        validationSchema={VALIDATION_SCHEMA}
        onReset={handleReset}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-5">
          <Header
            isEdit
            article={article}
            fetchArticle={fetchArticle}
            setStatus={setStatus}
            status={status}
          />
          <Editor editorRef={editorRef} />
        </Form>
      </Formik>
    </div>
  );
};

export default Update;
