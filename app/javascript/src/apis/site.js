import axios from "axios";

// import { SITE_BASE_URL } from "constants";

const show = () => axios.get(`api/v1/site`);

const update = payload => axios.put(`api/v1/site`, { site: payload });

const siteApi = { show, update };

export default siteApi;
