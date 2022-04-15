export class FinancialDetails {
    private outletId: string;
    private step: string;
    private bankName: string;
    private accountNumber: string;
    private holderName: string;
    private ifscCode: string;
    private status: string;
     isAccountVerified: boolean;

    constructor() {
        this.outletId = '';
        this.bankName = '';
        this.accountNumber = '';
        this.holderName = '';
        this.ifscCode = '';
        this.step = 'finance';
        this.status = '';
    }

    public get _status(): string {
        return this.status;
    }
    public get _outletId(): string {
        return this.outletId;
    }
    public get _step(): string {
        return this.step;
    }
    public get _bankName(): string {
        return this.bankName;
    }

    public get _accountNumber(): string {
        return this.accountNumber;
    }
    public get _holderName(): string {
        return this.holderName;
    }
    public get _ifscCode(): string {
        return this.ifscCode;
    }
    public set _status(value: string) {
        this.status = value;
    }
    public set _step(value: string) {
        this.step = value;
    }
    public set _outletId(value: string) {
        this.outletId = value;
    }
    public set _bankName(value: string) {
        this.bankName = value;
    }

    public set _accountNumber(value: string) {
        this.accountNumber = value;
    }
    public set _holderName(value: string) {
        this.holderName = value;
    }

    public set _ifscCode(value: string) {
        this.ifscCode = value;
    }

}