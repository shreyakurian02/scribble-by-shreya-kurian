import React, { useState } from "react";

import classnames from "classnames";
import { Pane, Typography } from "neetoui";
import { last } from "ramda";
import { useTranslation } from "react-i18next";

import Version from "./Version";

import { formatDate } from "../utils";

const VersionHistory = ({ isOpen, onClose, article, fetchArticle }) => {
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
  const [selectedVersionId, setSelectedVersionId] = useState("");

  const { t } = useTranslation();

  const { versions = [] } = article;
  const lastVersionId = last(versions)?.id;

  const handleShowVersion = id => {
    if (lastVersionId !== id) {
      setIsVersionModalOpen(true);
      setSelectedVersionId(id);
    }
  };

  return (
    <>
      <Pane isOpen={isOpen} onClose={onClose}>
        <Pane.Header>
          <Typography style="h2">{t("headers.versionHistory")}</Typography>
        </Pane.Header>
        <Pane.Body className="space-y-2">
          {versions?.map(({ id, event, created_at: createdAt }) => (
            <div
              key={id}
              className={classnames(
                "flex w-full cursor-pointer flex-col space-y-1 rounded-sm bg-blue-100 p-3 hover:bg-gray-400",
                {
                  "cursor-not-allowed": lastVersionId === id,
                }
              )}
              onClick={() => handleShowVersion(id)}
            >
              <Typography style="h4" weight="semibold">
                {t("headers.versionEvent", { event })}
              </Typography>
              <Typography style="body3">{formatDate(createdAt)}</Typography>
            </div>
          ))}
        </Pane.Body>
      </Pane>
      <Version
        article={article}
        closeVersionHistory={onClose}
        fetchArticle={fetchArticle}
        isOpen={isVersionModalOpen}
        versionId={selectedVersionId}
        onClose={() => setIsVersionModalOpen(false)}
      />
    </>
  );
};

export default VersionHistory;
