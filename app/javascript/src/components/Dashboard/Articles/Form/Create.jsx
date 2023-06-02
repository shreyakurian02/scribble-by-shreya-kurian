import React, { useRef } from "react";

import { Formik, Form } from "formik";

import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./constants";
import Editor from "./Editor";
import Header from "./Header";

const Create = () => {
  const editorRef = useRef(null);

  const handleSubmit = () => {};

  const handleReset = () => editorRef.current.editor.commands.clearContent();

  return (
    <div className="w-full pt-5">
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onReset={handleReset}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-5">
          <Header />
          <Editor editorRef={editorRef} />
        </Form>
      </Formik>
    </div>
  );
};

export default Create;
