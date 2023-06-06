import React, { useRef, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { Formik, Form } from "formik";
import { useEffect } from "react/cjs/react.development";
import { useHistory, useParams } from "react-router";

import articlesApi from "apis/articles";

import { ARTICLE_STATUS, VALIDATION_SCHEMA } from "./constants";
import Editor from "./Editor";
import Header from "./Header";
import { buildInitialValues } from "./utils";

const Update = () => {
  const [article, setArticle] = useState({});
  const [status, setStatus] = useState(ARTICLE_STATUS.draft);
  const [isLoading, setIsLoading] = useState(true);

  const editorRef = useRef(null);
  const history = useHistory();
  const { slug } = useParams();

  const handleSubmit = async values => {
    const payload = { ...values, status, category_id: values.category.value };
    try {
      const response = await articlesApi.update({ slug, payload });
      response.data?.notice && history.goBack();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleReset = ({ description }) => {
    editorRef.current.editor.commands.setContent(description);
  };

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
    fetchArticle();
  }, []);

  if (isLoading) return <PageLoader />;

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
          <Header setStatus={setStatus} status={status} />
          <Editor editorRef={editorRef} />
        </Form>
      </Formik>
    </div>
  );
};

export default Update;
