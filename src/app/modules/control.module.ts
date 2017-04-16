import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { ShareModule } from './share.module';

import {
    LoadingControl, GridViewControl, PaginatorControl,
    SwitchesControl, DropdownControl, DatepickerControl,
    BreadcrumbsComponent, DropdownCodeControl
} from './../../core/index';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        BrowserModule, CommonModule, FormsModule, ReactiveFormsModule, ShareModule
    ],
    declarations: [
        LoadingControl, GridViewControl, PaginatorControl,
        SwitchesControl, DropdownControl, DatepickerControl,
        BreadcrumbsComponent, DropdownCodeControl
    ],
    exports: [
        LoadingControl, GridViewControl, PaginatorControl,
        SwitchesControl, DropdownControl, DatepickerControl,
        BreadcrumbsComponent, DropdownCodeControl
    ]
})

export class ControlModule { }