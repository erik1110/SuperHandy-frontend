export const useSpUtility = () => {
    const isNumber = n => (typeof (n) === 'number' || n instanceof Number );
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
    const checkTaskId = (taskId) => taskId && taskId.length == 24 ? true : false
    const checkIsLogin = () => useCookie("spToken").value.length > 0 ?? false



    return {
        isNumber,
        checkRespStatus,
        checkTaskId,
        checkIsLogin,
    }
}