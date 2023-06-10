import React from "react";

import { Typography } from "neetoui";

const Header = ({ title, subtitle }) => (
  <div className="space-y-1">
    <Typography style="h2">{title}</Typography>
    <Typography className="neeto-ui-text-gray-600" style="h4" weight="normal">
      {subtitle}
    </Typography>
  </div>
);

export default React.memo(Header);
