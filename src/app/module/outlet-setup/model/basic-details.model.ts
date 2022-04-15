import { BasicDetailsAddress } from './basic-details-address.madel';

export class BasicDetails {
    private step: string;
    private outletId: string;
    private outletName: string;
    private industry: string;
    private displayName: string;
    private countryCode: string;
    private mobile: string;
    // private mobile2: string;
    // private mobile3: string;
    private email: string;
    private address: BasicDetailsAddress;
    private outletLogo: string;
    private updateLogo: boolean;
    private logoName: string;
    private locality: string;
    private updateLocation: Boolean;
    private longLat: string[] = [];
    private lat: string;
    private long: string;
    private haveLongLat: boolean;

    constructor() {
        this.step = 'basic';
        this.outletId = '';
        this.outletName = '';
        this.displayName = '';
        // this.industry = '';
        this.mobile = '';
        this.address = new BasicDetailsAddress();
        this.longLat = [];
        this.outletLogo = '';
        this.logoName = null;
        this.updateLogo = false;
        this.updateLocation = false;
        this.locality = '';
        this.lat = '';
        this.long = '';
        this.haveLongLat = false;
        this.email = '';
        this.countryCode = '';
    }
    public get _logoName(): string {
        return this.logoName;
    }
    public get _outletLogo(): string {
        return this.outletLogo;
    }
    public get _updateLogo(): boolean {
        return this.updateLogo;
    }
    public get _step(): string {
        return this.step;
    }

    public get _outletId(): string {
        return this.outletId;
    }

    public get _outletName(): string {
        return this.outletName;
    }

    // public get _industry(): string {
    //     return this.industry;
    // }

    public get _countryCode(): string {
        return this.countryCode;
    }

    public get _mobile(): string {
        return this.mobile;
    }

    public get _locality(): string {
        return this.locality;
    }
    public get _address(): BasicDetailsAddress {
        return this.address;
    }

    public set _logoName(value: string) {
        this.logoName = value;
    }

    public set _outletLogo(value: string) {
        this.outletLogo = value;
    }

    public set _updateLogo(value: boolean) {
        this.updateLogo = value;
    }

    public set _step(value: string) {
        this.step = value;
    }

    public set _outletId(value: string) {
        this.outletId = value;
    }

    public set _outletName(value: string) {
        this.outletName = value;
    }

    // public set _industry(value: string) {
    //     this.industry = value;
    // }

    public set _countryCode(value: string) {
        this.countryCode = value;
    }

    public set _mobile(value: string) {
        this.mobile = value;
    }

    public set _address(value: BasicDetailsAddress) {
        this.address = value;
    }

    public get _longLat(): string[] {
        return this.longLat;
    }

    public set _longLat(value: string[]) {
        this.longLat = value;
    }

    public set _locality(value: string) {
        this.locality = value;
    }

    public get _updateLocation(): Boolean {
        return this.updateLocation;
    }

    public set _updateLocation(value: Boolean) {
        this.updateLocation = value;
    }


    public _getLat(): string {
        return this.lat;
    }

    public _setLat(lat: string): void {
        this.lat = lat;
    }

    public _getLong(): string {
        return this.long;
    }

    public _setLong(long: string): void {
        this.long = long;
    }

    public _isHaveLongLat(): boolean {
        return this.haveLongLat;
    }

    public _setHaveLongLat(haveLongLat: boolean): void {
        this.haveLongLat = haveLongLat;
    }


}