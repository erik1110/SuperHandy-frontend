const { req } = useHttp();

//取得點數狀態
export const postLinePayPayment = (data) =>
  req("POST", "/linepay/payment", data, { auth: true });
