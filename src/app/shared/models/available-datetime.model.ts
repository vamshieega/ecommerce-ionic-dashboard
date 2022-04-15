
export class AvailableDateTime {
    private outletId: string;
    private itemId: string;
    private nextAvailable: string;
    private hours: number;
    private minutes: number;
    private status: string;

    constructor() {
        this.outletId = '';
        this.itemId = '';
        this.nextAvailable = new Date().toISOString();
        this.hours = 0;
        this.minutes = 0;
        this.status = '';
    }

    public get _outletId(): string {
        return this.outletId;
    }

    public get _itemId(): string {
        return this.itemId;
    }

    public get _nextAvailable(): string {
        return this.nextAvailable;
    }

    public get _hours(): number {
        return this.hours;
    }

    public get _minutes(): number {
        return this.minutes;
    }

    public get _status(): string {
        return this.status;
    }

    public set _outletId(value: string) {
        this.outletId = value;
    }

    public set _itemId(value: string) {
        this.itemId = value;
    }

    public set _nextAvailable(value: string) {
        this.nextAvailable = value;
    }

    public set _hours(value: number) {
        this.hours = value;
    }

    public set _minutes(value: number) {
        this.minutes = value;
    }

    public set _status(value: string) {
        this.status = value;
    }



}