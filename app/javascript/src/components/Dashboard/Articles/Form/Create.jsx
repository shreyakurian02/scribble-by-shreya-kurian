import React, { useRef, useState } from "react";

import { Formik, Form } from "formik";
import { useHistory } from "react-router";

import articlesApi from "apis/articles";
import { ARTICLES_URL } from "constants/urls";

import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./constants";
import Editor from "./Editor";
import Header from "./Header";
import { buildCreateArticlePayload } from "./utils";

import { ARTICLE_STATUS } from "../constants";

const Create = () => {
  const [status, setStatus] = useState(ARTICLE_STATUS.draft);

  const editorRef = useRef(null);
  const history = useHistory();

  const handleSubmit = async values => {
    try {
      await articlesApi.create(buildCreateArticlePayload({ values, status }));
      history.push(ARTICLES_URL);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleReset = () => {
    editorRef.current.editor.commands.clearContent();
    history.push(ARTICLES_URL);
  };

  return (
    <div className="w-full pt-5">
      <Formik
        enableReinitialize
        initialValues={INITIAL_VALUES}
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

export default Create;
