import React from "react";

import { Tooltip } from "neetoui";

const TooltipWrapper = ({ children, condition, message }) => {
  if (!condition) return children;

  return (
    <Tooltip content={message} followCursor="horizontal" position="right">
      <div>{children}</div>
    </Tooltip>
  );
};

export default TooltipWrapper;
