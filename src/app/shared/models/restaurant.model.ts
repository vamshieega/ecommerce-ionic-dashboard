import { AccountConfigModel } from "./accountConfig.model";
import { AddressModel } from "./address.model";
import { TrackingModel } from "./tracking.model";

export class BankDetailsModel {
    private accountName: String;
    private accountNumber: number;
    private ifscCode: String;
    private bankName: String;
    private branchName: String;

    constructor() {
        this.accountName = '';
        this.accountNumber = null;
        this.ifscCode = '';
        this.bankName = '';
        this.branchName = '';
    }

    public get _accountName(): String {
        return this.accountName;
    }


    public set _accountName(value: String) {
        this.accountName = value;
    }


    public get _accountNumber(): number {
        return this.accountNumber;
    }


    public set _accountNumber(value: number) {
        this.accountNumber = value;
    }


    public get _ifscCode(): String {
        return this.ifscCode;
    }


    public set _ifscCode(value: String) {
        this.ifscCode = value;
    }


    public get _bankName(): String {
        return this.bankName;
    }


    public set _bankName(value: String) {
        this.bankName = value;
    }


    public get _branchName(): String {
        return this.branchName;
    }


    public set _branchName(value: String) {
        this.branchName = value;
    }


}

class SubscriptionDetailsModel {
    private name: String;
    private date: String;
    private expDate: String;
    private payment: any;
    private planName: String;
    private tax: number;
    private subTotal: number;
    private promoCode: string;

    constructor() {
        this.name = '';
        this.date = '';
        this.expDate = '';
        this.planName = '';
        this.tax = 0;
        this.subTotal = 0;
        this.promoCode = '';
    }

    public get _name(): String {
        return this.name;
    }

    public set _name(value: String) {
        this.name = value;
    }

    public get _date(): String {
        return this.date;
    }

    public set _date(value: String) {
        this.date = value;
    }

    public get _expDate(): String {
        return this.expDate;
    }

    public set _expDate(value: String) {
        this.expDate = value;
    }

    public get _payment(): any {
        return this.payment;
    }

    public set _payment(value: any) {
        this.payment = value;
    }

    public get _planName(): String {
        return this.planName;
    }

    public set _planName(value: String) {
        this.planName = value;
    }



    public get _promoCode(): string {
        return this.promoCode;
    }

    public set _promoCode(value: string) {
        this.promoCode = value;
    }

    public get _subTotal(): number {
        return this.subTotal;
    }

    public set _subTotal(value: number) {
        this.subTotal = value;
    }

    public get _tax(): number {
        return this.tax;
    }

    public set _tax(value: number) {
        this.tax = value;
    }

}

export class RestaurantModel {

    private restId: String;
    private restName: String;
    private gstn: String;
    private fssai: number;
    private address: AddressModel;
    private cuisines: String[];
    private facilities: String[];
    private status: String;
    private imgUrl: String;
    private restEmail: String;
    private numberOfOutlets: number;
    private tracking: TrackingModel;
    private bankDetails: BankDetailsModel;
    private subscriptionDetails: [SubscriptionDetailsModel];
    private config: AccountConfigModel;
    private password: String;
    private confirmPassword: String;
    constructor() {
        this.restId = '';
        this.restName = '';
        this.gstn = '';
        this.fssai = null;
        this.address = new AddressModel();
        this.cuisines = [];
        this.facilities = [];
        this.status = '';
        this.imgUrl = '';
        this.restEmail = '';
        this.numberOfOutlets = 1;
        this.tracking = new TrackingModel();
        this.bankDetails = new BankDetailsModel();
        this.subscriptionDetails = [new SubscriptionDetailsModel()];
        this.config = new AccountConfigModel();
        this.password = '';
        this.confirmPassword = '';
    }


    public get _restId(): String {
        return this.restId;
    }

    public set _restId(value: String) {
        this.restId = value;
    }


    public get _restName(): String {
        return this.restName;
    }


    public set _restName(value: String) {
        this.restName = value;
    }


    public get _gstn(): String {
        return this.gstn;
    }

    public set _gstn(value: String) {
        this.gstn = value;
    }

    public get _fssai(): number {
        return this.fssai;
    }

    public set _fssai(value: number) {
        this.fssai = value;
    }

    public get _address(): AddressModel {
        return this.address;
    }

    public set _address(value: AddressModel) {
        this.address = value;
    }

    public get _cuisines(): String[] {
        return this.cuisines;
    }

    public set _cuisines(value: String[]) {
        this.cuisines = value;
    }

    public get _facilities(): String[] {
        return this.facilities;
    }

    public set _facilities(value: String[]) {
        this.facilities = value;
    }

    public get _status(): String {
        return this.status;
    }

    public set _status(value: String) {
        this.status = value;
    }

    public get _imgUrl(): String {
        return this.imgUrl;
    }

    public set _imgUrl(value: String) {
        this.imgUrl = value;
    }


    public get _tracking(): TrackingModel {
        return this.tracking;
    }

    public set _tracking(value: TrackingModel) {
        this.tracking = value;
    }

    public get _bankDetails(): BankDetailsModel {
        return this.bankDetails;
    }


    public set _bankDetails(value: BankDetailsModel) {
        this.bankDetails = value;
    }

    public get _subscriptionDetails(): [SubscriptionDetailsModel] {
        return this.subscriptionDetails;
    }

    public set _subscriptionDetails(value: [SubscriptionDetailsModel]) {
        this.subscriptionDetails = value;
    }

    public get _restEmail(): String {
        return this.restEmail;
    }

    public set _restEmail(value: String) {
        this.restEmail = value;
    }

    public get _numberOfOutlets(): number {
        return this.numberOfOutlets;
    }

    public set _numberOfOutlets(value: number) {
        this.numberOfOutlets = value;
    }

    public get _config(): AccountConfigModel {
        return this.config;
    }

    public set _config(value: AccountConfigModel) {
        this.config = value;
    }

    public get _password(): String {
        return this.password;
    }

    public set _password(password: String
    ) {
        this.password = password;
    }

    public get _confirmPassword(): String {
        return this.confirmPassword;
    }

    public set _confirmPassword(confirmPassword: String) {
        this.confirmPassword = confirmPassword;
    }
}

