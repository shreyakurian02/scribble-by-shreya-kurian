import React from "react";

import { Tooltip } from "neetoui";

const TooltipWrapper = ({ children, condition, message }) => {
  if (!condition) return children;

  return (
    <Tooltip content={message} position="bottom">
      <div>{children}</div>
    </Tooltip>
  );
};

export default TooltipWrapper;
