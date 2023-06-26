import React from "react";

import { Typography } from "neetoui";
import { isNil } from "ramda";

const HighlightedTypography = ({
  text = "",
  searchTerm = "",
  style = "body3",
  className = "",
}) => {
  const searchTermLength = searchTerm.length;
  const startIndex = text?.toLowerCase().indexOf(searchTerm?.toLowerCase());
  const endIndex = startIndex + searchTermLength;

  if (isNil(text)) return null;

  return (
    <Typography className={className} style={style}>
      {startIndex === -1 ? (
        text
      ) : (
        <>
          <span>{text.substr(0, startIndex)}</span>
          <span className="neeto-ui-bg-pastel-red">
            {text.substr(startIndex, searchTermLength)}
          </span>
          <span>{text.substr(endIndex, text.length)}</span>
        </>
      )}
    </Typography>
  );
};

export default HighlightedTypography;
