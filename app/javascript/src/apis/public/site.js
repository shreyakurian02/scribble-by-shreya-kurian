import axios from "axios";

import { PUBLIC_SITE_BASE_URL } from "constants/routes";

const show = () => axios.get(PUBLIC_SITE_BASE_URL);

const siteApi = { show };

export default siteApi;
