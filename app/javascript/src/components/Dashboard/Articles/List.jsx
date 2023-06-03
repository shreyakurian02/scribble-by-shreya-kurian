import React, { useState } from "react";

import { NoData } from "@bigbinary/neetoui";
import classnames from "classnames";
import EmptyStateImage from "images/EmptyState";
import { Table } from "neetoui";
import { pluck } from "ramda";
import { useTranslation } from "react-i18next";

import { SINGULAR } from "constants";

import SubHeader from "./SubHeader";
import { getAllowedColumns, getColumnData } from "./utils";

const List = ({ articlesData }) => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState(
    pluck("dataIndex", getColumnData())
  );

  const { t } = useTranslation();

  const {
    articles,
    count: { all: articlesCount },
  } = articlesData;

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
        articlesCount={articlesCount}
        filteredColumns={filteredColumns}
        selectedRowIds={selectedRowIds}
        setFilteredColumns={setFilteredColumns}
      />
      <Table
        fixedHeight
        rowSelection
        columnData={getAllowedColumns(filteredColumns)}
        rowData={articles}
        scroll={{ x: 0 }}
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
