import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HeaderComponent, SidebarComponent, FooterComponent } from './../index';

@Component({
    selector: 'app-root',
    templateUrl: './admin.component.html'
})
export class AdminComponent {
    constructor() { }
}
