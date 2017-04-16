import { IDataStructure, IEmptyConstruct, IFilter, IResultMessage } from './../index';
export interface IWebApiServices {
    getAllAsync(dataStructure: IEmptyConstruct, actionName?: string, pageIndex?: number, filters?: IFilter[]): Promise<IResultMessage>;   
    getSingleAsync(dataStructure: IEmptyConstruct, id: string): Promise<IResultMessage>;
    addEntityAsync(dataStructure: IEmptyConstruct, entity: IDataStructure, actionName?: string): Promise<IResultMessage>;
    updateEntityAsync(dataStructure: IEmptyConstruct, entity: IDataStructure, actionName?: string): Promise<IResultMessage>;
    deleteEntityAsync(dataStructure: IEmptyConstruct, id: string): Promise<IResultMessage>;

}