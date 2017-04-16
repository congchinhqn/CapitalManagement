export class SortingType {
    public static None: SortingType = new SortingType('sorting');
    public static Asc: SortingType = new SortingType('sorting_asc');
    public static Desc: SortingType = new SortingType('sorting_desc');

    public constructor(private _cssClass: string) {
    }

    public get cssClass(): string {
        return this._cssClass;
    }
}