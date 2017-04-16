import { Component, Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { IWebApiServices, IDataStructure, IEmptyConstruct, IFilter, IResultMessage, ResultStatus } from './../interfaces/index';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class LocalApiServices implements IWebApiServices {

    constructor(private fbService: AngularFire) { }

    public async getAllAsync(dataStructure: IEmptyConstruct, actionName?: string, pageIndex?: number, filters?: IFilter[]): Promise<IResultMessage> {
        var that = this;

        var url = `${this.getEntityName(dataStructure)}`;
        if (actionName) url += "/" + actionName;

        var totalCount = await that.fbService.database.list(url);

        let data = await that.fbService.database.list(url, {
            query: {
                limitToFirst: (pageIndex - 1) * 10,
                limitToLast: 10,
            }
        });
        return <IResultMessage>{ dataResult: data, totalCount: totalCount };
    }

    public async getSingleAsync(dataStructure: IEmptyConstruct, id: string): Promise<IResultMessage> {
        var that = this;

        var url = `${this.getEntityName(dataStructure)}`;
        if (id) url += "/" + id;

        let data = await that.fbService.database.object(url);
        return <IResultMessage>{ dataResult: data, resultStatus: ResultStatus.Successful };
    }

    public async addEntityAsync(dataStructure: IEmptyConstruct, entity: IDataStructure, actionName?: string): Promise<IResultMessage> {
        var that = this;

        entity.Id = that.newGuid();
        var url = `${this.getEntityName(dataStructure)}`;
        if (actionName) url += "/" + actionName;
        url += "/" + entity.Id;

        var entities = that.fbService.database.object(url);
        entities.set(that.fromRawEntity(dataStructure, entity));
        return <IResultMessage>{ resultStatus: ResultStatus.Successful };
    }

    public async updateEntityAsync(dataStructure: IEmptyConstruct, entity: IDataStructure, actionName?: string): Promise<IResultMessage> {
        var that = this;

        var url = `${this.getEntityName(dataStructure)}`;
        if (actionName) url += "/" + actionName;
        url += "/" + entity.Id;
        var entities = await that.fbService.database.object(url);
        entities.set(that.fromRawEntity(dataStructure, entity));
        return <IResultMessage>{ resultStatus: ResultStatus.Successful };
    }

    public async deleteEntityAsync(dataStructure: IEmptyConstruct, id: string): Promise<IResultMessage> {
        var that = this;

        var url = `${this.getEntityName(dataStructure)}`;
        if (id) url += "/" + id;

        var entities = await that.fbService.database.object(url);
        entities.remove();
        return <IResultMessage>{ resultStatus: ResultStatus.Successful };
    }

    private async getCountAllAsync(dataStructure: IEmptyConstruct, actionName?: string): Promise<number> {
        var that = this;

        var url = `${this.getEntityName(dataStructure)}`;
        if (actionName) url += "/" + actionName;

        return await that.fbService.database.list(url).count().toPromise();
    }

    private newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
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
    * Get Entity Name
    * @param DataStructure Type of data
    * @returns EntityName()
    */
    private getEntityName(DataStructure: IEmptyConstruct): string {
        let res: any = new DataStructure();
        return (res as IDataStructure).getEntityName();
    }
}