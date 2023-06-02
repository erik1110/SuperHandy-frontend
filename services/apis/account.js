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

//獲得會員基礎評價物件
export const getAccountCommentsStar = (role) =>
  req("GET", `/account/comments/starCounts?role=${role}`, {}, { auth: true });

//獲得會員評價詳情
export const getAccountComments = (query) =>
  req("GET", `/account/comments`, query, { auth: true });
