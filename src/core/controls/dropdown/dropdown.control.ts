import { Component, Input, Output,Inject, EventEmitter, HostListener, ElementRef, NgZone, OnInit, forwardRef, AfterViewInit, AfterViewChecked, OnChanges,
  SimpleChanges, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, SelectControlValueAccessor } from '@angular/forms';

import { WEBAPISERVICE } from './../../app.setting';
import { IDataStructure, IEmptyConstruct, IDropdownStructure, IResultMessage, ResultStatus, IFilter } from './../../interfaces/index';
import { WebApiServices } from './../../services/index';

declare var $: any;

const MULTISELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownControl),
    multi: true
};

@Component({
    selector: 'dropdown',
    providers: [MULTISELECT_VALUE_ACCESSOR],
    templateUrl: './dropdown.control.html'
})
export class DropdownControl implements ControlValueAccessor, OnInit, OnChanges {
    @Input() entity: IEmptyConstruct;
    @Input() itemDefault: string = "Vui lòng chọn giá trị ...";
    @Input() action: string = '';
    @Input() disabled: boolean = false;
    @Output() selected: EventEmitter<any> = new EventEmitter<any>();

    private isVisible: boolean = false;
    private value: string;
    private itemSeleted: IDropdownStructure;
    private sources: Array<IDropdownStructure>;

    public static controlId: number = 1;
    private id: string = "";
    private isLoadDropdown: boolean = false;

    constructor(private element: ElementRef,
        private zone: NgZone,
        @Inject(WEBAPISERVICE) private service: WebApiServices) {
        this.id = `dropdown${DropdownControl.controlId++}`;
    }

    ngOnInit() {
        this.loadData();
    }

    writeValue(value: any): void {
        if (value !== undefined) {
            this.value = value;
        }
    }

    private onChangeCallback: Function = (_: any) => {
    };
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
            that.service.getAllAsync(this.entity, this.action).then((data: IResultMessage) => {
                if (data.resultStatus == ResultStatus.Successful) {
                    that.sources = [];
                    (<IDropdownStructure[]>data.dataResult).map((item: IDropdownStructure) => {
                        if (item.code == that.value){
                            item.seleted = true;
                        }
                        that.sources.push(item);
                    });
                }
            });
        }, 1);
    }

    selectedItem() {
        this.onChangeCallback(this.value);
        this.onTouchedCallback(this.value);
        this.selected.emit(this.value);
    }

  ngOnChanges(changes: SimpleChanges): void {
      this.loadData();
    return;
  }
}