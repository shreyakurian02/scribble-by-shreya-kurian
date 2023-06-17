import React, { useState, useEffect } from "react";

import { Typography } from "neetoui";
import { MenuBar, Container } from "neetoui/layouts";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import ErrorPage from "components/Common/ErrorPage";
import { SETTINGS_URL } from "constants/urls";

import {
  DEFAULT_ACTIVE_TAB_KEY,
  MENUBAR_ITEMS,
  TAB_COMPONENTS,
} from "./constants";

const Settings = () => {
  const [activeTab, setActiveTab] = useState(DEFAULT_ACTIVE_TAB_KEY);

  const { t } = useTranslation();
  const history = useHistory();
  const { search } = useLocation();

  const URLParams = new URLSearchParams(search);
  const isTabValid = Object.keys(TAB_COMPONENTS).find(tab => tab === activeTab);

  const handleTabChange = value => {
    URLParams.set("tab", value);
    history.push({ search: URLParams.toString() });
  };

  useEffect(() => {
    setActiveTab(URLParams.get("tab") || DEFAULT_ACTIVE_TAB_KEY);
  }, [search]);

  if (!isTabValid) return <ErrorPage homeUrl={SETTINGS_URL} />;

  return (
    <div className="flex w-full">
      <MenuBar showMenu>
        <Typography style="h2">{t("common.settings")}</Typography>
        {MENUBAR_ITEMS.map(({ label, description, tabKey }) => (
          <MenuBar.Item
            active={activeTab === tabKey}
            description={description}
            key={tabKey}
            label={label}
            onClick={() => handleTabChange(tabKey)}
          />
        ))}
      </MenuBar>
      <Container>{TAB_COMPONENTS[activeTab]}</Container>
    </div>
  );
};

export default Settings;
