import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Button } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import { DEFAULT_REDIRECTION_VALUE, REDIRECTIONS } from "./constants";
import Delete from "./Delete";
import Form from "./Form";
import Item from "./Item";
import TableHeader from "./TableHeader";

import { SINGULAR } from "../../../../constants";
import Header from "../Header";

const Redirections = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [manageRedirection, setManageRedirection] = useState(
    DEFAULT_REDIRECTION_VALUE
  );

  const { t } = useTranslation();

  const isAddButtonDisabled =
    isAddFormOpen || !isEmpty(manageRedirection.redirection);

  return (
    <div className="flex w-3/4 flex-col space-y-5">
      <Header
        subTitle={t("settings.redirectionsSubtitle")}
        title={t("common.redirections")}
      />
      <div className="neeto-ui-bg-pastel-blue space-y-3 rounded-md p-6">
        <TableHeader />
        <div className="space-y-3">
          {REDIRECTIONS.map(redirection => (
            <Item
              isAddFormOpen={isAddFormOpen}
              key={redirection.id}
              manageRedirection={manageRedirection}
              redirection={redirection}
              setManageRedirection={setManageRedirection}
            />
          ))}
        </div>
        {isAddFormOpen && <Form onClose={() => setIsAddFormOpen(false)} />}
        <Button
          disabled={isAddButtonDisabled}
          icon={Plus}
          iconPosition="left"
          style="link"
          label={t("button.addNewEntity", {
            entity: t("common.redirection", SINGULAR),
          })}
          onClick={() => setIsAddFormOpen(true)}
        />
      </div>
      <Delete
        manageRedirection={manageRedirection}
        onClose={() => setManageRedirection(DEFAULT_REDIRECTION_VALUE)}
      />
    </div>
  );
};

export default Redirections;
