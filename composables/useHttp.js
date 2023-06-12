import { storeGlobal } from "@/stores/storeGlobal";
import { storeAuth } from "@/stores/storeAuth";

const { VITE_BACKEND_ROOT_DEV, VITE_BACKEND_ROOT_PROD } = import.meta.env;
export const useHttp = () => {
  const _fetch = async function (url, options) {
    await nextTick();
    const { data, pending, error, refresh } = await useFetch(url, {
      baseURL: VITE_BACKEND_ROOT_DEV,
      ...options,
      onRequest({ request, options }) {
        options.headers = options.headers || {};
        //把快取關掉
        //options.initialCache = false;
        //Header攜帶token回後端
        if (options.auth) {
          let spToken = useCookie("spToken");
          options.headers.authorization = `Bearer ${spToken.value}`;
        }
        if (options.token) {
          options.headers.authorization = `Bearer ${options.token}`;
        }
      },
      onRequestError({ request, options, error }) {
        console.log(error, "onRequestError");
      },
      onResponse({ request, response, options }) {
        //console.log(response, "onResponse");
        return response._data;
      },
      onResponseError({ request, options, response }) {
        const _storeGlobal = storeGlobal();
        const _storeAuth = storeAuth();
        if (
          response._data.error.name == "40300" ||
          response._data.error.name == "40200"
        ) {
          _storeGlobal.confirmHandler({
            open: true,
            title: "系統通知",
            content: "請重新登入，謝謝。",
            closeHandle: function () {
              _storeAuth.setLoginToken("");
              navigateTo("/auth/login");
            },
          });
        } else if (response._data.error.name == "40302") {
          navigateTo("/");
        }
        console.log(response, "onResponseError");
      },
    });

    // console.log(unref(data), "fetch.data");
    // console.log(error, "fetch.error");

    if (error && error?.value?.data) {
      return error.value.data;
    }
    return unref(data);
  };

  //Form
  const spPostForm = function (url, formDate) {
    return _fetch(url, {
      headers: { "Content-Type": "multipart/form-data" },
      method: "POST",
      body: formDate,
    });
  };

  const req = function (method, url, data, config) {
    // console.log();
    method = method.toUpperCase();
    let options = { method, ...config };
    switch (method) {
      case "GET":
        options = {
          params: data,
          ...options,
        };
        return _fetch(url, options);
      case "POST":
      case "PATCH":
      case "PUT":
        options = {
          body: data,
          ...options,
        };
        return _fetch(url, options);
      case "DELETE":
        options = {
          params: data,
          ...options,
        };
        return _fetch(url, options);
      default:
        console.log(`未知的method : ${method}`);
        return false;
    }
  };

  const checkRespStatus = (res) => {
    const _status = {
      false: "false",
      success: "success",
    };
    const _check = () => {
      if (res && res["status"]) {
        if (res["status"] === _status.success) {
          return true;
        }
      }
      return false;
    };

    return _check();
  };

  return {
    spPostForm,
    req,
    checkRespStatus,
  };
};
