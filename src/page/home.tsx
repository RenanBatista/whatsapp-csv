import Table from 'components/table/Table';
import Upload from 'components/upload/Upload';
import React from 'react';
import styled from 'styled-components';
import { iMessage } from 'types/global.interface';
import {
  aggregateMessagesByField,
  messages_in_date_range,
  transformAgregateData,
} from 'util/textToJson';
import { Space } from 'antd';
import DatePicker from 'components/datepicker/DatePicker';
import moment from 'moment';

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
    title: 'Número de telefone',
    dataIndex: 'phone',
    key: 'phone',
    width: '50%',
  },
  {
    title: 'Quantidade de mensagens',
    dataIndex: 'total',
    key: 'total',
    width: '50%',
    sorter: (a: any, b: any) => a.total - b.total,
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
