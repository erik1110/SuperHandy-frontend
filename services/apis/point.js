const { req } = useHttp();

export const getAccountPoints = () =>
  req("GET", `/account/points`, {}, { auth: true });

export const getAccountPointsHistory = () =>
  req("GET", `/account/points/history`, {}, { auth: true });

export const postPointspurchase = (data) =>
  req("POST", `/account/points/purchase`, data, { auth: true });
