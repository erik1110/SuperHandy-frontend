const { req } = useHttp();

export const postResetPassword = (data) =>
  req("POST", "/forgot-password", data);
