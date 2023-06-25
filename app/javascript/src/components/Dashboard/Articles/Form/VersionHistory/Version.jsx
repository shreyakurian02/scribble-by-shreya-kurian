import { SINGULAR } from "constants";

import React, { useState, useEffect } from "react";

import { EditorContent } from "neetoeditor";
import { Modal, Typography, Button, Input, Label } from "neetoui";
import { useTranslation } from "react-i18next";

import versionsApi from "apis/articles/versions";

const Version = ({ isOpen, onClose, versionId, article, fetchArticle }) => {
  const [version, setVersion] = useState({});

  const { t } = useTranslation();

  const { category, title, description } = version;
  const { slug: articleSlug } = article;

  const handleVersionRestore = async () => {
    try {
      await versionsApi.restore({ versionId, articleSlug });
      onClose();
      fetchArticle();
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchVersion = async () => {
    try {
      const {
        data: { version },
      } = await versionsApi.show({ versionId, articleSlug });
      setVersion(version);
    } catch (error) {
      logger.error(error);
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
      <Modal.Body className="space-y-2">
        <div className="flex w-full space-x-2">
          <Input disabled label={t("input.articleTitle")} value={title} />
          <Input
            disabled
            label={t("common.category", SINGULAR)}
            value={category}
          />
        </div>
        <Label>{t("labels.content")}</Label>
        <EditorContent
          className="versions_editor_content"
          content={description}
        />
      </Modal.Body>
      <Modal.Footer className="space-x-2">
        <Button label={t("button.restore")} onClick={handleVersionRestore} />
        <Button label={t("button.cancel")} style="text" onClick={onClose} />
      </Modal.Footer>
    </Modal>
  );
};

export default Version;
