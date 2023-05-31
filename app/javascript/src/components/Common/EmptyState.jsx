import React from "react";

import EmptyStateImage from "images/EmptyState";
import { Typography, Button } from "neetoui";

const EmptyState = ({ title, subTitle, actionLabel }) => (
  <div className="flex h-full w-full flex-col items-center justify-center space-y-3 ">
    <img src={EmptyStateImage} />
    <Typography style="h3">{title}</Typography>
    <Typography style="body2">{subTitle}</Typography>
    <Button label={actionLabel} size="large" onClick={() => {}} />
  </div>
);
export default EmptyState;
