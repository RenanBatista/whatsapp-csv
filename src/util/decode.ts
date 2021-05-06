import { iAgreggatedMessages, iMessage } from 'types/global.interface';
import { isFilled } from './parse';

export const split_in_user_messages = (data: string):iMessage[] => {
  //const separator = /(\d*\/\d*\/\d*\s*\d*\:\d*\s*\-(\s*.+?\:)?.+?(?=\d*\/\d*\/\d*\s*\d*\:\d*))/gms;
  const separator = /(\d*\/\d*\/\d*\s*\d*\:\d*\s*\-(\s*.+?\:)\s*.+?(?=\d*\/\d*\/\d*\s*\d*\:\d*))/gms;

  return data
    .split(separator)
    .map((line: string, index: string) =>
      isFilled(whatsapp_to_table(index, line))
    )
    .filter((item): item is iMessage => item);
};

export const splitText = (data: string) => {
  chat.push(...lines);
};

export const user_message_to_json = (key: string, line: string): iMessage => {
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

export const checkBodyType = (message: string) => {
  const match = message.match(/(?<=\.).*?(?=\(.+\))/gms);

  return match ? match[0].trim() : 'texto';
};
