import React from "react";

import { useFormikContext } from "formik";
import { Info } from "neetoicons";
import {
  Pane,
  Button,
  Typography,
  DatePicker,
  TimePicker,
  Callout,
} from "neetoui";
import { Switch } from "neetoui/formik";
import { prop } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import TooltipWrapper from "components/Common/TooltipWrapper";
import { formatDate } from "components/Dashboard/utils";
import { useShowArticle } from "hooks/reactQuery/useArticlesApi";

import { ARTICLE_STATUS } from "../../constants";
import { isArticleStatusDraft } from "../../List/utils";
import { DATE_FORMAT, TIME_FORMAT } from "../constants";

const Publish = ({ isOpen, onClose }) => {
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

  const { id } = useParams();
  const { data: article = {} } = useShowArticle(id);
  const { publishLater } = values;
  const {
    status,
    unpublish_schedule: { datetime: unpublishScheduleDatetime } = {},
  } = article;

  const isPublishLaterEnabled =
    status === ARTICLE_STATUS.publish && !article?.unpublish_schedule;

  const handleClose = () => {
    const { publishLater, publishDate, publishTime } = initialValues;
    setValues({ ...values, publishLater, publishDate, publishTime });
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
        {!isArticleStatusDraft(status) && (
          <Callout icon={Info}>
            {t("messages.scheduledUnpublish", {
              datetime: formatDate(unpublishScheduleDatetime),
            })}
          </Callout>
        )}
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
          {publishLater && (
            <>
              <DatePicker
                error={errors?.publishDate}
                format={DATE_FORMAT}
                getPopupContainer={prop("parentNode")}
                label={t("labels.date")}
                value={values.publishDate}
                onChange={date => setFieldValue("publishDate", date)}
              />
              <TimePicker
                error={errors?.publishTime}
                format={TIME_FORMAT}
                getPopupContainer={prop("parentNode")}
                label={t("labels.time")}
                value={values.publishTime}
                onChange={time => setFieldValue("publishTime", time)}
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
            publishLater ? t("labels.publishLater") : t("labels.publishNow")
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

export default Publish;
