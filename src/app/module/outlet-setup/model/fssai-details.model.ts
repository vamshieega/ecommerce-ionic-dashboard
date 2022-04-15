
export class FssaiDetails {
    private outletId: string;
    private step: string;
    private lic: string;
    private companyName: string;
    private companyAddress: string;
    private city: string;
    private pincode: string;
    private state: string;
    private ownerName: string;
    private ownerMobile: string;
    private validUpto: string;
    private certificateLink: string;
    private status: string;
    private updateCert: boolean;
    private certificateName: string;
    private fssaiEntered: boolean;
    private registrationNum: string;

    constructor() {
        this.outletId = '';
        this.step = 'fssai';
        this.lic = '';
        this.companyName = '';
        this.companyAddress = '';
        this.city = '';
        this.state = '';
        this.pincode = '';
        this.ownerName = '';
        this.ownerMobile = '';
        this.validUpto = new Date().toISOString();
        this.certificateLink = '';
        this.status = '';
        this.updateCert = false;
        this.certificateName = '';
        this.registrationNum = '';
    }

    public get _outletId(): string {
        return this.outletId;
    }

    public get _step(): string {
        return this.step;
    }

    public get _lic(): string {
        return this.lic;
    }

    public get _companyName(): string {
        return this.companyName;
    }

    public get _companyAddress(): string {
        return this.companyAddress;
    }

    public get _city(): string {
        return this.city;
    }

    public get _pincode(): string {
        return this.pincode;
    }

    public get _state(): string {
        return this.state;
    }

    public get _ownerName(): string {
        return this.ownerName;
    }

    public get _ownerMobile(): string {
        return this.ownerMobile;
    }

    public get _validUpto(): string {
        return this.validUpto;
    }

    public get _certificateLink(): string {
        return this.certificateLink;
    }

    public get _status(): string {
        return this.status;
    }

    public get _updateCert(): boolean {
        return this.updateCert;
    }

    public get _certificateName(): string {
        return this.certificateName;
    }

    public get _registrationNum(): string {
        return this.registrationNum;
    }

    public set _outletId(value: string) {
        this.outletId = value;
    }

    public set _step(value: string) {
        this.step = value;
    }

    public set _lic(value: string) {
        this.lic = value;
    }

    public set _companyName(value: string) {
        this.companyName = value;
    }

    public set _companyAddress(value: string) {
        this.companyAddress = value;
    }

    public set _city(value: string) {
        this.city = value;
    }

    public set _pincode(value: string) {
        this.pincode = value;
    }

    public set _state(value: string) {
        this.state = value;
    }

    public set _ownerName(value: string) {
        this.ownerName = value;
    }

    public set _ownerMobile(value: string) {
        this.ownerMobile = value;
    }

    public set _validUpto(value: string) {
        this.validUpto = value;
    }

    public set _certificateLink(value: string) {
        this.certificateLink = value;
    }

    public set _status(value: string) {
        this.status = value;
    }

    public set _updateCert(value: boolean) {
        this.updateCert = value;
    }

    public set _certificateName(value: string) {
        this.certificateName = value;
    }

    public get _fssaiEntered(): boolean {
        return this.fssaiEntered;
    }

    public set _fssaiEntered(fssaiEntered: boolean) {
        this.fssaiEntered = fssaiEntered;
    }

    public set _registrationNum(value: string) {
        this.registrationNum = value;
    }

}