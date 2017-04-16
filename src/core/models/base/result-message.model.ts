import { IResultMessage, ResultStatus } from './../../interfaces/index';
export class ResultMessage implements IResultMessage {
    resultStatus: ResultStatus;
    message: string;
    dataResult?: any;
    totalCount?: number;
}