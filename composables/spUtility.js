export const spUtility = () => {
  //表單檢查共用方法
  const formRules = {
    ruleRequired: (v) => !!v || "必填欄位",
    ruleEmail: (v) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(v) || "請輸入有效的電子信箱";
    },
    rulePhone: (v) => /^09[0-9]{8}$/.test(v) || "請輸入有效的手機號碼",
    rulePassLen: (v) => (!!v && v.length >= 8) || "密碼必須包含至少 8 個字元",
    ruleConfirmPassword: (v, password) =>
      v === password || "確認密碼必須和密碼相同",
  };

  return {
    formRules,
  };
};
