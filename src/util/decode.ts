import { iMessage } from 'types/global.interface';
import { isFilled } from './parse';

export const decode_text = (data: string): iMessage[] => {
  //
  const regex = /(\d*\/\d*\/\d*\s*\d*\:\d*\s*\-\s*.+?(?=\d*\/\d*\/\d*\s*\d*\:\d*))/gms;
  console.log(
    data.split(regex).map((line, index) => decode_message(line, index))
  );
  return data
    .split(regex)
    .map((line, index) => decode_message(line, index))
    .reduce((message): message is iMessage => isFilled(message) ? true : false);
};

export const decode_message = (data: string, key: number): iMessage => {
  const regex = /(\d*\/\d*\/\d*)\s*(\d*\:\d*)\s*\-\s*(.*)/gms;
  const temp = data.split(regex);

  console.log(data);
  console.log(temp);

  if (!data || !temp[1])
    return { key: key, date: '', hour: '', phone: '', body: '', type: '' };

  console.log(temp);
  console.log('******************');
  const body =
    temp[3].split(':').length >= 2
      ? temp[3].split(':').slice(1).join(' ')
      : temp[2][0];

  return {
    key: key,
    date: temp[1],
    hour: temp[2],
    phone: temp[3].split(':').length >= 2 ? temp[3].split(':')[0] : 'sistema',
    body: body,
    type: check_body_type(body),
  };
};

export const check_body_type = (messageBody: string): string => {
  const imgRegex = /(.jpg|.png)(?=\s*\(.+\))/gms;
  const audioRegex = /.opus(?=\s*\(.+\))/gms;
  const videoRegex = /.vcf(?=\s*\(.+\))/gms;
  const contactRegex = /.vcf(?=\s*\(.+\))/gms;

  const img = messageBody.match(imgRegex);
  const audio = messageBody.match(audioRegex);
  const video = messageBody.match(videoRegex);
  const contact = messageBody.match(contactRegex);

  return ([img, audio, video, contact].reduce((el) => el) || ['text'])[0];
};
