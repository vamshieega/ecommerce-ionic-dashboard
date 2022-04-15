export class TrackingModel {
    private createdOn: String;
    private createdBy: String;
    private lastModifiedOn: String;
    private lastModifiedBy: String;

    constructor() {
        this.createdBy = '';
        this.createdOn = new Date().toISOString();
        this.lastModifiedBy = '';
        this.lastModifiedOn = new Date().toISOString();
    }


    public get _createdOn(): String {
        return this.createdOn;
    }

    public get _createdBy(): String {
        return this.createdBy;
    }

    public get _lastModifiedOn(): String {
        return this.lastModifiedOn;
    }

    public get _lastModifiedBy(): String {
        return this.lastModifiedBy;
    }


    public set _createdOn(value: String) {
        this.createdOn = value;
    }

    public set _createdBy(value: String) {
        this.createdBy = value;
    }

    public set _lastModifiedOn(value: String) {
        this.lastModifiedOn = value;
    }

    public set _lastModifiedBy(value: String) {
        this.lastModifiedBy = value;
    }

}
