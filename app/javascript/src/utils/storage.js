const setToSessionStorage = ({ authToken }) => {
  sessionStorage.setItem("authToken", JSON.stringify(authToken));
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
