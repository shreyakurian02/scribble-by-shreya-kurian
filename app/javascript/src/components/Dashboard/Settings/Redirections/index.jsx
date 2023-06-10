import React, { useEffect, useState } from "react";

import { Plus } from "neetoicons";
import { Button } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import redirectionsApi from "apis/redirections";
import { SINGULAR } from "constants";

import { DEFAULT_REDIRECTION_VALUE } from "./constants";
import Delete from "./Delete";
import Form from "./Form";
import Item from "./Item";
import TableHeader from "./TableHeader";

import Header from "../Header";

const Redirections = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [redirections, setRedirections] = useState([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [manageRedirection, setManageRedirection] = useState(
    DEFAULT_REDIRECTION_VALUE
  );

  const { t } = useTranslation();

  const isAddButtonDisabled =
    isAddFormOpen || !isEmpty(manageRedirection.redirection);

  const fetchRedirections = async () => {
    setIsLoading(true);
    try {
      const {
        data: { redirections },
      } = await redirectionsApi.fetch();
      setRedirections(redirections);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRedirections();
  }, []);

  return (
    <div className="mx-auto w-3/4 space-y-5 py-16">
      <div className="fixed top-0 z-10 w-full bg-white pb-3 pt-16">
        <Header
          subtitle={t("settings.redirectionsSubtitle")}
          title={t("common.redirections")}
        />
      </div>
      <div className="neeto-ui-bg-pastel-blue space-y-3 rounded-md px-6 pb-6 pt-16">
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
                  refetchRedirections={fetchRedirections}
                  setManageRedirection={setManageRedirection}
                />
              ))}
            </div>
          </>
        )}
        {isAddFormOpen && (
          <Form
            refetchRedirections={fetchRedirections}
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
            entity: t("common.redirection", SINGULAR),
          })}
          onClick={() => setIsAddFormOpen(true)}
        />
      </div>
      <Delete
        manageRedirection={manageRedirection}
        refetchRedirections={fetchRedirections}
        onClose={() => setManageRedirection(DEFAULT_REDIRECTION_VALUE)}
      />
    </div>
  );
};

export default Redirections;
