const pattern = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phone: /^09[0-9]{8}$/,
  positiveInteger: /^([1-9]\d*|[0]{1,1})$/, //含0的正整數
};

export const useFormUtil = () => {
  //表單檢查共用方法
  const ruleRequired = (v) => !!v || "必填欄位";
  const ruleEmail = (v) => !v ||pattern.email.test(v) || "Email格式不正確";
  const rulePassLen = (v) =>
    (!!v && v.length >= 8) || "密碼必須包含至少 8 個字元";
  const rulePhone = (v) => !v ||pattern.phone.test(v) || "請輸入有效的手機號碼";
  const ruleConfirmPassword = (v, password) =>
    v === password || "確認密碼必須和密碼相同";
  const ruleAddress = (v) =>
    //(!!v && v.length > 2 && v.indexOf("號") != -1) || "地址填寫不完整";
    (!!v && v.length > 0) || "地址填寫不完整";
  const validateFormResult = async function (form) {
    let result = false;
    if (!form.value) return result;
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

  //現金兌換驗證
  const ruleBankAcctLen = (v) =>
    (!!v && v.length == 14) || "請輸入銀行號碼 14 碼";
  const rulePointExchange = (v) =>
    (!!v && v >= 300) || "單次兌換最少需要 300 點超人幣";

  //註冊表單驗證
  const formRules = () => {
    const _counter = [10, 50, 100, 200, 1000];
    const _hint = "最多輸入{_counter}個字元";
    const _error = "只能輸入{_counter}個字元喔!";
    function _replace(text, counter) {
      const result = text.replace("{_counter}", counter);
      return result;
    }
    return {
      name: {
        counter: _counter[0],
        hint: _replace(_hint, _counter[0]),
        rule: [
          (v) => !v || v.length <= 10|| _replace(_error, _counter[0]),
        ],
      },
      nickname: {
        counter: _counter[1],
        hint: _replace(_hint, _counter[1]),
        rule: [
          //ruleRequired,
          (v) => !v || v.length <= _counter[1] || _replace(_error, _counter[1]),
        ],
      },
      address: {
        counter: _counter[2],
        hint: _replace(_hint, _counter[2]),
        rule: [
          //ruleRequired,
          (v) =>
          !v || v.length <= _counter[2] || _replace(_error, _counter[2]),
          ruleAddress,
        ],
      },
      intro: {
        counter: _counter[3],
        hint: _replace(_hint, _counter[3]),
        rule: [
          (v) => !v || v.length <= _counter[3] || _replace(_error, _counter[3]),
        ],
      },
      taskTitle: {
        counter: _counter[1],
        hint: _replace(_hint, _counter[1]),
        rule: [
          ruleRequired,
          (v) => !v || v.length <= _counter[1] || _replace(_error, _counter[1]),
        ],
      },
      taskDescription: {
        counter: _counter[4],
        hint: _replace(_hint, _counter[4]),
        rule: [
          (v) => !v || v.length <= _counter[4] || _replace(_error, _counter[4]),
        ],
      },
      taskSalary:{
        rule: [
          (v) => pattern.positiveInteger.test(v) || "金額輸入不正確",
          (v) => v >= 10 || "最少需要 10 點超人幣",
          'checkUserCoin'
        ],
      },
    };
  };

  const isNumber = n => (typeof (n) === 'number' || n instanceof Number );

  return {
    ruleRequired,
    ruleEmail,
    rulePassLen,
    ruleBankAcctLen,
    rulePointExchange,
    rulePhone,
    ruleConfirmPassword,
    ruleAddress,
    validateFormResult,
    formRules,
    isNumber
  };
};
