import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import redirectionsApi from "apis/redirections";

import { DEFAULT_REDIRECTION_VALUE } from "./constants";
import Delete from "./Delete";
import List from "./List";

import Header from "../Header";

const Redirections = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [redirections, setRedirections] = useState([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [manageRedirection, setManageRedirection] = useState(
    DEFAULT_REDIRECTION_VALUE
  );

  const fetchRedirections = async () => {
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
    <div className="relative mx-auto my-16 w-3/4 space-y-5">
      <div className="sticky top-0 bg-white py-3">
        <Header
          subtitle={t("settings.redirectionsSubtitle")}
          title={t("common.redirections")}
        />
      </div>
      <List
        isAddFormOpen={isAddFormOpen}
        isLoading={isLoading}
        manageRedirection={manageRedirection}
        redirections={redirections}
        refetchRedirections={fetchRedirections}
        setIsAddFormOpen={setIsAddFormOpen}
        setManageRedirection={setManageRedirection}
      />
      <Delete
        manageRedirection={manageRedirection}
        refetchRedirections={fetchRedirections}
        onClose={() => setManageRedirection(DEFAULT_REDIRECTION_VALUE)}
      />
    </div>
  );
};

export default Redirections;
