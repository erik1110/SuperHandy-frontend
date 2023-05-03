const pattern = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phone: /^09[0-9]{8}$/,
};

export const useFormUtil = () => {
  //表單檢查共用方法
  const ruleRequired = (v) => !!v || "必填欄位";
  const ruleEmail = (v) => pattern.email.test(v) || "Email格式不正確";
  const rulePassLen = (v) =>
    (!!v && v.length >= 8) || "密碼必須包含至少 8 個字元";
  const rulePhone = (v) => pattern.phone.test(v) || "請輸入有效的手機號碼";
  const ruleConfirmPassword = (v, password) =>
    v === password || "確認密碼必須和密碼相同";
  const ruleAddress = (v) => (!!v && v.indexOf("號") != -1) || "地址填寫不完整";
  const validateFormResult = async function (form) {
    let result = false;
    if (!form) return result;
    await form.value
      .validate()
      .then((res) => {
        if (res.valid) {
          result = true;
        }
      })
      .catch((err) => {
        result = false;
      });
    return result;
  };

  return {
    ruleRequired,
    ruleEmail,
    rulePassLen,
    rulePhone,
    ruleConfirmPassword,
    ruleAddress,
    validateFormResult,
  };
};
