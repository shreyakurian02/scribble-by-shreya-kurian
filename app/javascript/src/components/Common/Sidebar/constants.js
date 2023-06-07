import { t } from "i18next";
import { Notes, Settings, ExternalLink } from "neetoicons";

import { PLURAL } from "constants";

export const NAV_LINKS = [
  {
    label: t("common.article", PLURAL),
    to: "/articles",
    icon: Notes,
    description: t("sidebarDescription.articles"),
  },
  {
    label: t("common.settings"),
    to: "/settings",
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
