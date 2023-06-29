const setToLocalStorage = ({ key, value }) =>
  localStorage.setItem(key, JSON.stringify(value));

const getFromLocalStorage = key => {
  let response = "";
  try {
    const value = localStorage.getItem(key);
    response = value ? JSON.parse(value) : "";
  } catch (error) {
    logger.error(error);
    response = "";
  }

  return response;
};

export { setToLocalStorage, getFromLocalStorage };
