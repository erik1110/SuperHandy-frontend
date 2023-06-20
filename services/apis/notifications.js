const { req } = useHttp();


// 取得通知清單
export const getList = () => req("GET", "/notifications/list",{}, { auth: true });

// 將通知改為已讀
export const patchRead = (id) => req("PATCH", `/notifications/read/${id}`,{}, { auth: true });

// 將通知改為全部已讀
export const patchReadALL = () => req("PATCH", "/notifications/all-read",{}, { auth: true });