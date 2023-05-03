import { defineStore } from "pinia";
import {
  getAccountInfoUrl,
  updateAccountInfoUrl,
} from "@/services/apis/account";
const { req } = useHttp();

export const storeAccount = defineStore("storeAccount", () => {
  const _user = ref({
    email: "",
    address: "",
    avatarPath: "",
    firstName: "",
    helperIntro: "",
    lastName: "",
    nickName: "",
    phone: "",
    posterIntro: "",
    helperSpecialities: [],
  });
  const user = computed({
    get() {
      return _user.value;
    },
  });

  //取得會員資料
  function getAccount() {
    req("GET", getAccountInfoUrl)
      .then((response) => {
        //console.log(response, "respaonse");
        if (!response || !response?.userInfoForm) {
          alert("取得會員資料失敗");
          return;
        }

        const userInfoForm = response.userInfoForm;
        Object.keys(_user.value).forEach((key) => {
          const value = userInfoForm[key];
          if (value) {
            _user.value[key] = value;
          }
        });
      })
      .catch((error) => {
        console.log(error);
        alert("取得會員資料失敗");
      });
  }

  //更新會員資料
  function updateAccount(data, successFun, failFun) {
    req("PATCH", updateAccountInfoUrl, data)
      .then((response) => {
        if (typeof successFun === "function") {
          successFun();
        }
      })
      .catch((error) => {
        console.log({ error });
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
