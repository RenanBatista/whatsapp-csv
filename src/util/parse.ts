import moment from 'moment';
import {
  iAgreggatedMessages,
  iMessage,
  iTableData,
} from 'types/global.interface';

export const messages_in_date_range = (
  data: iMessage[],
  startDate: moment.Moment,
  endDate: moment.Moment
) => {
  return data.reduce((filteredData: any, message: iMessage) => {
    return moment(message.date, 'DD/MM/YYYY').isBetween(startDate, endDate)
      ? [...filteredData, message]
      : filteredData;
  }, []);
};

export const isFilled = (data: iMessage) => {
  return Object.values(data)
    .map((value: string) => (value ? true : false))
    .every((value) => value)
    ? data
    : false;
};
