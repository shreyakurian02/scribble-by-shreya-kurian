import React from "react";

import { Typography, Modal, Button } from "neetoui";
import { useTranslation, Trans } from "react-i18next";

const UpdateModal = ({
  isOpen,
  onClose,
  modalTitle,
  attribute,
  handleUpdate,
  entity,
  selectedArticlesCount = 1,
}) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Typography style="h2">
          {t("modal.updateTitle", {
            action: modalTitle,
            entity: t("common.article", {
              count: selectedArticlesCount,
            }).toLowerCase(),
          })}
        </Typography>
      </Modal.Header>
      <Modal.Body className="space-y-2">
        <Typography lineHeight="normal" style="body2">
          <Trans
            i18nKey="modal.updateDescription"
            values={{ attribute, attributeValue: modalTitle, entity }}
          />
        </Typography>
      </Modal.Body>
      <Modal.Footer className="space-x-2">
        <Button label={t("button.proceed")} onClick={handleUpdate} />
        <Button label={t("button.cancel")} style="text" onClick={onClose} />
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateModal;
