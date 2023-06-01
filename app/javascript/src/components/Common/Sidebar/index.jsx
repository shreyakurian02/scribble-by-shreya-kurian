import React from "react";

import { Sidebar as NeetoUISidebar } from "neetoui/layouts";

import { NAV_LINKS, PROFILE_INFO } from "./constants";

const Sidebar = () => (
  <NeetoUISidebar navLinks={NAV_LINKS} profileInfo={PROFILE_INFO} />
);

export default Sidebar;
