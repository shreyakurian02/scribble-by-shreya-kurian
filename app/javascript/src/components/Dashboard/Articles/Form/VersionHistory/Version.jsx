import React, { useState, useEffect } from "react";

import { EditorContent } from "neetoeditor";
import { Warning } from "neetoicons";
import {
  Modal,
  Typography,
  Button,
  Input,
  Label,
  Callout,
  Spinner,
} from "neetoui";
import { isNil } from "ramda";
import { useTranslation } from "react-i18next";
import { SINGULAR } from "src/constants";

import versionsApi from "apis/articles/versions";

const Version = ({ isOpen, onClose, versionId, article, fetchArticle }) => {
  const [version, setVersion] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRestoring, setIsRestoring] = useState(false);

  const { t } = useTranslation();

  const { id: articleId } = article;
  const {
    version_category: versionCategory,
    article_category: articleCategory,
    title,
    description,
  } = version;

  const handleVersionRestore = async () => {
    setIsRestoring(true);
    try {
      await versionsApi.restore({ versionId, articleId });
      onClose();
      fetchArticle();
    } catch (error) {
      logger.error(error);
    } finally {
      setIsRestoring(false);
    }
  };

  const fetchVersion = async () => {
    setIsLoading(true);
    try {
      const {
        data: { version },
      } = await versionsApi.show({ versionId, articleId });
      setVersion(version);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (versionId) fetchVersion();
  }, [versionId]);

  return (
    <Modal isOpen={isOpen} size="large" onClose={onClose}>
      <Modal.Header description={t("headers.versionHistoryDescription")}>
        <Typography style="h2">{t("headers.versionHistory")}</Typography>
      </Modal.Header>
      {isLoading ? (
        <div className="flex h-20 w-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <Modal.Body className="space-y-2">
          {isNil(versionCategory) && (
            <Callout icon={Warning} style="warning">
              {t("errors.versionRestore")}
            </Callout>
          )}
          <div className="flex w-full space-x-2">
            <Input disabled label={t("input.articleTitle")} value={title} />
            <Input
              disabled
              label={t("common.category", SINGULAR)}
              value={versionCategory ?? articleCategory}
            />
          </div>
          <Label>{t("labels.content")}</Label>
          <EditorContent
            className="versions_editor_content"
            content={description}
          />
        </Modal.Body>
      )}
      <Modal.Footer className="space-x-2">
        <Button
          disabled={isRestoring}
          label={t("button.restore")}
          loading={isRestoring}
          onClick={handleVersionRestore}
        />
        <Button label={t("button.cancel")} style="text" onClick={onClose} />
      </Modal.Footer>
    </Modal>
  );
};

export default Version;
