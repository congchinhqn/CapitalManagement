import { FormGroup } from '@angular/forms';
import { IDataStructure, IEmptyConstruct } from './../../index';

export interface IAddOrEditComponent {
    addOrEditForm: FormGroup;
    entity: IDataStructure;
    entityType: IEmptyConstruct;
    entityId: string;
    redirectLink: string;

    onSubmit(event: any): any;
    onCancel(): any;
    getEntityById(id: string): any;
    addEntity(): any;
    updateEntity(): any;
}