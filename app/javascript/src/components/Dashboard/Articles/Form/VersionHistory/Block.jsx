import React, { forwardRef } from "react";

import classnames from "classnames";
import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import { formatDate } from "../utils";

const Block = ({ version, handleShowVersion, lastVersionId }, ref) => {
  const { t } = useTranslation();

  const { id, event, created_at: createdAt } = version;

  return (
    <div
      key={id}
      ref={ref}
      className={classnames(
        "neeto-ui-bg-info-100 hover:neeto-ui-bg-gray-400 neeto-ui-rounded-sm flex w-full cursor-pointer flex-col space-y-1 p-3",
        {
          "cursor-not-allowed": lastVersionId === id,
        }
      )}
      onClick={() => handleShowVersion(id)}
    >
      <Typography style="h4" weight="semibold">
        {t("headers.versionEvent", { event })}
      </Typography>
      <Typography style="body3">{formatDate(createdAt)}</Typography>
    </div>
  );
};

export default forwardRef(Block);
