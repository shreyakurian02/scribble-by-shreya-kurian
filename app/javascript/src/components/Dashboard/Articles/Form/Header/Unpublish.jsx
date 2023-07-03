import React from "react";

import { useFormikContext } from "formik";
import { Pane, Button, Typography, DatePicker, TimePicker } from "neetoui";
import { Switch } from "neetoui/formik";
import { prop } from "ramda";
import { useTranslation } from "react-i18next";

import TooltipWrapper from "components/Common/TooltipWrapper";

import { ARTICLE_STATUS } from "../../constants";
import { DATE_FORMAT, TIME_FORMAT } from "../constants";

const Unpublish = ({ isOpen, onClose, isEdit, article }) => {
  const { t } = useTranslation();
  const {
    isSubmitting,
    initialValues,
    values,
    errors,
    setValues,
    submitForm,
    setFieldValue,
  } = useFormikContext();

  const { unpublishLater } = values;
  const isUnpublishLaterEnabled =
    !isEdit ||
    (article.status === ARTICLE_STATUS.draft && !article?.publish_schedule);

  const handleClose = () => {
    const { unpublishLater, unpublishDate, unpublishTime } = initialValues;
    setValues({ ...values, unpublishLater, unpublishDate, unpublishTime });
    onClose();
  };

  return (
    <Pane isOpen={isOpen} onClose={handleClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          {t("headers.unpublishArticle")}
        </Typography>
      </Pane.Header>
      <Pane.Body>
        <div className="w-full space-y-2">
          <TooltipWrapper
            condition={isUnpublishLaterEnabled}
            message={t("errors.invalidUnpublishSchedule")}
          >
            <Switch
              disabled={isUnpublishLaterEnabled}
              label={t("labels.unpublishLater")}
              name="unpublishLater"
            />
          </TooltipWrapper>
          {unpublishLater && (
            <>
              <DatePicker
                error={errors?.unpublishDate}
                format={DATE_FORMAT}
                getPopupContainer={prop("parentNode")}
                label={t("labels.date")}
                type="date"
                value={values.unpublishDate}
                onChange={date => setFieldValue("unpublishDate", date)}
              />
              <TimePicker
                error={errors?.unpublishTime}
                format={TIME_FORMAT}
                getPopupContainer={prop("parentNode")}
                label={t("labels.time")}
                value={values.unpublishTime}
                onChange={time => setFieldValue("unpublishTime", time)}
              />
            </>
          )}
        </div>
      </Pane.Body>
      <Pane.Footer className="flex items-center space-x-2">
        <Button
          disabled={isSubmitting}
          loading={isSubmitting}
          type="submit"
          label={
            unpublishLater ? t("labels.unpublishLater") : t("common.draft")
          }
          onClick={submitForm}
        />
        <Button
          label={t("button.cancel")}
          style="text"
          type="reset"
          onClick={handleClose}
        />
      </Pane.Footer>
    </Pane>
  );
};

export default Unpublish;
