import React, { useRef, useState } from "react";

import { Formik, Form } from "formik";
import { PageLoader } from "neetoui";
import { useHistory, useParams } from "react-router";

import { ADMIN_URL, ARTICLES_URL } from "constants/urls";
import {
  useUpdateArticle,
  useShowArticle,
} from "hooks/reactQuery/useArticlesApi";

import { VALIDATION_SCHEMA } from "./constants";
import Editor from "./Editor";
import Header from "./Header";
import { buildInitialValues, buildUpdateArticlePayload } from "./utils";

import { ARTICLE_STATUS } from "../constants";

const Update = () => {
  const [status, setStatus] = useState(ARTICLE_STATUS.draft);

  const editorRef = useRef(null);
  const history = useHistory();
  const { id } = useParams();
  const { isLoading, data: article } = useShowArticle(id);
  const { mutate: updateArticle } = useUpdateArticle(id, {
    onSuccess: () => history.push(ADMIN_URL),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    updateArticle(
      {
        id,
        payload: buildUpdateArticlePayload({ values, article, status }),
      },
      { onSettled: () => setSubmitting(false) }
    );
  };

  const handleReset = ({ description }) => {
    editorRef.current.editor.commands.setContent(description);
    history.push(ARTICLES_URL);
  };

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
          <Header isEdit setStatus={setStatus} status={status} />
          <Editor editorRef={editorRef} />
        </Form>
      </Formik>
    </div>
  );
};

export default Update;
