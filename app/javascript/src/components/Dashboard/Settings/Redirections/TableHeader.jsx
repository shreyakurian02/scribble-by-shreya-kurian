import React from "react";

import { Typography } from "neetoui";
// import { useTranslation } from "react-i18next";

const TableHeader = () => (
  // const { t } = useTranslation();

  <div className="grid grid-cols-2">
    <Typography
      className="neeto-ui-text-gray-700 mr-6 uppercase"
      style="h6"
      weight="semibold"
    >
      From
    </Typography>
    <Typography
      className="neeto-ui-text-gray-700 uppercase"
      style="h6"
      weight="semibold"
    >
      To
    </Typography>
  </div>
);
export default TableHeader;
