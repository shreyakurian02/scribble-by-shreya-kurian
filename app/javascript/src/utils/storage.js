const setToSessionStorage = ({ key, value }) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

const getFromSessionStorage = key => {
  let response = "";
  try {
    const value = sessionStorage.getItem(key);
    response = value ? JSON.parse(value) : "";
  } catch (error) {
    logger.error(error);
    response = "";
  }

  return response;
};

export { setToSessionStorage, getFromSessionStorage };
