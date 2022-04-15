export class BasicDetailsAddress {
    private addressLine: string;
    private apartmentAddress: string;
    private landmark: string;
    private city: string
    private state: string;
    private pincode: string;
    private countryCode: string;

    constructor() {
        this.addressLine = '';
        this.apartmentAddress = '';
        this.landmark = '';
        this.city = '';
        this.state = '';
        this.pincode = '';
        this.countryCode = 'IN';
    }

    public get _addressLine(): string {
        return this.addressLine;
    }

    public get _apartmentAddress(): string {
        return this.apartmentAddress;
    }

    public get _landmark(): string {
        return this.landmark;
    }
    public get _city(): string {
        return this.city;
    }
    public get _state(): string {
        return this.state;
    }

    public get _pincode(): string {
        return this.pincode;
    }

    public get _countryCode(): string {
        return this.countryCode;
    }

    public set _addressLine(value: string) {
        this.addressLine = value;
    }

    public set _apartmentAddress(value: string) {
        this.apartmentAddress = value;
    }

    public set _landmark(value: string) {
        this.landmark = value;
    }

    public set _city(value: string) {
        this.city = value;
    }
    public set _state(value: string) {
        this.state = value;
    }

    public set _pincode(value: string) {
        this.pincode = value;
    }

    public set _countryCode(value: string) {
        this.countryCode = value;
    }
}