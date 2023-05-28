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

//案主確認幫手人選
export const postTasksManagementHelper = (taskId, helperId) =>
  req(
    "POST",
    `tasks/management/confirm-helper/${taskId}/${helperId}`,
    {},
    { auth: true }
  );

//幫手繳交驗收內容
export const postTasksManagementHelperAccept = (taskId, data) =>
  req("POST", `tasks/management/upload-acceptance/${taskId}`, data, {
    auth: true,
  });

//案主確認驗收內容
export const postTasksManagementPosterAccpet = (taskId) =>
  req(
    "POST",
    `/tasks/management/confirm-acceptance/${taskId}`,
    {},
    { auth: true }
  );
