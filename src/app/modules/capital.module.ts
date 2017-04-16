import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { ControlModule } from './control.module';
import { ShareModule } from './share.module';
import { AppRoutingModule } from './../routings/app.routing';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import {
    AdminComponent, DashboardComponent,
    MemberMainComponent, MemberListComponent, AddOrEditMemberComponent
} from './../components/index';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        BrowserModule, CommonModule, FormsModule, ReactiveFormsModule,
        AppRoutingModule, ShareModule, ControlModule, ChartsModule
    ],
    declarations: [
        DashboardComponent,
        MemberMainComponent, MemberListComponent, AddOrEditMemberComponent
    ],
    exports: [
        DashboardComponent,
        MemberMainComponent, MemberListComponent, AddOrEditMemberComponent
    ]
})

export class CapitalModule { }