
export const useHttp = () => {
  const _fetch = async function (url, options) {
    await nextTick();
    const { data, pending, error, refresh } = await useFetch(url, {
      ...options,
      onRequest ({ request, options }) {
        //把快取關掉
        //options.initialCache = false;

        //Header攜帶token回後端
        //.....

      },
      onRequestError ({ request, options, error }) {
        console.log(error, "onRequestError");
      },
      onResponse ({ request, response, options }) {
        //console.log(response, "onResponse");
        return response._data;
      },
      onResponseError ({ request, options, response }) {
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

  //GET
  const spGet = function (url, params) {
    if (!params) {
      return _fetch(url, { method: "GET" });
    } else {
      return _fetch(url, { method: "GET", params: params });
    }
  };

  //POST
  const spPost = function (url, body) {
    if (!body) {
      return _fetch(url, { method: "POST" });
    } else {
      return _fetch(url, { method: "POST", body: body });
    }
  };

  //DELETE
  const spDelete = function (url) {
    return _fetch(url, { method: "DELETE" });
  };

  //PUT
  const spPut = function (url, body) {
    if (!body) {
      return _fetch(url, { method: "PUT" });
    } else {
      return _fetch(url, { method: "PUT", body: body });
    }
  };

  //PATCH
  const spPatch = function (url, body) {
    if (!body) {
      return _fetch(url, { method: "PATCH" });
    } else {
      return _fetch(url, { method: "PATCH", body: body });
    }
  };

  //Form
  const spPostForm = function (url, formDate) {
    return _fetch(url, {
      headers: { "Content-Type": "multipart/form-data" },
      method: "POST",
      body: formDate,
    });
  };

  return {
    spGet,
    spPost,
    spDelete,
    spPut,
    spPatch,
    spPostForm,
  };
};