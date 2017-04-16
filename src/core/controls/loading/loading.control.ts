import { Component, Input, ElementRef } from '@angular/core';
declare var $: any;

@Component({
    selector: 'loading',
    templateUrl: './loading.control.html'
})
export class LoadingControl {
    @Input() loading: boolean = false;

    private static controlId: number = 1;
    private id: string = "";

    constructor(private element: ElementRef) {
        this.id = `loading${LoadingControl.controlId++}`;
    }
}