import moment from "moment";
export const useMoment = () => {
  const timeFormat = (time) => {
    let d = new Date(time);
    return moment(time).format("MM/DD   HH:mm");
  };
  return {
    timeFormat,
  };
};
