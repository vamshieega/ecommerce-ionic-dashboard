export class AddressModel {
    private name: string;
    private addressLine: string;
    private city: string;
    private state: string;
    private pincode: number;
    private contact: number;
    private longLat: [];
    private locality: String;


    constructor() {
        this.name = '';
        this.addressLine = '';
        this.city = '';
        this.state = '';
        this.pincode = null;
        this.contact = 0;
        this.longLat = [];
        this.locality = '';
    }


    public get _name(): string {
        return this.name;
    }

    public set _name(value: string) {
        this.name = value;
    }

    public get _addressLine(): string {
        return this.addressLine;
    }

    public set _addressLine(value: string) {
        this.addressLine = value;
    }

    public get _contact(): number {
        return this.contact;
    }

    public set _contact(value: number) {
        this.contact = value;
    }

    public get _city(): string {
        return this.city;
    }

    public set _city(value: string) {
        this.city = value;
    }


    public get _state(): string {
        return this.state;
    }

    public set _state(value: string) {
        this.state = value;
    }


    public get _pincode(): number {
        return this.pincode;
    }

    public set _pincode(value: number) {
        this.pincode = value;
    }


    public get _longLat(): [] {
        return this.longLat;
    }


    public get _locality(): String {
        return this.locality;
    }


    public set _longLat(value: []) {
        this.longLat = value;
    }

    public set _locality(value: String) {
        this.locality = value;
    }

}
