import { iMessage } from 'types/global.interface';

export interface iUpload {
  setTableData: (data: iMessage[]) => void;
}
