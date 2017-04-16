import { Component, Input, Output, EventEmitter, HostListener, ElementRef, NgZone, OnInit, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR, CheckboxControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'paginator',
    templateUrl: './paginator.control.html'
})
export class PaginatorControl {
    @Input() pageSize: number = 10;
    @Input() set totalRecords(value: number) {
        if (value) {
            this._totalRecords = value;
            this.setPage(1);
        } 
    }
    @Output() selectPage: EventEmitter<number> = new EventEmitter<number>();
    // pager object
    private pager: any = {};
    private _totalRecords: number = 0;

    constructor() { }

    public setPage(page: number) {
        let that = this;
        if (page < 1 || page > that.pager.totalPages) {
            return;
        }
        that.selectPage.next(page);
        // get pager object from service
        that.pager = that.getPager(that._totalRecords, page);
    }

    private getPager(totalItems: number, currentPage: number = 1) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / this.pageSize);

        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * this.pageSize;
        let endIndex = Math.min(startIndex + this.pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages:number[] = [];
        for (let i = startPage; i < endPage + 1; i++) {
            pages.push(i);
        }

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: this.pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}