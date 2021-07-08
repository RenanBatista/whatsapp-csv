import Table from 'components/table/Table';
import Upload from 'components/upload/Upload';
import React from 'react';
import styled from 'styled-components';
import { iMessage } from 'types/global.interface';
import { Space } from 'antd';
import DatePicker from 'components/datepicker/DatePicker';
import moment from 'moment';
import {
  aggregateMessagesByField,
  transformAgregateData,
} from 'util/aggregate';
import { messages_in_date_range } from 'util/parse';

const Layout = styled.div`
  max-width: 900px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  padding: 15px;
`;

const cols = [
  {
    title: 'Nome/Número de telefone',
    dataIndex: 'phone',
    key: 'phone',
    width: '30%',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    width: '14%',
    sorter: (a: any, b: any) => a.total - b.total,
    sortDirections: ['descend'],
  },
  {
    title: 'Texto',
    dataIndex: 'text',
    key: 'text',
    width: '14%',
    sorter: (a: any, b: any) => a.text - b.text,
    sortDirections: ['descend'],
  },
  {
    title: 'Audio',
    dataIndex: 'audio',
    key: 'audio',
    width: '14%',
    sorter: (a: any, b: any) => a.audio - b.audio,
    sortDirections: ['descend'],
  },
  {
    title: 'Imagem',
    dataIndex: 'image',
    key: 'image',
    width: '14%',
    sorter: (a: any, b: any) => a.image - b.image,
    sortDirections: ['descend'],
  },
  {
    title: 'Video',
    dataIndex: 'video',
    key: 'video',
    width: '14%',
    sorter: (a: any, b: any) => a.video - b.video,
    sortDirections: ['descend'],
  },

];

const Home: React.FC = () => {
  const columns = React.useRef(cols);
  const rawData = React.useRef<iMessage[]>();
  const [tableData, setTableData] = React.useState<any>([]);

  const setData = (data: iMessage[]) => {
    rawData.current = data;
    setTableData(
      transformAgregateData(aggregateMessagesByField(data, 'phone'))
    );
  };

  const setFilteredData = (dates: (moment.Moment | null)[]) => {
    const startDate = dates[0] || moment();
    const endDate = dates[1] || moment();
    rawData.current &&
      setTableData(
        transformAgregateData(
          aggregateMessagesByField(
            messages_in_date_range(rawData.current, startDate, endDate),
            'phone'
          )
        )
      );
  };

  return (
    <Layout>
      <Space>
        <Upload setTableData={setData} />
        <DatePicker
          setTableData={setFilteredData}
          disabled={!Boolean(rawData.current)}
        />
      </Space>
      <Table data={tableData} columns={columns.current} />
    </Layout>
  );
};

export default Home;
