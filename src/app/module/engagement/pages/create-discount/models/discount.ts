import { Bogo } from "./bogo";
import { FreeDelivery } from "./free-delivery";
import { Net } from "./net";
import { Percentage } from "./percentage";

export class Discount {
    private outletIds: string[];
    private couponId: string;
    private couponCode: string;
    private couponName: string;
    private discountType: string;
    private freeDelivery: FreeDelivery;
    private net: Net;
    private percentage: Percentage;
    private bogo: Bogo;
    private items: string[];
    private categories: string[];
    private cart: Cart;
    private users: string[];
    private usage: Usage;
    private budget: number;
    private activeSlots: ActiveSlots;
    private status: string;
    private terms: string[];
    private couponAppliesToV: string;
    private customerEligibilityV: string;
    private advancedSettingSelectedV: boolean;
    private outletSelectionTypeV: string;

    constructor() {
        this.outletIds = [];
        this.couponId = '';
        this.couponCode = '';
        this.couponName = '';
        this.discountType = '';
        this.freeDelivery = new FreeDelivery();
        this.net = new Net();
        this.percentage = new Percentage();
        this.bogo = new Bogo();
        this.items = [];
        this.categories = [];
        this.cart = new Cart();
        this.users = [];
        this.budget = 0;
        this.activeSlots = new ActiveSlots();
        this.status = 'active';
        this.terms = [];
        this.couponAppliesToV = 'all';
        this.customerEligibilityV = 'everyone';
        this.advancedSettingSelectedV = false;
        this.outletSelectionTypeV = 'single';
        this.usage = new Usage();
    }

    public get _outletIds(): string[] {
        return this.outletIds;
    }

    public set _outletIds(outletIds: string[]) {
        this.outletIds = outletIds;
    }

    public get _couponId(): string {
        return this.couponId;
    }

    public set _couponId(couponId: string) {
        this.couponId = couponId;
    }

    public get _couponCode(): string {
        return this.couponCode;
    }

    public set _couponCode(couponCode: string) {
        this.couponCode = couponCode;
    }

    public get __couponName(): string {
        return this.couponName;
    }

    public set _couponName(couponName: string) {
        this.couponName = couponName;
    }

    public get _discountType(): string {
        return this.discountType;
    }

    public set _discountType(discountType: string) {
        this.discountType = discountType;
    }

    public get _freeDelivery(): FreeDelivery {
        return this.freeDelivery;
    }

    public set _freeDelivery(freeDelivery: FreeDelivery) {
        this.freeDelivery = freeDelivery;
    }

    public get _net(): Net {
        return this.net;
    }

    public set _net(net: Net) {
        this.net = net;
    }

    public get _percentage(): Percentage {
        return this.percentage;
    }

    public set _percentage(percentage: Percentage) {
        this.percentage = percentage;
    }

    public get _bogo(): Bogo {
        return this.bogo;
    }

    public set _bogo(bogo: Bogo) {
        this.bogo = bogo;
    }

    public get _items(): string[] {
        return this.items;
    }

    public set _items(items: string[]) {
        this.items = items;
    }

    public get _categories(): string[] {
        return this.categories;
    }

    public set _categories(categories: string[]) {
        this.categories = categories;
    }

    public get _cart(): Cart {
        return this.cart;
    }

    public set _cart(cart: Cart) {
        this.cart = cart;
    }

    public get _users(): string[] {
        return this.users;
    }

    public set _users(users: string[]) {
        this.users = users;
    }

    public get _usage(): Usage {
        return this.usage;
    }

    public set _usage(usage: Usage) {
        this.usage = usage;
    }

    public get _budget(): number {
        return this.budget;
    }

    public set _budget(budget: number) {
        this.budget = budget;
    }

    public get _activeSlots(): ActiveSlots {
        return this.activeSlots;
    }

    public set _activeSlots(activeSlots: ActiveSlots) {
        this.activeSlots = activeSlots;
    }

    public get _status(): string {
        return this.status;
    }

    public set _status(status: string) {
        this.status = status;
    }

    public get _terms(): string[] {
        return this.terms;
    }

    public set _terms(terms: string[]) {
        this.terms = terms;
    }

    public get _couponAppliesToV(): string {
        return this.couponAppliesToV;
    }

    public set _couponAppliesToV(couponAppliesToV: string) {
        this.couponAppliesToV = couponAppliesToV;
    }

    public get _customerEligibilityV(): string {
        return this.customerEligibilityV;
    }

    public set _customerEligibilityV(customerEligibilityV: string) {
        this.customerEligibilityV = customerEligibilityV;
    }

    public get _advancedSettingSelectedV(): boolean {
        return this.advancedSettingSelectedV;
    }

