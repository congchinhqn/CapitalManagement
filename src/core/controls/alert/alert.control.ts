﻿//https://tympanus.net/codrops/2012/06/25/timed-notifications-with-css-animations/?utm_source=bypeople
import {
    Component, Input, Output, OnInit, AfterViewInit, ViewEncapsulation, IterableDiffers,
    Inject, NgZone, OnDestroy, DoCheck, ElementRef, ViewChild
} from '@angular/core';

import { DomHandler, StateEventService } from './../../services/index';
import { Message } from './../../interfaces/index';

declare var $: any;

@Component({
    selector: 'alert',
    templateUrl: './alert.control.html',
    styleUrls: ['./alert.control.css'],
    encapsulation: ViewEncapsulation.None
})
export class AlertControl implements AfterViewInit, DoCheck, OnDestroy {

    @Input() sticky: boolean = false;

    @Input() life: number = 3000;

    @Input() value: Message[];

    @Input() style: any;

    @Input() styleClass: string;

    @ViewChild('container') containerViewChild: ElementRef;

    differ: any;

    zIndex: number;

    container: HTMLDivElement;

    stopDoCheckPropagation: boolean;

    timeout: any;

    constructor(public el: ElementRef,
        public domHandler: DomHandler,
        differs: IterableDiffers) {

        this.differ = differs.find([]).create(null);
        this.zIndex = DomHandler.zindex;
    }

    ngAfterViewInit() {
        this.container = <HTMLDivElement>this.containerViewChild.nativeElement;
    }

    ngDoCheck() {
        let changes = this.differ.diff(this.value);
        if (changes && this.container) {
            if (this.stopDoCheckPropagation) {
                this.stopDoCheckPropagation = false;
            }
            else if (this.value && this.value.length) {
                this.zIndex = ++DomHandler.zindex;
                this.domHandler.fadeIn(this.container, 250);

                if (!this.sticky) {
                    if (this.timeout) {
                        clearTimeout(this.timeout);
                    }
                    this.timeout = setTimeout(() => {
                        this.removeAll();
                    }, this.life);
                }
            }
        }
    }

    remove(msg: Message, msgel: any) {
        this.stopDoCheckPropagation = true;

        this.domHandler.fadeOut(msgel, 250);

        setTimeout(() => {
            this.value.splice(this.findMessageIndex(msg), 1);
        }, 250);

    }

    removeAll() {
        if (this.value && this.value.length) {
            this.stopDoCheckPropagation = true;

            this.domHandler.fadeOut(this.container, 250);

            setTimeout(() => {
                this.value.splice(0, this.value.length);
            }, 250);
        }
    }

    findMessageIndex(msg: Message) {
        let index: number = -1;

        if (this.value && this.value.length) {
            for (let i = 0; i < this.value.length; i++) {
                if (this.value[i] == msg) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    ngOnDestroy() {
        if (!this.sticky) {
            clearTimeout(this.timeout);
        }
    }
}