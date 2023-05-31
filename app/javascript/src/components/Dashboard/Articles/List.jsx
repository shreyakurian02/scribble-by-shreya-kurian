import React, { useState } from "react";

import { NoData } from "@bigbinary/neetoui";
import classnames from "classnames";
import EmptyStateImage from "images/EmptyState";
import { Typography, Table } from "neetoui";
import { SubHeader } from "neetoui/layouts";

import { COLUMN_DATA } from "./constants";

const List = ({ articles = [] }) => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  if (articles.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <NoData
          description="You have not yet created an article. Create an article using the CTA given below"
          image={EmptyStateImage}
          title="There are no articles."
          primaryButtonProps={{
            label: "Add article",
          }}
        />
      </div>
    );
  }

  return (
    <>
      <SubHeader
        leftActionBlock={
          <Typography component="h4" style="h4">
            {articles.length} articles
          </Typography>
        }
      />
      <Table
        fixedHeight
        rowSelection
        columnData={COLUMN_DATA}
        rowData={articles}
        selectedRowKeys={selectedRowIds}
        rowClassName={(_, index) =>
          classnames({ "neeto-ui-bg-gray-200": index % 2 !== 0 })
        }
        onRowSelect={setSelectedRowIds}
      />
    </>
  );
};

export default List;
