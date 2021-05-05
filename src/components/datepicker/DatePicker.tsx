import React from 'react';
import { DatePicker as DateRange, Space } from 'antd';
import moment from 'moment';
import { iDatePicker } from './DatePicker.interface';

const dateFormat = 'DD/MM/YYYY';

const DatePicker: React.FC<iDatePicker> = ({
  setTableData,
  disabled = true,
}) => {
  const startDate = React.useRef<moment.Moment>();
  const endDate = React.useRef<moment.Moment>();

  const startDateChange = (date: moment.Moment | null) => {
    if (!date) return;
    startDate.current = date;
    setTableData([date]);
  };

  const endDateChange = (date: moment.Moment | null) => {
    if (!date) return;
    endDate.current = date;
    startDate.current && setTableData([startDate.current, date]);
  }

  const disabledDate = (date: moment.Moment | null) => {
    return startDate.current ? startDate.current.isSameOrAfter(date) : false;
  }

  return (
    <div>
      <Space>
        <DateRange
          placeholder={'Data inicial'}
          onChange={startDateChange}
          showTime={false}
          disabled={disabled}
        />
        <DateRange
          placeholder={'Data final (opcional)'}
          onChange={endDateChange}
          disabled={!Boolean(startDate.current)}
          disabledDate={disabledDate}
        />
      </Space>
    </div>
  );
};

export default DatePicker;
