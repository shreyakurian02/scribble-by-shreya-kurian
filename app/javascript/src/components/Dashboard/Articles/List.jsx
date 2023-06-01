import React, { useState } from "react";

import { NoData } from "@bigbinary/neetoui";
import classnames from "classnames";
import EmptyStateImage from "images/EmptyState";
import { Typography, Table } from "neetoui";
import { SubHeader } from "neetoui/layouts";
import { useTranslation } from "react-i18next";

import { SINGULAR } from "constants";

import { buildColumnData } from "./utils";

const List = ({ articles = [] }) => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);

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
        leftActionBlock={
          <Typography component="h4" style="h4">
            {t("common.articleWithCount", { count: articles.length })}
          </Typography>
        }
      />
      <Table
        fixedHeight
        rowSelection
        columnData={buildColumnData()}
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
