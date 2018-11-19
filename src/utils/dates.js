import moment from "moment";

export const displayDate = timestamp => {
  const duration = displayDuration(timestamp);
  return duration === "now" ? duration : `${duration}`;
};

export const displayDuration = (beginTime, endTime, short = true) => {
  const begin = moment(beginTime);
  return begin.fromNow();

  // OLD WAY OF DOING IT, A LITTLE BIT MORE FLEXIBLE
  // const end = endTime ? moment(endTime) : moment();
  // const years = end.diff(begin, "years");
  // if (years > 0) return years + (short ? "Y" : " years");
  // const months = end.diff(begin, "months");
  // if (months > 0) return months + (short ? "M" : " months");
  // const weeks = end.diff(begin, "weeks");
  // if (weeks > 0) return weeks + (short ? "W" : " weeks");
  // const days = end.diff(begin, "days");
  // if (days > 0) return days + (short ? "D" : " days");
  // const hours = end.diff(begin, "hours");
  // if (hours > 0) return hours + (short ? "H" : " hours");
  // const minutes = end.diff(begin, "minutes");
  // if (minutes > 0) return minutes + (short ? "m" : " minutes");
  // return "now";
};

export const displayMonthYear = timestamp =>
  moment(timestamp).format("MMM YYYY");

export const displayYearMonthDay = timestamp =>
  moment(timestamp).format("YYYY-MM-DD");
