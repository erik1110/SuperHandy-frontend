const { req } = useHttp();

//取得點數狀態
export const getProfileStatus = () =>
  req("GET", "/account/profile-stats", {}, { auth: true });

//取得會員資料
export const getAccountInfo = () =>
  req("GET", "/account/info-form", {}, { auth: true });

//修改會員資料
export const patchAccountInfo = (data) =>
  req("PATCH", "/account/info-form", data, { auth: true });