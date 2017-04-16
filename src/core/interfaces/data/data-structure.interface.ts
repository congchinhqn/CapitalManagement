import { IGridHeader } from '../gridview/header.interface';
import { IGridButton } from '../gridview/grid-button.interface';
/**
  * Data Structure interfaces
  * @desc Define some basic functions to work with Entity
*/
export interface IDataStructure {
  Id: string;

  setModelData(modelData: IDataStructure): void;

  getModuleName(): string;
  getEntityName(): string;
  getHeader(): IGridHeader[];
  getButton(): IGridButton[];
}