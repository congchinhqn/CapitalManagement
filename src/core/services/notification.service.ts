import { Component, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

import { Message } from './../interfaces/index';
import { ResultMessage } from './../models/index';

@Injectable()
export class NotificationService {
    public alertEvent: Subject<Message> = new Subject<Message>();
}