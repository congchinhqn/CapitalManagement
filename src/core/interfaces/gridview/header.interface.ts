import { SortingType, FieldType } from './../index';

export interface IGridHeader {
    Name: string;
    Title: string;
    SortingType?: SortingType;
    Width?: string;
    FieldType?: FieldType;
}