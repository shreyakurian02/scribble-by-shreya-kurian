import React, { useState, useEffect } from "react";

import FileSaver from "file-saver";
import { Button, Modal, Typography } from "neetoui";
import { Container } from "neetoui/layouts";
import { useTranslation } from "react-i18next";

import reportApi from "apis/articles/report";
import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import ProgressBar from "components/Common/ProgressBar";

const Report = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  const [isReportGenerating, setIsReportGenerating] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(t("messages.generatingReport"));

  const consumer = createConsumer();

  const generatePdf = async () => {
    try {
      await reportApi.generatePdf();
    } catch (error) {
      logger.error(error);
    }
  };

  const downloadPdf = async () => {
    setIsDownloading(true);
    try {
      const { data } = await reportApi.download();
      FileSaver.saveAs(data, "articles-report.pdf");
      onClose();
    } catch (error) {
      logger.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    if (progress === 100) {
      setIsReportGenerating(false);
      setMessage(t("messages.reportReadyToDownload"));
    }
  }, [progress]);

  useEffect(() => {
    subscribeToReportDownloadChannel({
      consumer,
      setMessage,
      setProgress,
      generatePdf,
    });

    return () => {
      consumer.disconnect();
    };
  }, []);

  return (
    <Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Header>
          <Typography style="h2">{t("headers.articlesReport")}</Typography>
        </Modal.Header>
        <Modal.Body className="space-y-2">
          <Typography style="h4">{message}</Typography>
          <ProgressBar progress={progress} />
        </Modal.Body>
        <Modal.Footer className="space-x-2">
          <Button
            disabled={isReportGenerating || isDownloading}
            label={t("button.download")}
            loading={isDownloading}
            onClick={downloadPdf}
          />
          <Button label={t("button.cancel")} style="text" onClick={onClose} />
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Report;
