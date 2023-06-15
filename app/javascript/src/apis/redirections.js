import axios from "axios";

import { REDIRECTIONS_BASE_URL } from "constants/routes";

const fetch = () => axios.get(REDIRECTIONS_BASE_URL);

const create = payload =>
  axios.post(REDIRECTIONS_BASE_URL, { redirection: payload });

const update = ({ id, payload }) =>
  axios.put(`${REDIRECTIONS_BASE_URL}/${id}`, { redirection: payload });

const destroy = id => axios.delete(`${REDIRECTIONS_BASE_URL}/${id}`);

const redirectionsApi = {
  fetch,
  create,
  update,
  destroy,
};

export default redirectionsApi;
