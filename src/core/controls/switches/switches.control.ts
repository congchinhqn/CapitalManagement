import { Component, Input, Output, EventEmitter, HostListener, ElementRef, NgZone, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR, CheckboxControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'switches',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SwitchesControl), multi: true }],
    templateUrl: './switches.control.html',
    styleUrls: ['./switches.control.css']
})
export class SwitchesControl implements ControlValueAccessor {
    private onTouchedCallback = (v: any) => {
    };
    private onChangeCallback = (v: any) => {
    };

    private _checked: boolean;
    private _disabled: boolean;
    private _reverse: boolean;

    @Input() set checked(v: boolean) {
        this._checked = v !== false;
    }

    get checked() {
        return this._checked;
    }

    @Input() set disabled(v: boolean) {
        this._disabled = v !== false;
    };

    get disabled() {
        return this._disabled;
    }

    @Input() set reverse(v: boolean) {
        this._reverse = v !== false;
    };

    get reverse() {
        return this._reverse;
    }

    @Input() size: string = 'medium';
    @Output() change = new EventEmitter<boolean>();
    @Input() color: string = 'rgb(100, 189, 99)';
    @Input() switchOffColor: string = '';
    @Input() switchColor: string = '#fff';
    defaultBgColor: string = '#fff';
    defaultBoColor: string = '#dfdfdf';

    getColor(flag: any) {
        if (flag === 'borderColor') return this.defaultBoColor;
        if (flag === 'switchColor') {
            if (this.reverse) return !this.checked ? this.switchColor : this.switchOffColor || this.switchColor;
            return this.checked ? this.switchColor : this.switchOffColor || this.switchColor;
        }
        if (this.reverse) return !this.checked ? this.color : this.defaultBgColor;
        return this.checked ? this.color : this.defaultBgColor;
    }

    @HostListener('click')
    onToggle() {
        if (this.disabled) return;
        this.checked = !this.checked;
        this.change.emit(this.checked);
        this.onChangeCallback(this.checked);
        this.onTouchedCallback(this.checked);
    }

    writeValue(obj: any): void {
        if (obj !== this.checked) {
            this.checked = !!obj;
        }
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}