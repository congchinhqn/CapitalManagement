import { Component, ViewEncapsulation, Inject, ViewChild, NgZone } from '@angular/core';
import { AlertControl, Message, NotificationService } from './../../core/index';

@Component({
    selector: 'body',
    templateUrl: 'app.component.html'
})

export class AppComponent {
    @ViewChild('alert') alert: AlertControl;
    private message: Message[] = [];

    private originalUrl: string = '';

    constructor( @Inject(NotificationService) private notificationService: NotificationService,
        private zone: NgZone) {
    }

    ngOnInit() {
        let that = this;
        that.zone.run(() => {
            that.notificationService.alertEvent.subscribe((messages: Message) => {
                that.message.push(messages);
            });
        });

    }
}