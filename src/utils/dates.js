import moment from "moment";

export const displayDateRightFormat = timestamp => {
  return moment(timestamp).format('YYYY-MM-DD');
};

export const displayDateRightFormatWithTime = timestamp => {
  return moment(timestamp).format('DD-MM-YYYY HH:mm');
};
