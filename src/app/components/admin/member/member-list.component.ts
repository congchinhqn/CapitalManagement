import { Component, AfterViewInit, OnInit, NgZone, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MemberModel } from './../../../models/member.model';

import {
    IEmptyConstruct, IDataStructure, IGridButton, ButtonActionType,
    IWebApiServices, IResultMessage, ResultStatus, NotificationService,
    GridViewControl, PaginatorControl, IFilter, OperatorType, WEBAPISERVICE
} from './../../../../core/index';

@Component({
    selector: "member-list",
    templateUrl: `./member-list.component.html`
})

export class MemberListComponent implements OnInit {

    @ViewChild("grid") grid: GridViewControl;
    private entityType: IEmptyConstruct = MemberModel;
    private entity: MemberModel = new MemberModel();
    private filters: IFilter[] = [];

    constructor(@Inject(WEBAPISERVICE) private webApiServices: IWebApiServices,
        private router: Router,
        @Inject(NotificationService) private notificationService: NotificationService) { }

    ngOnInit() { }

    private onActionEvent(event: any) {
        let that = this;
        var item = <IDataStructure>event.data;
        var button = <IGridButton>event.action;
        switch (button.Action) {
            case ButtonActionType.Add:
                that.onAddEntity(button);
                break;
            case ButtonActionType.Edit:
                that.onEditEntity(button, item);
                break;
            case ButtonActionType.Delete:
                that.onDeleteEntity(item);
                break;
        }
    }

    private onAddEntity(button: IGridButton) {
        this.router.navigate([button.Link]);
    }

    private onEditEntity(button: IGridButton, entity: any) {
        if (entity) this.router.navigate([button.Link, entity.Id]);
    }

    private onDeleteEntity(entity: any) {
        let that = this;
        if (entity) {
            that.webApiServices.deleteEntityAsync(MemberModel, entity.Id).then((result: IResultMessage) => {
                if (result.resultStatus == ResultStatus.Successful)
                    that.notificationService.alertEvent.next({
                        severity: 'success',
                        summary: "Thông Báo",
                        detail: "Đã hủy bỏ thành viên thành công"
                    });
                that.grid.loadData();
            });
        }
    }

    private onLoadDataEvent(data: any) {
        let that = this;
        // that.filters = [];
        // if (that.entity.Name)
        //     that.filters.push({ fieldName: 'Name', operator: OperatorType.CONTAINS, value: that.entity.Name });
        that.grid.loadData();
    }
}