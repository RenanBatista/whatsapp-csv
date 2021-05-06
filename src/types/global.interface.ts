export interface iMessage{
    key: number;
    date: string;
    hour: string;
    phone: string;
    body: string;
    type: string;
}

export interface iAgreggatedMessages{
    [key: string]: iMessage[]
}

export interface iTableData{
    key: string;
    phone: string;
    total: number;
}