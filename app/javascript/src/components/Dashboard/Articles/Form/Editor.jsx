import React from "react";

import { ErrorMessage, useFormikContext } from "formik";
import { FormikEditor } from "neetoeditor";
import { Textarea } from "neetoui/formik";
import { useTranslation } from "react-i18next";

const Editor = ({ editorRef }) => {
  const { t } = useTranslation();

  const { setFieldValue } = useFormikContext();

  return (
    <FormikEditor
      required
      className="space-y-3 "
      contentClassName="editor-content"
      menuType="fixed"
      placeholder={t("placeholder.addDescription")}
      ref={editorRef}
      onChange={content => setFieldValue("description", content)}
    >
      <div className="editor-title space-y-10">
        <Textarea
          nakedTextarea
          name="title"
          placeholder={t("placeholder.articleTitle")}
          rows={1}
        />
        <ErrorMessage
          className="mt-5 text-xs text-red-600"
          component="p"
          name="description"
        />
      </div>
    </FormikEditor>
  );
};

export default Editor;
