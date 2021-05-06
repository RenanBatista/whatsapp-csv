import moment from 'moment';
import {
  iAgreggatedMessages,
  iMessage,
  iTableData,
} from '../types/global.interface';

export const isFilled = (data: iMessage) => {
  return Object.values(data)
    .map((value: string) => (value ? true : false))
    .every((value) => value)
    ? data
    : false;
};



/* eslint-disable @typescript-eslint/no-explicit-any*/
export const transformAgregateData = (
  data: iAgreggatedMessages
): iTableData[] | null => {
  if (!data) return null;
  const transformedArray: any[] = [];
  Object.keys(data).map((phone: string, index: number) => {
    transformedArray.push({
      key: String(index),
      phone: phone,
      total: data[phone].reduce((total: number) => total + 1, 0),
    });
  });
  return transformedArray;
};

export const messages_in_date_range = (
  data: iMessage[],
  startDate: moment.Moment,
  endDate: moment.Moment
) => {
  return data.reduce((filteredData: any, message: iMessage, index: number) => {
    return moment(message.date, 'DD/MM/YYYY').isBetween(
      startDate,
      endDate
    )
      ? [...filteredData, message]
      : filteredData;
  }, []);
};

