import { t } from "i18next";
import { Notes, Settings, ExternalLink } from "neetoicons";

import { PLURAL } from "constants";

export const NAV_LINKS = [
  {
    label: t("common.article", PLURAL),
    to: "/",
    icon: Notes,
  },
  {
    label: t("common.settings"),
    to: "/settings",
    icon: Settings,
  },
  {
    label: t("common.preview"),
    to: "/preview",
    icon: ExternalLink,
  },
];

export const PROFILE_INFO = {
  name: "Oliver Smith",
  imageUrl: "https://i.pravatar.cc/40",
  email: "oliver@example.com",
};