    public set _advancedSettingSelectedV(advancedSettingSelectedV: boolean) {
        this.advancedSettingSelectedV = advancedSettingSelectedV;
    }

    public get _outletSelectionTypeV(): string {
        return this.outletSelectionTypeV;
    }

    public set _outletSelectionTypeV(outletSelectionTypeV: string) {
        this.outletSelectionTypeV = outletSelectionTypeV;
    }

}

export class Cart {
    private minAmount: number;
    private minQty: number;
    private minRequirementV: string;

    constructor() {
        this.minAmount = null;
        this.minQty = null;
        this.minRequirementV = 'none';
    }

    public get _minAmount(): number {
        return this.minAmount;
    }

    public set _minAmount(minAmount: number) {
        this.minAmount = minAmount;
    }

    public get _minQty(): number {
        return this.minQty;
    }

    public set _minQty(minQty: number) {
        this.minQty = minQty;
    }

    public get _minRequirementV(): string {
        return this.minRequirementV;
    }

    public set _minRequirementV(minRequirementV: string) {
        this.minRequirementV = minRequirementV;
    }

}
export class Usage {
    private totalTimes: number;
    private perCustomer: PerCustomer
    private usageLimitV: string;

    constructor() {
        this.totalTimes = null;
        this.perCustomer = new PerCustomer();
        this.usageLimitV = 'per-customer';
    }

    public get _totalTimes(): number {
        return this.totalTimes;
    }

    public set _totalTimes(totalTimes: number) {
        this.totalTimes = totalTimes;
    }

    public get _perCustomer(): PerCustomer {
        return this.perCustomer;
    }

    public set _perCustomer(perCustomer: PerCustomer) {
        this.perCustomer = perCustomer;
    }

    public get _usageLimitV(): string {
        return this.usageLimitV;
    }

    public set _usageLimitV(usageLimitV: string) {
        this.usageLimitV = usageLimitV;
    }

}
export class PerCustomer {
    private intervalUnit: string;
    private intervalValue: number;
    private limit: number;

    constructor() {
        this.intervalUnit = 'days';
        this.intervalValue = 1;
        this.limit = 0;
    }

    public get _intervalUnit(): string {
        return this.intervalUnit;
    }

    public set _intervalUnit(intervalUnit: string) {
        this.intervalUnit = intervalUnit;
    }

    public get _intervalValue(): number {
        return this.intervalValue;
    }

    public set _intervalValue(intervalValue: number) {
        this.intervalValue = intervalValue;
    }

    public get _limit(): number {
        return this.limit;
    }

    public set _limit(limit: number) {
        this.limit = limit;
    }

}
export class ActiveSlots {
    private category: string;
    private weekdays: Array<number>;
    private dateSpan: DateSpan;
    private slots: Slots;

    constructor() {
        this.category = 'all-day';
        this.weekdays = [];
        this.dateSpan = new DateSpan();
        this.slots = new Slots();
    }

    public get _category(): string {
        return this.category;
    }

    public set _category(category: string) {
        this.category = category;
    }

    public get _weekdays(): Array<number> {
        return this.weekdays;
    }

    public set _weekdays(weekdays: Array<number>) {
        this.weekdays = weekdays;
    }

    public get _dateSpan(): DateSpan {
        return this.dateSpan;
    }

    public set _dateSpan(dateSpan: DateSpan) {
        this.dateSpan = dateSpan;
    }

    public get _slots(): Slots {
        return this.slots;
    }

    public set _slots(slots: Slots) {
        this.slots = slots;
    }
}

export class DateSpan {
    private startDate;
    private endDate;

    constructor() {
        this.startDate = new Date(new Date().setMonth(new Date().getMonth())).toISOString();
        this.endDate = new Date(new Date().setMonth(new Date().getMonth() + 12)).toISOString();
        //this.endDate = { year: new Date().getFullYear() + 1, month: new Date().getMonth() + 1, day: new Date().getDate() - 1 };
    }

    public get _startDate(): string {
        return this.startDate;
    }

    public set _startDate(startDate: string) {
        this.startDate = startDate;
    }

    public get _endDate(): string {
        return this.endDate;
    }

    public set _endDate(endDate: string) {
        this.endDate = endDate;
    }

}

export class Slots {
    private startTime: string;
    private endTime: string;

    constructor() {
        this.startTime = '0000';
        this.endTime = '2359';
    }

    public get _startTime(): string {
        return this.startTime;
    }

    public set _startTime(startTime: string) {
        this.startTime = startTime;
    }

    public get _endTime(): string {
        return this.endTime;
    }

    public set _endTime(endTime: string) {
        this.endTime = endTime;
    }

}
