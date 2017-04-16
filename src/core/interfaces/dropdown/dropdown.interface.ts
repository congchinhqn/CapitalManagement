import { IDataStructure } from './../index';

export interface IDropdownStructure extends IDataStructure {
    name: string;
    code: string;
    icon?: string;
    seleted?: boolean;
    imageSource?: string;
    imageAlt?: string;
}