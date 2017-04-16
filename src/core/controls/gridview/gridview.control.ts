import { Component, Input, Output, EventEmitter, HostListener, ElementRef, NgZone, Inject, OnInit, AfterViewInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR, CheckboxControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { WEBAPISERVICE } from './../../app.setting';
import { PaginatorControl } from './paginator.control';
import { IEmptyConstruct, IDataStructure, IGridHeader, IResultMessage, FieldType, IFilter, IGridButton, ButtonLocation } from './../../interfaces/index';
import { WebApiServices, StateEventService } from './../../services/index';

@Component({
    selector: 'gridview',
    templateUrl: './gridview.control.html'
})
export class GridViewControl implements OnInit {
    @Input() set entity(entity: IEmptyConstruct) {
        this.entityBase = new entity();
        this.emptyConstruct = entity;
        this.headerGrid = (this.entityBase as IDataStructure).getHeader();
        this.buttonGrid = (this.entityBase as IDataStructure).getButton();
    }

    @Input() useCheckbox: boolean = false;
    @Input() filters: IFilter[] = [];

    @Output() actionEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() loadDataEvent: EventEmitter<any> = new EventEmitter<any>();

    private emptyConstruct: IEmptyConstruct;
    private entityBase: IDataStructure;
    private sources: Array<IDataStructure>;
    private totalRecord: number = 0;
    private loading: boolean = true;
    private pageIndex: number = 1;
    private headerGrid: IGridHeader[] = [];
    private buttonGrid: IGridButton[] = [];

    constructor(private zone: NgZone,
        private router: Router,
        @Inject(WEBAPISERVICE) private service: WebApiServices) { }

    ngOnInit() {
        this.loadData();
    }

    public loadData() {
        var that = this;
        setTimeout(_ => {
            that.loading = true;
            that.service.getAllAsync(this.emptyConstruct, null, this.pageIndex, this.filters).then((data: IResultMessage) => {
                data.dataResult.subscribe((res: any) => that.sources = res);
                data.totalCount.subscribe((res: any) => that.totalRecord = res.length);
                that.loading = false;
            });
        }, 1);
    }

    private onSelectPage(pageIndex: number) {
        this.pageIndex = pageIndex;
        this.loadData();
    }

    private onLoadDataEvent() {
        this.loadDataEvent.next(true);
    }

    private onButtonEvent(item: IDataStructure, button: IGridButton) {
        this.actionEvent.next({ 'data': item, 'action': button });
    }

    private rowCheck($event: any, item: IDataStructure) {
        console.log($event);
    }

    private isFieldText(field: IGridHeader) {
        return field.FieldType === FieldType.Text;
    }

    private isFieldImage(field: IGridHeader) {
        return field.FieldType === FieldType.Image;
    }

    private isFieldDate(field: IGridHeader) {
        return field.FieldType === FieldType.Date;
    }

    private isButtonLeftTop(button: IGridButton) {
        return button.Location == ButtonLocation.LeftTop;
    }
    private isButtonRightTop(button: IGridButton) {
        return button.Location == ButtonLocation.RightTop;
    }
    private isButtonInGrid(button: IGridButton) {
        return button.Location == ButtonLocation.InGrid;
    }
}