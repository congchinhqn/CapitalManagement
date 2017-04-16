export enum ButtonActionType {
    Add,
    Edit,
    Delete,
    View,
    Print,
    Upload,
    Download
}

export enum ButtonLocation {
    LeftTop,
    RightTop,
    InGrid
}

export interface IGridButton {
    Title: string;
    Class?:string;
    Icon?: string;
    Action?: ButtonActionType;
    Location?: ButtonLocation;
    Diabled?: boolean;
    Link?: string;
    PublicEvent?: boolean;
}