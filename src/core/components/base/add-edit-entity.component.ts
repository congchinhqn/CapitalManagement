import { Component, AfterViewInit, OnInit, NgZone, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
    IEmptyConstruct, IDataStructure, IAddOrEditComponent,
    IWebApiServices, IResultMessage, ResultStatus,
    NotificationService, CustomValidators, WEBAPISERVICE
} from './../../index';

@Component({
    template:''
})
export class AddOrEditComponent implements IAddOrEditComponent, AfterViewInit, OnInit {

    addOrEditForm: FormGroup;
    entity: IDataStructure;
    entityType: IEmptyConstruct;
    entityId: string;
    redirectLink: string = '';

    entityOriginal:IDataStructure;

    public loading: boolean = false;

    constructor(public fb: FormBuilder,
        @Inject(WEBAPISERVICE) public webApiServices: IWebApiServices,
        public activatedRoute: ActivatedRoute,
        public router: Router,
        @Inject(NotificationService) public notificationService: NotificationService) {
    }

    ngOnInit() {
        let that = this;
        try {
            that.activatedRoute.params.subscribe((params: Params) => {
                that.entityId = params['id'];
                that.loading = that.entityId != null;
                that.getEntityById(that.entityId);
            });
        } catch (e) { }
    }

    ngAfterViewInit() {
    }

    onSubmit(event: any) {
        let that = this;
        if (that.entity && that.addOrEditForm.valid) {
            that.loading = true;
            if (that.entityId) that.updateEntity();
            else that.addEntity();
        }
    }

    onCancel() { history.back(); }

    getEntityById(id: string) {
        let that = this;
        if (id) {
            setTimeout(_ => {
                that.webApiServices.getSingleAsync(that.entityType, id).then((result: IResultMessage) => {
                    if (result.resultStatus == ResultStatus.Successful)
                        result.dataResult.subscribe((res: any) => {
                            that.entity = res;
                            that.entityOriginal = Object.assign({}, that.entity);
                        });
                    that.loading = false;
                });
            }, 1);
        }
    }

    addEntity() {
        let that = this;
        that.webApiServices.addEntityAsync(that.entityType, that.entity).then((result: IResultMessage) => {
            if (result.resultStatus == ResultStatus.Successful) {
                that.notificationService.alertEvent.next({ severity: 'success', summary: 'Thông Báo', detail: 'Đã thêm mới dữ liệu thành công!' });
                that.router.navigate([that.redirectLink]);
            }
            else
                that.notificationService.alertEvent.next({ severity: 'error', summary: 'Thông Báo Lỗi', detail: 'Thêm mới liệu thất bại!' });
            that.loading = false;
        }).catch((error: any) => {
            that.loading = false;
            that.notificationService.alertEvent.next({ severity: 'error', summary: 'Thông Báo Lỗi', detail: 'Thêm mới dữ liệu thất bại!' });
        });
    }

    updateEntity() {
        let that = this;
        that.webApiServices.updateEntityAsync(that.entityType, that.entity).then((result: IResultMessage) => {
            if (result.resultStatus == ResultStatus.Successful) {
                that.notificationService.alertEvent.next({ severity: 'success', summary: 'Thông Báo', detail: 'Đã cập nhật dữ liệu thành công!' });
                that.router.navigate([that.redirectLink]);
            }
            else
                that.notificationService.alertEvent.next({ severity: 'error', summary: 'Thông Báo Lỗi', detail: 'Cập nhật dữ liệu thất bại!' });
            that.loading = false;
        }).catch((error: any) => {
            that.loading = false;
            that.notificationService.alertEvent.next({ severity: 'error', summary: 'Thông Báo Lỗi', detail: 'Cập nhật dữ liệu thất bại!' });
        });
    }
}