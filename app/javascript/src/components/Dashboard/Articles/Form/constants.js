import { SINGULAR } from "constants";

import dayjs from "dayjs";
import { t } from "i18next";
import { isEditorEmpty } from "neetoeditor";
import * as yup from "yup";

export const CURRENT_DATETIME = dayjs().add(1, "hour");

export const INITIAL_VALUES = {
  category: null,
  title: "",
  description: "<p></p>",
  publishLater: false,
  publishDate: CURRENT_DATETIME,
  publishTime: CURRENT_DATETIME,
  unpublishLater: false,
  unpublishDate: CURRENT_DATETIME,
  unpublishTime: CURRENT_DATETIME,
};

export const DATE_FORMAT = "MM/DD/YYYY";

export const TIME_FORMAT = "h A";

export const EDITOR_ADDONS = [
  "code-block",
  "block-quote",
  "image-upload",
  "undo",
  "redo",
];

export const VALIDATION_SCHEMA = yup.object().shape({
  category: yup
    .object()
    .shape({ label: yup.string(), value: yup.string() })
    .nullable()
    .required(
      t("validations.required", { entity: t("common.category", SINGULAR) })
    ),
  title: yup
    .string()
    .matches(/.*[a-zA-Z0-9].*/, t("validations.validAlphaNumeric"))
    .required(t("validations.required", { entity: t("common.title") })),
  description: yup
    .string()
    .test(
      "description",
      t("validations.required", { entity: t("common.description") }),
      value => !isEditorEmpty(value)
    ),
  unpublishDate: yup.string().when("unpublishLater", {
    is: true,
    then: yup
      .string()
      .nullable()
      .test("unpublishDate", t("validations.futureDate"), date =>
        date ? dayjs().isBefore(dayjs(date).hour(23)) : true
      )
      .required(t("validations.required", { entity: t("labels.date") })),
  }),
  unpublishTime: yup.string().when("unpublishLater", {
    is: true,
    then: yup
      .string()
      .nullable()
      .test(
        "futureTime",
        t("validations.futureTime"),
        (unpublishTime, { parent: { unpublishDate } }) =>
          dayjs().isBefore(
            dayjs(unpublishDate).set("hour", dayjs(unpublishTime).hour())
          )
      )
      .required(t("validations.required", { entity: t("labels.time") })),
  }),
  publishDate: yup.string().when("publishLater", {
    is: true,
    then: yup
      .string()
      .nullable()
      .test("validDate", t("validations.futureDate"), publishDate =>
        publishDate ? dayjs().isBefore(dayjs(publishDate).hour(23)) : true
      )
      .required(t("validations.required", { entity: t("labels.date") })),
  }),
  publishTime: yup.string().when("publishLater", {
    is: true,
    then: yup
      .string()
      .nullable()
      .required(t("validations.required", { entity: t("labels.time") }))
      .test(
        "futureTime",
        t("validations.futureTime"),
        (publishTime, { parent: { publishDate } }) =>
          dayjs().isBefore(
            dayjs(publishDate).set("hour", dayjs(publishTime).hour())
          )
      ),
  }),
});
