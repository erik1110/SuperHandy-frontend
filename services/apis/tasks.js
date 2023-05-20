const { req } = useHttp();

//取得案主歷史
export const getTasksPosterManagement = () =>
  req("GET", "/tasks/management/poster", {}, { auth: true });

//取得幫手歷史
export const getTasksHelperManagement = () =>
  req("GET", "/tasks/management/helper", {}, { auth: true });

//取得任務詳情
export const getTasksManagementDetail = (taskId) =>
  req("GET", `tasks/management/${taskId}`, {}, { auth: true });
