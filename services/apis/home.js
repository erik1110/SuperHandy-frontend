const { req } = useHttp_v2();
// 不需登入的API
export const getCompletedCases = () => req("GET", `/home/completed-cases`);

// 一次性token
// export const getCompletedCases = () =>
//   req("PATCH", `/verify-email`, {}, { token: "hello" });

// 需登入的API
// getCompletedCases = () =>
//   req("POST", `/verify-email`, {}, { auth: true });
