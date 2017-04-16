import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    constructor() { }

    public toggled(open: boolean): void {
        console.log('Dropdown is now: ', open);
    }
}
