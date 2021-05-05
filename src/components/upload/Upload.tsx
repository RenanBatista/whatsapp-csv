import React from 'react';
import { Upload as UploadButton, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { iUpload } from './Upload.interface';
import styled from 'styled-components';
import { isFilled, whatsapp_to_table } from 'util/textToJson';
import { RcFile } from 'antd/lib/upload';
import { iMessage } from '../../types/global.interface';

const Layout = styled.div`
  margin: 10px 0 10px 0;
`;

const Upload: React.FC<iUpload> = ({ setTableData }) => {
  const separator = /(\d*\/\d*\/\d*\s*\d*\:\d*\s*\-(\s*.+?\:)?.+?(?=\d*\/\d*\/\d*\s*\d*\:\d*))/gms;

  const handlePreview = (file: RcFile) => {
    const chat: iMessage[] = [];

    const reader = new FileReader();
    /* eslint-disable @typescript-eslint/no-explicit-any*/
    reader.onload = (e: any) => {
      const content = e.target.result;
      console.log(content);
      const lines = content && content.split(separator);
      console.log(lines);
      chat.push(
        ...lines
          .map((line: string, index: string) =>
            isFilled(whatsapp_to_table(index, line))
          )
          .filter((item: iMessage | boolean) => item)
      );
      setTableData(chat);
    };

    reader.readAsText(file);
  };

  const onRemove = () => setTableData([]);

  return (
    <Layout>
      <UploadButton showUploadList={false} beforeUpload={handlePreview} onRemove={onRemove}>
        <Button icon={<UploadOutlined />}>Carregar conversa</Button>
      </UploadButton>
    </Layout>
  );
};

export default Upload;
