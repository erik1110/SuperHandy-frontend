import { defineStore } from "pinia";
import {
  getAccountInfoUrl,
  patchAccountInfoUrl,
} from "@/services/apis/account";
const { req, checkRespStatus } = useHttp();
const { logInfo, logError } = useLog();

export const storeAccount = defineStore("storeAccount", () => {
  const _user = ref({
    email: "",
    address: "",
    avatarPath: "",
    firstName: "",
    helperIntro: "",
    lastName: "",
    nickname: "",
    phone: "",
    posterIntro: "",
    helperSkills: [],
  });
  const user = computed({
    get() {
      return _user.value;
    },
  });

  // const accountLoading = ref(true);
  // const setAccountLoading = (value) => {
  //   accountLoading.value = value;
  // };

  // - 取得會員資料 -
  function getAccount(successFun) {
    const _work = "取得會員資料";
    //setAccountLoading(true);
    req("GET", getAccountInfoUrl, {}, { auth: true })
      .then((response) => {
        if (response && checkRespStatus(response)) {
          _user.value = response.data;
          if (typeof successFun === "function") {
            successFun();
          }
        }
        logInfo(_work, response);
      })
      .catch((error) => {
        logError(_work, { error });
      })
      .finally(() => {
        //setAccountLoading(false);
      });
  }

  // - 更新會員資料 -
  function updateAccount(data, successFun, failFun) {
    const _work = "更新會員資料";
    req("PATCH", patchAccountInfoUrl, data, { auth: true })
      .then((response) => {
        if (response && checkRespStatus(response)) {
          if (typeof successFun === "function") {
            successFun();
          }
        } else {
          if (typeof failFun === "function") {
            failFun(response?.message);
          }
        }
        logInfo(_work, response);
      })
      .catch((error) => {
        logError(_work, { error });
      });
  }

  return {
    user,
    getAccount,
    updateAccount,
    // accountLoading,
  };
});
