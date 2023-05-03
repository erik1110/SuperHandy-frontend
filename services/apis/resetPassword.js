const { req } = useHttp();

export const patchResetPassword = (data, token) =>
  req("PATCH", "/forgot-reset-password", data, {
    token: token,
  });
