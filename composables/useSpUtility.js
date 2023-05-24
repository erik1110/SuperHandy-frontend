export const useSpUtility = () => {
    const isNumber = n => (typeof (n) === 'number' || n instanceof Number );
    const checkTaskId = (taskId) => taskId && taskId.length == 24 ? true : false
    const checkIsLogin = () => useCookie("spToken").value?.length > 0 ?? false
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
    }
    const getTaskId = () =>{
      const route = useRoute();
      const taskId = route.params.taskId
      if(checkTaskId(taskId)){
        return taskId
      }
      return '-1'
    }




    return {
        isNumber,
        checkRespStatus,
        checkTaskId,
        checkIsLogin,
        getTaskId
    }
}