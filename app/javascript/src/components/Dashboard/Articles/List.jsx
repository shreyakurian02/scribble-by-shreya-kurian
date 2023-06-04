import React, { useState } from "react";

import classnames from "classnames";
import EmptyStateImage from "images/EmptyState";
import { Table, NoData } from "neetoui";
import { pluck } from "ramda";
import { useTranslation } from "react-i18next";

import { SINGULAR } from "constants";

import Delete from "./Alert/Delete";
import { MANAGE_DELETE_ALERT_INITIAL_VALUE } from "./constants";
import SubHeader from "./SubHeader";
import { getAllowedColumns, getColumnData } from "./utils";

const List = ({ articlesData, refetchArticles, isArticlesLoading }) => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState(
    pluck("dataIndex", getColumnData())
  );

  const [manageDeleteAlert, setManageDeleteAlert] = useState(
    MANAGE_DELETE_ALERT_INITIAL_VALUE
  );

  const { t } = useTranslation();

  const {
    articles,
    count: { filtered: articlesCount },
  } = articlesData;

  if (articles.length === 0 && !isArticlesLoading) {
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
        loading={isArticlesLoading}
        rowData={articles}
        scroll={{ x: 0 }}
        selectedRowKeys={selectedRowIds}
        columnData={getAllowedColumns({
          filteredColumns,
          setManageDeleteAlert,
        })}
        rowClassName={(_, index) =>
          classnames({ "neeto-ui-bg-gray-200": index % 2 !== 0 })
        }
        onRowSelect={setSelectedRowIds}
      />
      <Delete
        manageDeleteAlert={manageDeleteAlert}
        refetchArticles={refetchArticles}
        onClose={() => setManageDeleteAlert(MANAGE_DELETE_ALERT_INITIAL_VALUE)}
      />
    </>
  );
};

export default List;
