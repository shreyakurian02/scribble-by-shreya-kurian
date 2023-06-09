import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Typography, Dropdown, Tooltip } from "neetoui";
import { useTranslation } from "react-i18next";

import { ACTION, DEFAULT_REDIRECTION_VALUE } from "./constants";
import Form from "./Form";

const {
  Menu,
  MenuItem: { Button },
} = Dropdown;

const Item = ({
  redirection,
  isAddFormOpen,
  manageRedirection,
  setManageRedirection,
  refetchRedirections,
}) => {
  const { t } = useTranslation();

  const { from_path: fromPath, to_path: toPath, id = "" } = redirection;
  const {
    redirection: { id: selectedRedirectionId },
  } = manageRedirection;

  if (selectedRedirectionId === id) {
    return (
      <Form
        isEdit
        refetchRedirections={refetchRedirections}
        selectedRedirection={manageRedirection.redirection}
        onClose={() => setManageRedirection(DEFAULT_REDIRECTION_VALUE)}
      />
    );
  }

  return (
    <div className="neeto-ui-bg-white flex justify-between p-5">
      <div className="grid w-full grid-cols-2">
        <Tooltip
          className="break-all"
          content={`${window.location.origin}${fromPath}`}
          position="bottom"
        >
          <Typography className="truncate" style="body1">
            <span className="neeto-ui-text-gray-500">
              {window.location.origin}
            </span>
            {fromPath}
          </Typography>
        </Tooltip>
        <div className="flex justify-between">
          <Tooltip className="break-all" content={toPath} position="bottom">
            <Typography className="truncate" style="body1">
              {toPath}
            </Typography>
          </Tooltip>
          <Dropdown
            buttonStyle="text"
            disabled={isAddFormOpen}
            icon={MenuHorizontal}
          >
            <Menu className="flex flex-col">
              <Button
                onClick={() =>
                  setManageRedirection({ action: ACTION.edit, redirection })
                }
              >
                {t("actions.edit")}
              </Button>
              <Button
                style="danger"
                onClick={() =>
                  setManageRedirection({ action: ACTION.delete, redirection })
                }
              >
                {t("actions.delete")}
              </Button>
            </Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Item;
