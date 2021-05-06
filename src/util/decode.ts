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
