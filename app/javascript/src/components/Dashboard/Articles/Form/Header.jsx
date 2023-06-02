import React, { useState } from "react";

import { ActionDropdown, Button } from "neetoui";
import { Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { SUBMIT_OPTIONS } from "./constants";

const {
  Menu,
  MenuItem: { MenuButton },
} = ActionDropdown;

const Header = () => {
  const [status, setStatus] = useState(SUBMIT_OPTIONS.draft);

  const { t } = useTranslation();

  return (
    <div className="flex justify-between px-5">
      <div className="w-64">
        <Select
          className="flex grow-0"
          name="category"
          options={[]}
          placeholder={t("placeholder.searchCategory")}
        />
      </div>
      <div className="space-x-3">
        <Button label={t("button.cancel")} style="secondary" type="reset" />
        <ActionDropdown
          buttonProps={{ type: "submit" }}
          buttonStyle="primary"
          label={
            status === SUBMIT_OPTIONS.draft
              ? t("button.saveAsDraft")
              : t("common.publish")
          }
        >
          <Menu>
            <MenuButton onClick={() => setStatus(SUBMIT_OPTIONS.publish)}>
              {t("common.publish")}
            </MenuButton>
            <MenuButton onClick={() => setStatus(SUBMIT_OPTIONS.draft)}>
              {t("button.saveAsDraft")}
            </MenuButton>
          </Menu>
        </ActionDropdown>
      </div>
    </div>
  );
};

export default Header;
