import { isEditorEmpty } from "@bigbinary/neeto-editor";
import * as yup from "yup";

export const INITIAL_VALUES = {
  category: null,
  title: "",
  description: "<p></p>",
};

export const VALIDATION_SCHEMA = yup.object().shape({
  category: yup
    .object()
    .shape({ label: yup.string(), value: yup.string() })
    .nullable()
    .required("Category is required"),
  title: yup.string().required("Title is required"),
  description: yup
    .string()
    .test(
      "description",
      "Description is required",
      value => !isEditorEmpty(value)
    ),
});

export const SUBMIT_OPTIONS = {
  draft: "draft",
  publish: "publish",
};
