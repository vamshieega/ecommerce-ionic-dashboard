export class AuditDetails {

    private step: string;
    private scheduledDate:string;
    private status:string;
    private actionDate:string;

    constructor() {
        this.step = "audit";
        this.scheduledDate = new Date().toISOString();
        this.status = "";
        this.actionDate = new Date().toISOString();
    }
    public get _step(): string {
        return this.step;
    }
    public set _step(value: string) {
        this.step = value;
    }

    public get _scheduledDate(): string {
        return this.scheduledDate;
    }
    public set _scheduledDate(value: string) {
        this.scheduledDate = value;
    }

    public get _status(): string {
        return this.status;
    }
    public set _status(value: string) {
        this.status = value;
    }

    public get _actionDate(): string {
        return this.actionDate;
    }
    public set _actionDate(value: string) {
        this.actionDate = value;
    }
}