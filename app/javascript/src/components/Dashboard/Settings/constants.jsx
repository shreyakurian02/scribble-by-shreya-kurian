import React from "react";

import { t } from "i18next";

import General from "./General";
import ManageCategories from "./ManageCategories";
import Redirections from "./Redirections";
import Security from "./Security";

export const DEFAULT_ACTIVE_TAB_KEY = "general";

export const MENUBAR_ITEMS = [
  {
    label: t("menubar.general"),
    description: t("menubar.generalDescription"),
    tabKey: "general",
  },
  {
    label: t("menubar.redirections"),
    description: t("menubar.redirectionsDescription"),
    tabKey: "redirections",
  },
  {
    label: t("menubar.security"),
    description: t("menubar.securityDescription"),
    tabKey: "security",
  },
  {
    label: t("menubar.manageCategories"),
    description: t("menubar.manageCategoriesDescription"),
    tabKey: "manage-categories",
  },
];

export const TAB_COMPONENTS = {
  general: <General />,
  redirections: <Redirections />,
  security: <Security />,
  "manage-categories": <ManageCategories />,
};
