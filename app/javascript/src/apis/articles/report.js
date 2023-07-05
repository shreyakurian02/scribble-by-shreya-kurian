import axios from "axios";

import { ARTICLES_BASE_URL } from "constants/routes";

const generatePdf = () => axios.post(`${ARTICLES_BASE_URL}/report`);

const download = () =>
  axios.get(`${ARTICLES_BASE_URL}/report/download`, { responseType: "blob" });

const reportApi = { generatePdf, download };

export default reportApi;
