const { req } = useHttp();

export const getVerifyEmail = (token) =>
  req(
    "GET",
    `/verify-email`,
    {},
    {
      token: token,
    }
  );

export const postResendVerification = (data) =>
  req("POST", "/resend-verification", data);
