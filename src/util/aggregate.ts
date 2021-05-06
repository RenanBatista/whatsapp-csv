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
