import React, { useState } from "react";

import classnames from "classnames";
import { Table, Typography, Button } from "neetoui";
import { Header, Container, SubHeader } from "neetoui/layouts";
import { useTranslation } from "react-i18next";

import { DEFAULT_PAGE_PROPERTIES } from "components/Dashboard/constants";
import { useFetchArticles } from "hooks/reactQuery/useArticlesApi";

import { COLUMN_DATA, SORT_ORDER } from "./constants";
import Report from "./Report";

const Analytics = () => {
  const { t } = useTranslation();

  const [sortOrder, setSortOrder] = useState(SORT_ORDER.descend);
  const [pageProperties, setPageProperties] = useState(DEFAULT_PAGE_PROPERTIES);
  const [isDownloadReportModalOpen, setIsDownloadReportModalOpen] =
    useState(false);

  const {
    isLoading,
    data: { articles, articles_count: { all: articlesCount } = {} } = {},
  } = useFetchArticles({
    order_by: "views",
    sort_order: sortOrder,
    per_page: pageSize,
    page_number: currentPageNumber,
  });

  const { size: pageSize, page: currentPageNumber } = pageProperties;

  const handleSort = ({ order }) =>
    setSortOrder(order === "descend" ? SORT_ORDER.descend : SORT_ORDER.ascend);

  return (
    <Container>
      <Header title={t("common.analytics")} />
      <SubHeader
        leftActionBlock={
          <Typography style="h4">
            {t("common.articleWithCount", { count: articlesCount })}
          </Typography>
        }
        rightActionBlock={
          <Button
            label={t("button.download")}
            onClick={() => setIsDownloadReportModalOpen(true)}
          />
        }
      />
      <Table
        fixedHeight
        columnData={COLUMN_DATA}
        currentPageNumber={currentPageNumber}
        defaultPageSize={pageSize}
        handlePageChange={(page, size) => setPageProperties({ page, size })}
        loading={isLoading}
        rowData={articles}
        shouldDynamicallyRenderRowSize={false}
        totalCount={articlesCount}
        rowClassName={(_, index) =>
          classnames({ "neeto-ui-bg-gray-200": index % 2 !== 0 })
        }
        onChange={(_, __, sorter) => handleSort(sorter)}
      />
      {isDownloadReportModalOpen && (
        <Report
          isOpen={isDownloadReportModalOpen}
          onClose={() => setIsDownloadReportModalOpen(false)}
        />
      )}
    </Container>
  );
};

export default Analytics;
