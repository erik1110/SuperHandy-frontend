const { req } = useHttp();

//取得點數狀態
export const postLinePayPayment = (data) =>
  req("POST", "/linepay/payment", data, { auth: true });

export const getLinePayConfirm = (transactionId, orderId) =>
  req(
    "GET",
    `/linepay/confirm?transactionId=${transactionId}&orderId=${orderId}`,
    {},
    {
      auth: true,
    }
  );
