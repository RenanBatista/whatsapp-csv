import { iMessage } from 'types/global.interface';
import { Type } from 'typescript';

export interface iTableProps{
    data: iMessage[];
    columns: iColumns[];
}

interface iColumns{
    title: string;
    dataIndex: string;
    key: string;
    render?: (data: Type) => HTMLBaseElement
}