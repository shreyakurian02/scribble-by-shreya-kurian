import dayjs from "dayjs";

export const buildInitialValues = ({
  title,
  description,
  category: { name, id },
}) => ({
  title,
  description,
  category: { label: name, value: id },
});

export const formatDate = date => dayjs(date).format("hh:mm A, DD MMMM YYYY");

export const titlize = ([firstLetter, ...rest]) =>
  firstLetter.toUpperCase() + rest.join("");
