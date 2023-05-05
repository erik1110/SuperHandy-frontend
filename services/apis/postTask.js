const { req } = useHttp();

// 儲存為草稿
export const postSaveDraft = () => req("POST", "/post-task/save-draft");

// 發布任務資訊
export const postApply = () => req("POST", "/post-task/apply");

// 確認地理資訊正確的API
export const getLocation = () => req("GET", "/post-task/location");

// 取得該頁資訊(草稿頁)
export const getApply = () => req("GET", "/post-task/:taskId");

// 更新草稿、任務
export const putApply = () => req("PUT", "/post-task/:taskId");

// 刪除任務
export const deleteApply = () => req("DELETE", "/post-task/:taskId");
