import React from "react";

import dayjs from "dayjs";
import { Tooltip } from "neetoui";
import { Link } from "react-router-dom";

export const getCategoryOptions = categories =>
  categories.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

export const formatDate = date => dayjs(date).format("MMM DD, YYYY, hh:mm A");

export const renderArticleTitle = ({ title, slug }) => (
  <div className="py-1">
    <Tooltip content={title} followCursor="horizontal" position="bottom">
      <Link
        className="neeto-ui-text-primary-500"
        to={`/admin/articles/${slug}/edit`}
      >
        {title}
      </Link>
    </Tooltip>
  </div>
);
