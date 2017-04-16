import { Component, Input, Output, EventEmitter, HostListener, ElementRef, NgZone, OnInit, forwardRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR, CheckboxControlValueAccessor } from '@angular/forms';

declare var $: any;

@Component({
    selector: 'datepicker',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatepickerControl), multi: true }],
    templateUrl: './datepicker.control.html'
})
export class DatepickerControl implements ControlValueAccessor, AfterViewInit {
    @Input() placeholder: string = "Datepicker";
    @Input() useTime: boolean = false;
    //support follow by class
    //"picker_1", "picker_2", "picker_3", "picker_4"
    @Input() classDate: string = "picker_3";

    private value: any;
    private dateControl: any;

    private static controlId: number = 1;
    private id: string = "";

    constructor(private element: ElementRef,
        private zone: NgZone) {
        this.id = `datepicker${DatepickerControl.controlId++}`;
    }

    ngAfterViewInit() {
        this.initDatepicker();
    }

    writeValue(value: any): void {
        if (value !== undefined) {
            this.initDatepicker();
            this.dateControl.data('daterangepicker').setStartDate(value);
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

    private initDatepicker() {
        let that = this;
        if (!that.dateControl) {
            that.dateControl = $("#" + that.id).daterangepicker({
                singleDatePicker: true,
                timePicker: that.useTime,
                singleClasses: that.classDate
            }, function (start: any, end: any, label: any) {
                //start is old value
                //end is new value
                that.selectedItem(end)
            });
        }
    }

    private selectedItem(value: any) {
        this.onChangeCallback(value);
        this.onTouchedCallback(value);
    }
}