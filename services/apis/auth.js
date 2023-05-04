const { req } = useHttp();

//註冊
export const postSignup = (data) => req("POST", "/sign-up", data);
//登入
export const postLogin = (data) => req("POST", "/sign-in", data);
