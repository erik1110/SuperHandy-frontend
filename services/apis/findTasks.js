const { req } = useHttp();

//取得未媒合之任務列表(列表模式)
export const getListViewTasks = (query) => req("GET", "/find-task/list/query", query);

//取得未媒合之任務列表(地圖模式)
export const getMapViewTasks = (query) => req("GET", "/find-task/map/query", query);

//取得未媒合之任務列表(限時推薦)
export const getTasksHighlight = () => req("GET", `/find-task/highlight`);

//取得任務詳情 (未登入)
export const getTasksDetail = (taskId) => req("GET", `/find-task/detail/${taskId}`);

//取得任務詳情 (已登入)
export const getTasksDetailByAuth = (taskId) => req("GET", `/find-task/detail/${taskId}`, {}, { auth: true });

//我要接案
export const postApplyTask = (taskId) => req("POST", `/find-task/apply/${taskId}`, {}, { auth: true });
