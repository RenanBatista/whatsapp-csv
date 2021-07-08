import React from 'react';
import { Upload as UploadButton, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { iUpload } from './Upload.interface';
import styled from 'styled-components';
import { RcFile } from 'antd/lib/upload';
import { decode_text } from 'util/decode';

const Layout = styled.div`
  margin: 10px 0 10px 0;
`;

const Upload: React.FC<iUpload> = ({ setTableData }) => {
  const handlePreview = (file: RcFile) => {
    const reader = new FileReader();
    /* eslint-disable @typescript-eslint/no-explicit-any*/
    reader.onload = (e: any) => {
      setTableData(decode_text(e.target.result));
    };

    reader.readAsText(file);
  };

  const onRemove = () => setTableData([]);

  return (
    <Layout>
      <UploadButton
        showUploadList={false}
        beforeUpload={handlePreview}
        onRemove={onRemove}
      >
        <Button icon={<UploadOutlined />}>Carregar conversa</Button>
      </UploadButton>
    </Layout>
  );
};

export default Upload;
