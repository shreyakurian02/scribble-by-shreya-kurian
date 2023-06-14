import { PLURAL } from "constants";

import { t } from "i18next";
import { Notes, Settings, ExternalLink } from "neetoicons";

import { ARTICLES_URL, SETTINGS_URL, PREVIEW_URL } from "constants/urls";

export const NAV_LINKS = [
  {
    label: t("common.article", PLURAL),
    to: ARTICLES_URL,
    icon: Notes,
    description: t("sidebarDescription.articles"),
  },
  {
    label: t("common.settings"),
    to: SETTINGS_URL,
    icon: Settings,
    description: t("sidebarDescription.settings"),
  },
  {
    label: t("common.preview"),
    to: "#",
    onClick: () => window.open(PREVIEW_URL),
    isActive: () => false,
    icon: ExternalLink,
    description: t("sidebarDescription.preview"),
  },
];

export const PROFILE_INFO = {
  name: "Oliver Smith",
  imageUrl: "https://i.pravatar.cc/40",
  email: "oliver@example.com",
};
