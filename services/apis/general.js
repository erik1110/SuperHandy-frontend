const { req } = useHttp();

//取得服務類別
export const getCategories = () => req("GET", "/general/categories");

// 取得曝光方案
export const getExposurePlan = () => req("GET", "/general/exposure-plan");

//上傳圖片
export const postUploadImage = (form) =>
  req("POST", "/general/upload-image", form, {
    auth: true,
  });
