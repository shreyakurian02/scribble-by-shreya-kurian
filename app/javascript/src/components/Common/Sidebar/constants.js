import { t } from "i18next";
import { Notes, Settings, ExternalLink } from "neetoicons";

import { PLURAL, ARTICLES_URL, SETTINGS_URL } from "constants";

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
    to: "/preview",
    icon: ExternalLink,
    description: t("sidebarDescription.preview"),
  },
];

export const PROFILE_INFO = {
  name: "Oliver Smith",
  imageUrl: "https://i.pravatar.cc/40",
  email: "oliver@example.com",
};
