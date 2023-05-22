import moment from "moment";
export const useMoment = () => {
  moment.locale("zh-tw");
  const timeFormat = (time) => {
    let d = new Date(time);
    return moment(time).format("MM/DD   HH:mm");
  };
  const fromNow = (time) => {
    // 現在的時間
    const currentTime = moment();
    // 解析目標時間
    const targetMoment = moment(time);
    // 計算兩個時間的差距
    const duration = moment.duration(currentTime.diff(targetMoment));
    // 判斷時間差是否小於一天
    if (duration.asHours() < 24) {
      // 如果小於一天，顯示 XX小時前
      return moment(time).startOf("hour").fromNow();
    } else {
      // 如果大於等於一天，顯示正常時間
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    }
  };
  return {
    timeFormat,
    fromNow,
  };
};
