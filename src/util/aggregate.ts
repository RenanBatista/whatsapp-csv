import {
  iAgreggatedMessages,
  iMessage,
  iTableData,
} from 'types/global.interface';

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
      text: calculate_total_by_type(data[phone], 'text'),
      audio: calculate_total_by_type(data[phone], '.opus'),
      image: data[phone].reduce((total: number, curr: iMessage) => {
        return curr.type === '.jpg' || curr.type === '.png' ? total + 1 : total;
      }, 0),
      video: calculate_total_by_type(data[phone], '.mp4'),
    });
  });
  return transformedArray;
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

const calculate_total_by_type = (data: iMessage[], type: string): number => {
  return data.reduce((total: number, curr: iMessage) => {
    return curr.type === type ? total + 1 : total;
  }, 0);
};
