import { Component, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

import { Message } from './../interfaces/index';
import { ResultMessage } from './../models/index';

@Injectable()
export class StateEventService {
    public userName: string = '';
    public fullName: string = '';

    public tokenName = "access_token";
    public currentUser = "currentuser";
    public userFullName = "fullname";
    public userProfile = "userprofile";

    public constructor() {
    }

    public logout() {
        this.clearLocalStorage();
        this.fullName = "";
        this.userName = "";
        this.tokenName = "";
        this.currentUser = "";
        this.userFullName = "";
        this.userProfile = "";
    }

    public clearLocalStorage() {
        localStorage.removeItem(this.tokenName);
        localStorage.removeItem(this.currentUser);
        localStorage.removeItem(this.userFullName);
        localStorage.removeItem(this.userName);
        localStorage.removeItem(this.userProfile);
    }

    public addLocalStorageItem(token: string, currentuser: string, username: string, fullname: string) {
        localStorage.setItem(this.tokenName, token);
        localStorage.setItem(this.currentUser, currentuser);
        localStorage.setItem(this.userName, username);
        localStorage.setItem(this.userFullName, fullname);
    }

    public getToken(){
        return localStorage.getItem(this.tokenName);
    }

}