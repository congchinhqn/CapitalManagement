import { EventEmitter } from '@angular/core';
import { Validators, Validator } from '@angular/forms';
import { IEmptyConstruct, IDataStructure, IGridHeader, IGridButton } from './../../interfaces/index';

export class BaseEntity implements IDataStructure {
    public Id: string;

    public setModelData(modelData: IDataStructure) {
        if (modelData) {
            this.Id = modelData.Id;
        }
    }
    getModuleName(): string { return ""; }
    getEntityName(): string { return ""; }
    getHeader(): IGridHeader[] { return []; }
    getButton(): IGridButton[] { return []; }
}
