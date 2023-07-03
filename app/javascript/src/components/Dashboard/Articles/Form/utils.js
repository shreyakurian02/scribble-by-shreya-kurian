import dayjs from "dayjs";

import { CURRENT_DATETIME } from "./constants";

import { ARTICLE_STATUS } from "../constants";

const getScheduleDatetime = schedule =>
  schedule ? dayjs(schedule?.datetime) : CURRENT_DATETIME;

export const buildInitialValues = article => {
  const {
    publish_schedule,
    unpublish_schedule,
    title,
    description,
    category: { name, id },
  } = article;

  const publishDatetime = getScheduleDatetime(publish_schedule);
  const unpublishDatetime = getScheduleDatetime(unpublish_schedule);

  return {
    title,
    description,
    category: { label: name, value: id },
    publishLater: Boolean(publish_schedule?.datetime),
    publishDate: publishDatetime,
    publishTime: publishDatetime,
    unpublishDate: unpublishDatetime,
    unpublishTime: unpublishDatetime,
    unpublishLater: Boolean(unpublish_schedule?.datetime),
  };
};

export const formatDate = date => dayjs(date).format("hh:mm A, DD MMMM YYYY");

export const titlize = ([firstLetter, ...rest]) =>
  firstLetter.toUpperCase() + rest.join("");

export const formatDatetime = ({ date, time }) =>
  `${dayjs(date).format("YYYY-MM-DD")} ${dayjs(time).format("HH")}`;

export const buildCreateArticlePayload = ({ values, status }) => {
  const {
    category,
    publishDate,
    publishTime,
    publishLater,
    unpublishLater,
    unpublishDate,
    unpublishTime,
  } = values;

  let payload = {
    ...values,
    status: publishLater ? ARTICLE_STATUS.draft : status,
    category_id: category.value,
  };

  if (publishLater || unpublishLater) {
    payload = {
      ...payload,
      article_schedules_attributes: [],
    };

    if (publishLater) {
      payload.article_schedules_attributes.push({
        kind: "publish",
        datetime: formatDatetime({ date: publishDate, time: publishTime }),
      });
    }

    if (unpublishLater) {
      payload.article_schedules_attributes.push({
        kind: "unpublish",
        datetime: formatDatetime({ date: unpublishDate, time: unpublishTime }),
      });
    }
  }

  return payload;
};

export const buildUpdateArticlePayload = ({ values, article, status }) => {
  const {
    publishDate,
    publishTime,
    category,
    publishLater,
    unpublishLater,
    unpublishDate,
    unpublishTime,
  } = values;

  const payload = {
    ...values,
    article_schedules_attributes: [],
    category_id: category.value,
  };

  if (publishLater) {
    payload.article_schedules_attributes.push({
      id: article?.publish_schedule?.id,
      kind: "publish",
      datetime: formatDatetime({ date: publishDate, time: publishTime }),
    });
  }

  if (unpublishLater) {
    payload.article_schedules_attributes.push({
      id: article?.unpublish_schedule?.id,
      kind: "unpublish",
      datetime: formatDatetime({ date: unpublishDate, time: unpublishTime }),
    });
  }

  if (!publishLater && article?.publish_schedule) {
    payload.article_schedules_attributes.push({
      id: article?.publish_schedule?.id,
      _destroy: true,
    });
    payload["status"] = status;
  }

  if (!unpublishLater && article?.unpublish_schedule) {
    payload.article_schedules_attributes.push({
      id: article?.unpublish_schedule?.id,
      _destroy: true,
    });
    payload["status"] = status;
  }

  if (!unpublishLater && !publishLater) {
    payload["status"] = status;
  }

  return payload;
};
