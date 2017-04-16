export interface IFilter {
    fieldName: string;
    operator: string;
    value: any;
}

export class OperatorType {
    public static EQUAL: string = "equal";
    public static CONTAINS: string = "contains";
    public static STARTWITH: string = "startwith";
    public static ENDWITH: string = "endwith";
}