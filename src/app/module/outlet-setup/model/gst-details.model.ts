export class GSTInDetails {
    private outletId: string;
    private step: string;
    private gstinNumber: string;
    private gstinType: string;
    private gstinEntered: boolean;
    private gstApplicableOn: string;
    private gstinPercent: number;

    constructor() {
        this.outletId = '';
        this.step = 'gstin';
        this.gstinNumber = '';
        this.gstinType = 'composition';
        this.gstinEntered = false;
        this.gstApplicableOn = 'item';
        this.gstinPercent = 0;

    }

    public get _outletId(): string {
        return this.outletId;
    }

    public get _step(): string {
        return this.step;
    }

    public get _gstinNumber(): string {
        return this.gstinNumber;
    }

    public get _gstinType(): string {
        return this.gstinType;
    }

    public get _gstinEntered(): boolean {
        return this.gstinEntered;
    }

    public get _gstApplicableOn(): string {
        return this.gstApplicableOn;
    }

    public get _gstinPercent(): number {
        return this.gstinPercent;
    }

    public set _gstApplicableOn(value: string) {
        this._gstApplicableOn = value;
    }
    public set _outletId(value: string) {
        this.outletId = value;
    }

    public set _step(value: string) {
        this.step = value;
    }

    public set _gstinNumber(value: string) {
        this.gstinNumber = value;
    }

    public set _gstinType(value: string) {
        this.gstinType = value;
    }

    public set _gstinEntered(value: boolean) {
        this.gstinEntered = value;
    }

    public set _gstinPercent(value: number) {
        this.gstinPercent = value;
    }

}