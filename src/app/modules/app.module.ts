import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy, CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { CapitalModule } from './capital.module';
import { ShareModule } from './share.module';
import { ControlModule } from './control.module';
import { AppRoutingModule } from './../routings/app.routing';
import { AngularFireModule } from 'angularfire2';

import {
    AppComponent,
    AdminComponent, SidebarComponent, HeaderComponent, FooterComponent
} from './../components/index';

import { AddOrEditComponent } from './../../core/components/index';

import {
    AlertControl,
    LANGUAGE, WEBAPI, LOCALAPI, WEBAPISERVICE,
    DomHandler, StateEventService, NotificationService,
    WebApiServices, IWebApiServices, LocalApiServices
} from './../../core/index';

var firebaseConfig = {
    apiKey: "AIzaSyAVHyhy1kQkjxQ-Iih4EMtEEx7G-zw__gE",
    authDomain: "capitalmanagement-eaa6a.firebaseapp.com",
    databaseURL: "https://capitalmanagement-eaa6a.firebaseio.com/",
    storageBucket: "capitalmanagement-eaa6a.appspot.com",
    messagingSenderId: "852437216866"
};

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        HttpModule, BrowserModule, CommonModule, FormsModule, ReactiveFormsModule,
        AppRoutingModule, CapitalModule, ControlModule, ShareModule,
        AngularFireModule.initializeApp(firebaseConfig)
    ],
    providers: [
        { provide: LANGUAGE, useValue: 'vn' },
        { provide: WEBAPI, useValue: 'http://localhost:8080/' },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: WEBAPISERVICE, useClass: LocalApiServices },
        DomHandler, StateEventService, NotificationService, DatePipe
    ],
    declarations: [
        AppComponent, AlertControl, AddOrEditComponent,
        AdminComponent, SidebarComponent, HeaderComponent, FooterComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);