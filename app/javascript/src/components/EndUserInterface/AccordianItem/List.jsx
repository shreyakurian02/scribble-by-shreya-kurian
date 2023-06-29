import React from "react";

import { Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const List = ({ articles }) => {
  const { t } = useTranslation();

  if (isEmpty(articles)) {
    return (
      <Typography className="neeto-ui-text-gray-500 ml-8" style="body2">
        {t("noData.categorySpecificArticles")}
      </Typography>
    );
  }

  return articles.map(({ id, title, slug }) => (
    <NavLink
      activeStyle={{ color: "#5e5ce6" }}
      className="neeto-ui-text-gray-500"
      key={id}
      to={`/articles/${slug}`}
    >
      <Typography className="neeto-ui-font-mediumm ml-8" style="body2">
        {title}
      </Typography>
    </NavLink>
  ));
};

export default List;
