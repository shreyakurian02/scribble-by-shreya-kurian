import axios from "axios";

import { SITE_BASE_URL } from "constants/routes";

const show = () => axios.get(SITE_BASE_URL);

const update = payload => axios.put(SITE_BASE_URL, { site: payload });

const siteApi = { show, update };

export default siteApi;
