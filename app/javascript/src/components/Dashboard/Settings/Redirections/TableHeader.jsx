import React from "react";

import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const TableHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2">
      <Typography
        className="neeto-ui-text-gray-700 mr-6 uppercase"
        style="h6"
        weight="semibold"
      >
        {t("common.from")}
      </Typography>
      <Typography
        className="neeto-ui-text-gray-700 uppercase"
        style="h6"
        weight="semibold"
      >
        {t("common.to")}
      </Typography>
    </div>
  );
};

export default TableHeader;
