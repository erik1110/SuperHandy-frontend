const { logDebug, logError } = useLog()


export const useSpUtility = () => {
  const isNumber = n => (typeof (n) === 'number' || n instanceof Number);
  const checkIsLogin = () => useCookie("spToken").value?.length > 0 ? true : false
  const checkTaskId = taskId => taskId && taskId.length == 24 ? true : false
  const checkUploadImage = (fileSize, maxSize) => fileSize > maxSize ? false : true
  const checkIsFunc = (func) => (func && typeof func === 'function') ? true : false
  const checkRespStatus = res => {
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
  }
  const getTaskId = () => {
    const route = useRoute();
    const taskId = route.params.taskId
    if (checkTaskId(taskId)) {
      return taskId
    }
    return '-1'
  }
  const excuteAsyncFunc = async (work, excuteFunc, params, successFunc) => {

    if (!excuteFunc || typeof excuteFunc !== 'function') {
      return;
    }

    let _message = ''
    try {

      let response = null
      if (params) {
        response = await excuteFunc(params)
      } else {
        response = await excuteFunc()
      }

      if (response && !checkRespStatus(response)) {
        _message = response.message
        throw _message
      } else {
        if (successFunc && typeof successFunc === 'function') {
          successFunc(response)
        }
      }
    } catch (error) {
      logError(work, 'excuteAsyncFunc', { error });
      _message = _message.length > 0 ? _message : `${work}執行失敗`
      throw _message
    }
  }
  const promiseErrorHanlder = (results) => {
    const errors = results.filter((item) => item.status == 'rejected')
    if (errors.length > 0) {
      let message = []
      errors.map(item => {
        if (!message.includes(item.reason)) {
          message.push(item.reason)
        }
      })

      if (message.length > 0) {
        return message.join()
      }
    }
    return ''
  }
  const promiseAllSettledHanlder = (promiseArr, successFunc, errorFunc, finalFunc) => {
    Promise.allSettled(promiseArr).then((results) => {
      if (!process.client) return;
      const errors = results.filter((item) => item.status == 'rejected')

      //成功
      if (errors.length == 0) {
        if (successFunc && typeof successFunc === 'function') {
          successFunc()
        }
        return;
      }

      //失敗
      let errorMsgs = []
      errors.map(item => {
        if (!errorMsgs.includes(item.reason)) {
          errorMsgs.push(item.reason)
        }
      })

      if (errorMsgs.length > 0 && errorFunc && typeof errorFunc === 'function') {
        errorFunc(errorMsgs.join())
      }

    }).finally(() => {
      if (finalFunc && typeof finalFunc === 'function') {
        finalFunc()
      }
    });
  }





  return {
    isNumber,
    checkRespStatus,
    checkTaskId,
    checkIsLogin,
    checkUploadImage,
    checkIsFunc,
    getTaskId,
    excuteAsyncFunc,
    promiseErrorHanlder,
    promiseAllSettledHanlder
  }
}