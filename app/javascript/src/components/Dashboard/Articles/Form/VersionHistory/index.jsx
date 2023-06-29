import React, { useState } from "react";

import { Pane, Typography, Tooltip } from "neetoui";
import { last } from "ramda";
import { useTranslation } from "react-i18next";

import Block from "./Block";
import Version from "./Version";

const VersionHistory = ({ isOpen, onClose, article, fetchArticle }) => {
  const { t } = useTranslation();

  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
  const [selectedVersionId, setSelectedVersionId] = useState("");

  const { versions = [] } = article;
  const lastVersionId = last(versions)?.id;
  const orderedVersions = [...versions.slice(-1), ...versions.slice(0, -1)];

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
          {orderedVersions?.map(version =>
            version.id === lastVersionId ? (
              <Tooltip
                content={t("errors.sameAsLastVersion")}
                key={version.id}
                position="bottom"
              >
                <div className="mb-3 w-full border-b-4 border-black pb-3">
                  <Block
                    handleShowVersion={handleShowVersion}
                    lastVersionId={lastVersionId}
                    version={version}
                  />
                </div>
              </Tooltip>
            ) : (
              <Block
                handleShowVersion={handleShowVersion}
                key={version.id}
                lastVersionId={lastVersionId}
                version={version}
              />
            )
          )}
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
