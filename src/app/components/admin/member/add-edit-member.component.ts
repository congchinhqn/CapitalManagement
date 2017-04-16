import { Component, AfterViewInit, OnInit, NgZone, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { MemberModel } from './../../../models/member.model';
import { ConfigModel } from './../../../models/config.model';

import {
    IEmptyConstruct, IWebApiServices, IResultMessage, ResultStatus, NotificationService,
    CustomValidators, WEBAPISERVICE, AddOrEditComponent
} from './../../../../core/index';

@Component({
    selector: "add-edit-member",
    templateUrl: `./add-edit-member.component.html`
})

export class AddOrEditMemberComponent extends AddOrEditComponent implements OnInit {

    addOrEditForm: FormGroup;
    entity: MemberModel = new MemberModel();
    entityType: IEmptyConstruct = MemberModel;
    entityId: string;
    redirectLink: string = '/members';
    entityOriginal: MemberModel = new MemberModel();

    private config: ConfigModel = new ConfigModel();

    constructor(public fb: FormBuilder,
        public activatedRoute: ActivatedRoute,
        public router: Router,
        private datePipe: DatePipe,
        @Inject(WEBAPISERVICE) public webApiServices: IWebApiServices,
        @Inject(NotificationService) public notificationService: NotificationService) {

        super(fb, webApiServices, activatedRoute, router, notificationService);

        this.addOrEditForm = this.fb.group({
            id: [""],
            Name: ["", Validators.required],
            Phone: ["", Validators.required],
            Email: [""],
            Address: [""],
            OriginalAmount: ["", Validators.required],
            RefundAmount: [""],
            Refunded: [""],
            CreateDate: [""],
            Status: [""]
        });
    }

    ngOnInit() {
        let that = this;
        try {
            that.activatedRoute.params.subscribe((params: Params) => {
                that.entityId = params['id'];
                that.loading = that.entityId != null;
                that.getEntityById(that.entityId);
                that.loadConfig();
            });
        } catch (e) { }
    }

    onSubmitCustom(event: any) {
        let that = this;
        if (that.entity && that.addOrEditForm.valid) {
            this.loading = true;
            if (that.entityId) {
                that.updateConfig();
                that.updateEntity();
            }
            else {
                that.entity.CreateMonth = new Date().getMonth();
                that.entity.CreateDate = that.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
                that.updateConfig();
                that.addEntity();
            }
        }
    }

    private loadConfig() {
        let that = this;
        setTimeout(_ => {
            that.webApiServices.getSingleAsync(ConfigModel, 'b806bb31-ab9b-44d7-a111-f359a8260a48').then((result: IResultMessage) => {
                if (result.resultStatus == ResultStatus.Successful)
                    result.dataResult.subscribe((res: any) => {
                        that.config = res;
                    });
                that.loading = false;
            });
        }, 1);
    }

    private updateConfig() {
        let that = this;
        if (that.entityOriginal.OriginalAmount != that.entity.OriginalAmount) {
            that.config.TotalAmount -= (that.entityOriginal.OriginalAmount - that.entityOriginal.RefundAmount);
            that.config.TotalAmount += (that.entity.OriginalAmount - that.entity.RefundAmount);

            that.webApiServices.updateEntityAsync(ConfigModel, that.config).then((result: IResultMessage) => {
                if (result.resultStatus == ResultStatus.Successful)
                    result.dataResult.subscribe((res: any) => {
                        that.config = res;
                    });
            });
        }
    }
}