import { IDataStructure, BaseEntity, FieldType, SortingType, ButtonActionType, IGridHeader, IGridButton, ButtonLocation } from './../../core/index';

export class ConfigModel implements IDataStructure {
    public Id: string = '';
    public TotalAmount?: number = 0;
    public TotalCapital?: number = 0;
    public CreateDate: string = '';
    public Status?: number = 1;

    getModuleName(): string { return ''; }
    getEntityName(): string { return 'Configs'; }

    getHeader(): IGridHeader[] {
        return <IGridHeader[]>[
            { Name: "Name", Title: "Họ Tên", FieldType: FieldType.Text, SortingType: SortingType.None, Width: "20%" },
            { Name: "Phone", Title: "Điện Thoại", FieldType: FieldType.Text, SortingType: SortingType.None, Width: "15%" },
            { Name: "OriginalAmount", Title: "Tiền Khởi Đầu", FieldType: FieldType.Text, SortingType: SortingType.None, Width: "15%" },
            { Name: "RefundAmount", Title: "Tiền Hoàn Trả", FieldType: FieldType.Text, SortingType: SortingType.None, Width: "15%" },
            { Name: "CreateDate", Title: "Ngày Đăng Ký", FieldType: FieldType.Date, SortingType: SortingType.None, Width: "20%" },
        ];
    }

    getButton(): IGridButton[] {
        return <IGridButton[]>[
            { Title: "Thêm Mới", Icon: "fa fa-plus", Class: 'btn btn-primary', Link: "/members/add", Location: ButtonLocation.LeftTop, Action: ButtonActionType.Add, Diabled: false },
            { Title: "Sửa", Icon: "fa fa-pencil", Class: 'btn btn-default pull-right', Link: "/members/edit", Location: ButtonLocation.InGrid, Action: ButtonActionType.Edit, Diabled: false },
            { Title: "Xóa", Icon: "fa fa-trash", Class: 'btn btn-danger pull-right', Link: "", Location: ButtonLocation.InGrid, Action: ButtonActionType.Delete, Diabled: false },
        ];
    }

    public setModelData(data: any) {
        this.Id = data.Id;
        this.TotalAmount = data.TotalAmount;
        this.TotalCapital = data.TotalCapital;
        this.CreateDate = data.CreateDate;
        this.Status = data.Status;
    }
}