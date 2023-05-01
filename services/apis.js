const BACKEND_ROOT_PROD = import.meta.env.BACKEND_ROOT_PROD;
const BACKEND_ROOT_DEV = import.meta.env.BACKEND_ROOT_DEV;
const BACKEND_ROOT = BACKEND_ROOT_DEV

//會員帳號 - 取得會員資料
export const getAccountInfo = `${BACKEND_ROOT}/account/info-form?uid=644f06e37ca2aa24ddb66e7e`;

//會員帳號 - 修改會員資料
export const updateAccountInfo = `${BACKEND_ROOT}/account/info-form?uid=644f06e37ca2aa24ddb66e7e`;