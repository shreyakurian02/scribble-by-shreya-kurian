import React from "react";

import { ErrorMessage, useFormikContext } from "formik";
import { FormikEditor } from "neetoeditor";
import { Textarea } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { EDITOR_ADDONS } from "./constants";

const Editor = ({ editorRef }) => {
  const { t } = useTranslation();
  const { setFieldValue } = useFormikContext();

  return (
    <FormikEditor
      required
      addons={EDITOR_ADDONS}
      className="space-y-3"
      contentClassName="editor-content"
      error={null}
      menuType="fixed"
      name="description"
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
          className="neeto-ui-text-error-800 mt-5 text-xs"
          component="p"
          name="description"
        />
      </div>
    </FormikEditor>
  );
};

export default Editor;
