import { SINGULAR } from "constants";

import React from "react";

import { Plus } from "neetoicons";
import { Button, Spinner } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import Form from "./Form";
import Item from "./Item";
import TableHeader from "./TableHeader";

const List = ({
  isLoading,
  redirections,
  isAddFormOpen,
  setIsAddFormOpen,
  manageRedirection,
  refetchRedirections,
  setManageRedirection,
}) => {
  const { t } = useTranslation();

  const isAddButtonDisabled =
    isAddFormOpen || !isEmpty(manageRedirection.redirection);

  return (
    <div className="neeto-ui-bg-pastel-blue space-y-3 rounded-md px-6 pb-6 pt-10">
      {isLoading && (
        <div className="flex w-full items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && !isEmpty(redirections) && (
        <>
          <TableHeader />
          <div className="max-h-3/4 space-y-3 overflow-y-auto">
            {redirections?.map(redirection => (
              <Item
                isAddFormOpen={isAddFormOpen}
                key={redirection.id}
                manageRedirection={manageRedirection}
                redirection={redirection}
                refetchRedirections={refetchRedirections}
                setManageRedirection={setManageRedirection}
              />
            ))}
          </div>
        </>
      )}
      {isAddFormOpen && (
        <Form
          refetchRedirections={refetchRedirections}
          onClose={() => setIsAddFormOpen(false)}
        />
      )}
      <Button
        className="flex pt-3"
        disabled={isAddButtonDisabled}
        icon={Plus}
        iconPosition="left"
        style="link"
        label={t("button.addNewEntity", {
          entity: t("common.redirection", SINGULAR).toLowerCase(),
        })}
        onClick={() => setIsAddFormOpen(true)}
      />
    </div>
  );
};

export default List;
