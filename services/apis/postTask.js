const { req } = useHttp();

// 檢查地址
export const getLocation = (data) => req("GET", "/post-task/check-location",data,{ auth: true });

// 儲存草稿
export const postDraft = (data) => req("POST", "/post-task/draft",data,{ auth: true });

// 發布任務
export const postPublish = (data) => req("POST", "/post-task/publish",data,{ auth: true });



