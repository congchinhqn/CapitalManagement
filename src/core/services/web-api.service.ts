import { Component, Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { WEBAPI, LOCALAPI } from './../app.setting';
import { IWebApiServices, IDataStructure, IEmptyConstruct, IFilter, IResultMessage } from './../interfaces/index';
import { StateEventService } from './state-event.service';

@Injectable()
export class WebApiServices implements IWebApiServices {

    private actionUrl: string;
    private headers: Headers;

    constructor(private http: Http,
        private stateEventService: StateEventService,
        @Inject(WEBAPI) private webApi: string) {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json;charset=utf-8');
        this.headers.append('Accept', 'application/json, text/plain, */*');
    }


    public async getAllAsync(dataStructure: IEmptyConstruct, actionName?: string, pageIndex?: number, filters?: IFilter[]): Promise<IResultMessage> {
        var that = this;

        var para = '?';
        var url = `${this.webApi}${this.getModuleName(dataStructure)}/${this.getEntityName(dataStructure)}`;

        if (actionName) url += "/" + actionName;
        //set param
        url += filters ? "?filters=" + encodeURIComponent(JSON.stringify(filters)) : "";
        url += pageIndex ? "&pageIndex=" + pageIndex.toString() + "&": "?";
      
        url += `access_token=${that.stateEventService.getToken()}`;
        return await that.http.get(url)
            .map(data => { return <IResultMessage>data.json(); })
            .catch(this.handleError)
            .toPromise();
    }

    public async getSingleAsync(dataStructure: IEmptyConstruct, id: string): Promise<IResultMessage> {
        var that = this;

        var url = `${this.webApi}${this.getModuleName(dataStructure)}/${this.getEntityName(dataStructure)}`;
        if (id) url += "/" + id;

        url += `?access_token=${that.stateEventService.getToken()}`;
        return await that.http.get(url)
            .map(data => { return <IResultMessage>data.json(); })
            .catch(this.handleError)
            .toPromise();
    }

    public async addEntityAsync(dataStructure: IEmptyConstruct, entity: IDataStructure, actionName?: string): Promise<IResultMessage> {
        var that = this;

        var url = `${this.webApi}${this.getModuleName(dataStructure)}/${this.getEntityName(dataStructure)}`;
        if (actionName) url += "/" + actionName;
        url += `?access_token=${that.stateEventService.getToken()}`;

        return await that.http.post(url, JSON.stringify(entity), { headers: this.headers })
            .map(data => { return <IResultMessage>data.json(); })
            .catch(this.handleError)
            .toPromise();
    }

    public async updateEntityAsync(dataStructure: IEmptyConstruct, entity: IDataStructure, actionName?: string): Promise<IResultMessage> {
        var that = this;

        var url = `${this.webApi}${this.getModuleName(dataStructure)}/${this.getEntityName(dataStructure)}`;
        if (actionName) url += "/" + actionName;
        url += `?access_token=${that.stateEventService.getToken()}`;

        return await that.http.put(url, JSON.stringify(entity), { headers: this.headers })
            .map(data => { return <IResultMessage>data.json(); })
            .catch(this.handleError)
            .toPromise();
    }

    public async deleteEntityAsync(dataStructure: IEmptyConstruct, id: string): Promise<IResultMessage> {
        var that = this;

        var url = `${this.webApi}${this.getModuleName(dataStructure)}/${this.getEntityName(dataStructure)}`;
        if (id) url += "/" + id;

        return await that.http.delete(url)
            .map(data => { return <IResultMessage>data.json(); })
            .catch(this.handleError)
            .toPromise();
    }

    public async getEntityAsync(dataStructure: IEmptyConstruct, actionName?: string, filters?: IFilter[]): Promise<IResultMessage> {
        var that = this;

        var url = `${this.webApi}${this.getModuleName(dataStructure)}/${this.getEntityName(dataStructure)}`;
        if (actionName) url += "/" + actionName;
        url += filters ? "?filters=" + JSON.stringify(filters) : "?filters=[]";

        return await that.http.get(url)
            .map(data => { return <IResultMessage>data.json(); })
            .catch(this.handleError)
            .toPromise();
    }

//    public async postEntityAsync(dataStructure: IEmptyConstruct, entity: IDataStructure, actionName?: string): Promise<IResultMessage> {
//        var that = this;
//
//        var url = `${this.webApi}${this.getModuleName(dataStructure)}/${this.getEntityName(dataStructure)}`;
//        if (actionName) url += "/" + actionName;
//
//        return await that.http.post(url, JSON.stringify(entity), { headers: this.headers })
//            .map(data => { return <IResultMessage>data.json(); })
//            .catch(this.handleError)
//            .toPromise();
//    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }

    private currentUserHeader() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

    /**
     * get Entity from instances dummy
     * @param DataStructure Type of data
     * @param entity Data entity
     * @returns IDataStructure
     */
    private fromRawEntity(dataStructure: IEmptyConstruct, entity: IDataStructure): IDataStructure {
        let res: any = new dataStructure();
        (res as IDataStructure).setModelData(entity);
        return res;
    }

    /**
     * Get Module Name
     * @param DataStructure Type of data
     * @returns ModuleName()
     */
    private getModuleName(DataStructure: IEmptyConstruct): string {
        let res: any = new DataStructure();
        return (res as IDataStructure).getModuleName();
    }

    /**
    * Get Entity Name
    * @param DataStructure Type of data
    * @returns EntityName()
    */
    private getEntityName(DataStructure: IEmptyConstruct): string {
        let res: any = new DataStructure();
        return (res as IDataStructure).getEntityName();
    }
}