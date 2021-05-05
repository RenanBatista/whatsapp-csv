import moment from 'moment';
import {
  iAgreggatedMessages,
  iMessage,
  iTableData,
} from '../types/global.interface';

export const whatsapp_to_table = (key: string, line: string): iMessage => {
  const regex = /(\d*\/\d*\/\d*)\s*(\d*\:\d*)\s*\-\s*(.+?)\:(.*$)/gms;

  const message = {
    key: key,
    date: '',
    hour: '',
    phone: '',
    body: '',
    type: '',
  };

  line.replace(
    regex,
    (all: string, date: string, hour: string, phone: string, body: string) => {
      message.date = date;
      message.hour = hour;
      message.phone = phone;
      message.body = body;
      message.type = checkBodyType(body);
      return all;
    }
  );

  return message;
};

export const isFilled = (data: iMessage) => {
  return Object.values(data)
    .map((value: string) => (value ? true : false))
    .every((value) => value)
    ? data
    : false;
};

export const checkBodyType = (message: string) => {
  const match = message.match(/(?<=\.).*?(?=\(.+\))/gms);

  return match ? match[0].trim() : 'texto';
};

export const aggregateMessagesByField = (
  data: iMessage[],
  key: string
): iAgreggatedMessages => {
  return data.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
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

export const splitText = (data: string) => {
  //const separator = /(\d*\/\d*\/\d*\s*\d*\:\d*\s*\-(\s*.+?\:)?.+?(?=\d*\/\d*\/\d*\s*\d*\:\d*))/gms;
  const separator = /(\d*\/\d*\/\d*\s*\d*\:\d*\s*\-(\s*.+?\:)\s*.+?(?=\d*\/\d*\/\d*\s*\d*\:\d*))/gms;

  const lines = data && data.split(separator);
  console.log(lines);
  chat.push(
    ...lines
      .map((line: string, index: string) =>
        isFilled(whatsapp_to_table(index, line))
      )
      .filter((item: iMessage | boolean) => item)
  );
}