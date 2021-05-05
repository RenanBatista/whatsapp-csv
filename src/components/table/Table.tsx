import React from 'react';
import { Table as DataTable } from 'antd';
import { iTableProps } from './Table.interface';

const Table: React.FC<iTableProps> = ({ data, columns }) => {
  return (
    <div>
      <DataTable columns={columns} dataSource={data} size="middle" />
    </div>
  );
};

export default Table;
