import React, { useState } from "react";

import { NoData } from "@bigbinary/neetoui";
import classnames from "classnames";
import EmptyStateImage from "images/EmptyState";
import { Table } from "neetoui";
import { pluck } from "ramda";
import { useTranslation } from "react-i18next";

import { SINGULAR } from "constants";

import { COLUMN_DATA } from "./constants";
import SubHeader from "./SubHeader";
import { buildColumnData } from "./utils";

const List = ({ articles = [] }) => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState(
    pluck("dataIndex", COLUMN_DATA)
  );

  const { t } = useTranslation();

  if (articles.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <NoData
          description={t("noData.articleDescription")}
          image={EmptyStateImage}
          title={t("noData.articleTitle")}
          primaryButtonProps={{
            label: t("button.addEntity", {
              entity: t("common.article", SINGULAR),
            }),
          }}
        />
      </div>
    );
  }

  return (
    <>
      <SubHeader
        articleCount={articles.length}
        filteredColumns={filteredColumns}
        selectedRowIds={selectedRowIds}
        setFilteredColumns={setFilteredColumns}
      />
      <Table
        fixedHeight
        rowSelection
        columnData={buildColumnData(filteredColumns)}
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
