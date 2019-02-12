import moment from "moment";

export const displayDateRightFormat = timestamp => {
  return moment(timestamp).format('DD/MM/YYYY');
};

export const displayDateRightFormatWithTime = timestamp => {
  return moment(timestamp).format('DD/MM/YYYY HH:mm');
};
