const { req } = useHttp();

//取得服務類別
export const getCategories = () => req("GET", "/general/categories");

// 取得曝光方案
//export const getExposurePlanUrl = `/general/exposure-plan`;
