export const REDIRECTIONS = [
  {
    id: 1,
    from_path: "https://scribble.com/welcome",
    to_path: "https://scribble.com/welcome",
  },
  {
    id: 2,
    from_path:
      "https://scribble.com/aboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutabout",
    to_path: "https://ggogle.com",
  },
];

export const ACTION = {
  edit: "edit",
  delete: "delete",
};

export const DEFAULT_REDIRECTION_VALUE = {
  action: ACTION.edit,
  redirection: {},
};
