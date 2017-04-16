import { Component, Input, Output, EventEmitter, HostListener, ElementRef, NgZone, OnInit, forwardRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, SelectControlValueAccessor } from '@angular/forms';

import { IEmptyConstruct, IDropdownStructure, IResultMessage, ResultStatus, IFilter } from './../../interfaces/index';
import { WebApiServices } from './../../services/index';

declare var $: any;

const MULTISELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownCodeControl),
    multi: true
};

@Component({
    selector: 'dropdown-code',
    providers: [MULTISELECT_VALUE_ACCESSOR],
    templateUrl: './dropdown-code.control.html'
})
export class DropdownCodeControl implements ControlValueAccessor, OnInit {
    @Input() entity: IEmptyConstruct;
    @Input() itemDefault: string = "Vui lòng chọn giá trị ...";
    @Input() languageCode: string ='';
    @Input() countryCode: string = '';
  
    private isVisible: boolean = false;
    private value: string;
    private itemSeleted: IDropdownStructure;
    private sources: Array<IDropdownStructure>;

    private static controlId: number = 1;
    private id: string = "";
    private isLoadDropdown: boolean = false;

    constructor(private element: ElementRef,
        private zone: NgZone,
        private service: WebApiServices) {
        this.id = `dropdown${DropdownCodeControl.controlId++}`;
    }

    ngOnInit() {
        this.loadData();
    }

    writeValue(value: any): void {
        if (value !== undefined) {
            this.value = value;
        }
    }

    private onChangeCallback: Function = (_: any) => { };
    registerOnChange(fn: Function): void {
        this.onChangeCallback = fn;
    }

    private onTouchedCallback: Function = () => { };
    registerOnTouched(fn: Function): void {
        this.onTouchedCallback = fn;
    }

    private loadData() {
        let that = this;
        setTimeout(_ => {
            that.service.getAllAsync(this.entity, "vn").then((data: IResultMessage) => {
                if (data.resultStatus == ResultStatus.Successful) {
                    that.sources = [];
                    (<IDropdownStructure[]>data.dataResult).map((item: IDropdownStructure) => {
                        if (item.Id == that.value)
                            item.seleted = true;
                        that.sources.push(item);
                    });
                }
            });
        }, 0);
    }

    selectedItem() {
        this.onChangeCallback(this.value);
        this.onTouchedCallback(this.value);
    }
}