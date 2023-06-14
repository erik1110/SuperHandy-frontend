const { req } = useHttp();

//註冊
export const postSignup = (data) => req("POST", "/sign-up", data);
//登入
export const postLogin = (data) => req("POST", "/sign-in", data);
//重設密碼
export const patchResetPassword = (data, token) =>
  req("PATCH", "/forgot-reset-password", data, {
    token: token,
  });
//寄送忘記密碼信件
export const postResetPassword = (data) =>
  req("POST", "/forgot-password", data);
//信箱驗證
export const getVerifyEmail = (token) =>
  req("GET", `/verify-email`, {}, { token: token });
//重寄驗證信
export const postResendVerification = (data) =>
  req("POST", "/resend-verification", data);
//google 登入
export const getGoogleAccount = () => req("GET", "/auth/google");
// google 回傳
export const getGoogleCallback = (queryString) =>
  req("GET", `/auth/google/callback?${queryString}`);
export const postGoogleSignUp = (userId, data) =>
  req("POST", `auth/google/sign-in/${userId}`, data);
