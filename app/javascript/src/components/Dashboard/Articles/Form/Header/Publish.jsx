import React from "react";

import { useFormikContext } from "formik";
import { Pane, Button, Typography, DatePicker, TimePicker } from "neetoui";
import { Switch } from "neetoui/formik";
import { prop } from "ramda";
import { useTranslation } from "react-i18next";

import TooltipWrapper from "components/Common/TooltipWrapper";

import { ARTICLE_STATUS } from "../../constants";
import { DATE_FORMAT, TIME_FORMAT } from "../constants";

const Publish = ({ isOpen, onClose, article }) => {
  const { t } = useTranslation();
  const {
    isSubmitting,
    values,
    initialValues,
    errors,
    setValues,
    submitForm,
    setFieldValue,
  } = useFormikContext();

  const isPublishLaterEnabled =
    article.status === ARTICLE_STATUS.publish && !article?.unpublish_schedule;

  const handleClose = () => {
    const { publishLater, date, time } = initialValues;
    setValues({ ...values, publishLater, date, time });
    onClose();
  };

  return (
    <Pane isOpen={isOpen} onClose={handleClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          {t("headers.publishArticle")}
        </Typography>
      </Pane.Header>
      <Pane.Body>
        <div className="w-full space-y-2">
          <TooltipWrapper
            condition={isPublishLaterEnabled}
            message={t("errors.invalidPublishSchedule")}
          >
            <Switch
              disabled={isPublishLaterEnabled}
              label={t("labels.publishLater")}
              name="publishLater"
            />
          </TooltipWrapper>
          {values.publishLater && (
            <>
              <DatePicker
                error={errors?.date}
                format={DATE_FORMAT}
                getPopupContainer={prop("parentNode")}
                label={t("labels.date")}
                type="date"
                value={values.date}
                onChange={date => setFieldValue("date", date)}
              />
              <TimePicker
                error={errors?.time}
                format={TIME_FORMAT}
                getPopupContainer={prop("parentNode")}
                label={t("labels.time")}
                value={values.time}
                onChange={time => setFieldValue("time", time)}
              />
            </>
          )}
        </div>
      </Pane.Body>
      <Pane.Footer className="flex items-center space-x-2">
        <Button
          disabled={isSubmitting}
          label={t("common.publish")}
          loading={isSubmitting}
          type="submit"
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

export default Publish;
