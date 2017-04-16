export enum ResultStatus {
    Successful = 0,
    Fail = 1
}

export interface IResultMessage {
    resultStatus: ResultStatus;
    message?: string;
    dataResult?: any;
    totalCount?: any;
}