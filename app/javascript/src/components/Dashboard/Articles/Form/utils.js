import dayjs from "dayjs";

export const buildInitialValues = ({
  title,
  description,
  category: { name: cartegoryName, id: cartegoryId },
}) => ({
  title,
  description,
  category: { label: cartegoryName, value: cartegoryId },
});

export const formatDate = date => dayjs(date).format("hh:mm A, DD MMMM YYYY");

export const titlize = ([firstLetter, ...rest]) =>
  firstLetter.toUpperCase() + rest.join("");
