import { iMessage } from 'types/global.interface';
import { isFilled } from './parse';

export const decode_text = (data: string): iMessage[] => {
  //
  const regex = /(\d*\/\d*\/\d*\s*\d*\:\d*\s*\-\s*.+?(?=\d*\/\d*\/\d*\s*\d*\:\d*))/gms;

  return data
    .split(regex)
    .map((line, index) => decode_message(line, index))
    .filter((message): message is iMessage =>
      isFilled(message) ? true : false
    );
};

export const decode_message = (data: string, key: number): iMessage => {
  const regex = /(\d*\/\d*\/\d*)\s*(\d*\:\d*)\s*\-\s*(.*)/gms;
  const temp = data.split(regex);

  if (!data || !temp[1])
    return { key: key, date: '', hour: '', phone: '', body: '', type: '' };

  const body =
    temp[3].split(':').length >= 2
      ? temp[3].split(':').slice(1).join(' ')
      : temp[2][0];

  return {
    key: key,
    date: temp[1],
    hour: temp[2],
    phone: temp[3].split(':').length >= 2 ? temp[3].split(':')[0] : 'Sistema',
    body: body,
    type: check_body_type(body),
  };
};

export const check_body_type = (messageBody: string): string => {
  const imgRegex = /(.jpg|.png)(?=\s*\(.+\))/gms;
  const audioRegex = /(.opus)(?=\s*\(.+\))/gms;
  const videoRegex = /(.mp4)(?=\s*\(.+\))/gms;
  const contactRegex = /(.vcf)(?=\s*\(.+\))/gms;

  const img = messageBody.match(imgRegex);
  const audio = messageBody.match(audioRegex);
  const video = messageBody.match(videoRegex);
  const contact = messageBody.match(contactRegex);

  const type = [img, audio, video, contact, ['text']].filter(
    (curr): curr is string[] => (curr ? Boolean(curr[0]) : false),
    []
  );

  return type[0] ? type[0][0] : 'text';
};
