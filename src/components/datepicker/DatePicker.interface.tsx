import moment from 'moment';

export interface iDatePicker {
  setTableData: (data: moment.Moment[]) => void;
  disabled: boolean;
}
