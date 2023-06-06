const { req } = useHttp();
import { postTaskConfig } from "../postTaskConfig";

// 檢查地址
export const getLocation = (data) =>
  req("GET", "/post-task/check-location", data, { auth: true });

// 儲存為草稿
export const postDraft = (data) =>
  req("POST", "/post-task/draft", data, { auth: true });

// 直接刊登任務
export const postPublish = (data) =>
  req("POST", "/post-task/publish", data, { auth: true });

// 從草稿刊登任務
export const postPublishFromDraft = (taskId, data) =>
  req("POST", `/post-task/draft/${taskId}`, data, { auth: true });

// 取得草稿byTaskId
export const getDraftById = (taskId) =>
  req("GET", `/post-task/draft/${taskId}`, {}, { auth: true });

// 刪除草稿byTaskId
export const deleteDraftById = (taskId) =>
  req("DELETE", `/post-task/draft/${taskId}`, {}, { auth: true });

// 更新草稿byTaskId
export const putDraftById = (taskId, data) =>
  req("PUT", `/post-task/draft/${taskId}`, data, { auth: true });

//下架任務
export const postTaskUnpublish = (taskId) =>
  req("POST", `/post-task/unpublish/${taskId}`, {}, { auth: true });

//上架任務
export const postTaskPublish = (taskId) =>
  req("POST", `/post-task/republish/${taskId}`, {}, { auth: true });

//編輯(儲存)下架任務
export const postTaskEdit = (taskId, data) =>
  req("POST", `/post-task/edit/${taskId}`, data, { auth: true });

// 取得已發布的任務
export const getTasksById = (taskId, data) =>
  req("GET", `/tasks/management/${taskId}`, data, { auth: true });

export const executeFetchData = async (submitter, data, taskId) => {
  switch (submitter) {
    case postTaskConfig.taskSubmitter.draftAdd:
      return await postDraft(data);

    case postTaskConfig.taskSubmitter.draftUpdate:
      return await putDraftById(taskId, data);

    case postTaskConfig.taskSubmitter.published:
      return await postPublish(data);

    case postTaskConfig.taskSubmitter.publishFromDraft:
      return await postPublishFromDraft(taskId, data);

    case postTaskConfig.taskSubmitter.unpublished:
      return await postPostTaskEdit(taskId, data);

    default:
      break;
  }
};
