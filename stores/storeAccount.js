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

  // - 取得會員資料 -
  function getAccount() {
    const _work = "取得會員資料";
    req("GET", getAccountInfoUrl, {}, { auth: true })
      .then((response) => {
        if (response && checkRespStatus(response)) {
          _user.value = response.data;
        }
        logInfo(_work, response);
      })
      .catch((error) => {
        logError(_work, { error });
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
        }
        logInfo(_work, response);
      })
      .catch((error) => {
        logError(_work, { error });
        if (typeof failFun === "function") {
          failFun();
        }
      });
  }

  return {
    user,
    getAccount,
    updateAccount,
  };
});
