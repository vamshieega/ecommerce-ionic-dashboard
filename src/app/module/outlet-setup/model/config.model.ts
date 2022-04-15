import { environment } from 'src/environments/environment';

export class ConfigurationModel {
  private businessCategory: String;
  private businessType: String;
  private delivery: DeliveryConfig;
  private order: OrderConfig;

  constructor() {
    this.businessCategory = 'b2b';
    this.businessType = '';
    this.delivery = new DeliveryConfig();
    this.order = new OrderConfig();
  }

  public get _businessCategory(): String {
    return this.businessCategory;
  }

  public set _businessCategory(businessCategory: String) {
    this.businessCategory = businessCategory;
  }

  public get _businessType(): String {
    return this.businessType;
  }

  public set _businessType(businessType: String) {
    this.businessType = businessType;
  }

  public get _delivery(): DeliveryConfig {
    return this.delivery;
  }

  public set _delivery(delivery: DeliveryConfig) {
    this.delivery = delivery;
  }

  public get _order(): OrderConfig {
    return this.order;
  }

  public set _order(order: OrderConfig) {
    this.order = order;
  }
}

export class DeliveryConfig {
  private chargeTypeV: string;
  private shareConfig: ShareConfig;
  private types: DeliveryTypes;
  private slotConfig: SlotConfig;
  private canSelfPickup: boolean;
  private deliveryMerchantId: string;
  private provider: String;
  private scheduleOrders: string;

  constructor() {
    this.shareConfig = new ShareConfig();
    this.chargeTypeV = 'cartValueLimit';
    this.canSelfPickup = false;
    this.types = new DeliveryTypes();
    this.deliveryMerchantId = '';
    this.slotConfig = new SlotConfig();
    this.provider = 'self';
    this.scheduleOrders = '';
  }
  public get _chargeTypeV(): string {
    return this.chargeTypeV;
  }
  public set _chargeTypeV(chargeTypeV: string) {
    this.chargeTypeV = chargeTypeV;
  }
  public get _shareConfig(): ShareConfig {
    return this.shareConfig;
  }
  public set _shareConfig(value: ShareConfig) {
    this.shareConfig = value;
  }

  public get _canSelfPickup(): boolean {
    return this.canSelfPickup;
  }
  public set _canSelfPickup(canSelfPickup: boolean) {
    this.canSelfPickup = canSelfPickup;
  }
  public get _types(): DeliveryTypes {
    return this.types;
  }

  public set _types(types: DeliveryTypes) {
    this.types = types;
  }
  public get _deliveryMerchantId(): string {
    return this.deliveryMerchantId;
  }

  public set _deliveryMerchantId(deliveryMerchantId: string) {
    this.deliveryMerchantId = deliveryMerchantId;
  }
  public get _slotConfig(): SlotConfig {
    return this.slotConfig;
  }
  public set _slotConfig(value: SlotConfig) {
    this.slotConfig = value;
  }
  public get _provider(): String {
      return this.provider;
  }

  public set _provider(provider: String) {
      this.provider = provider;
  }
  public get _scheduleOrders(): string {
    return this.scheduleOrders;
  }
  public set _scheduleOrders(scheduleOrders: string) {
      this.scheduleOrders = scheduleOrders;
  }
}

export class SlotConfig {
  private maxOrdersPerSlot: number;
  private advanceDays: number;
  private minDurationHr: number;

  constructor() {
    this.maxOrdersPerSlot = 10;
    this.advanceDays = 5;
    this.minDurationHr = 2;
  }

  public get _maxOrdersPerSlot(): number {
    return this.maxOrdersPerSlot;
  }
  public set _maxOrdersPerSlot(maxOrdersPerSlot: number) {
    this.maxOrdersPerSlot = maxOrdersPerSlot;
  }

  public get _advanceDays(): number {
    return this.advanceDays;
  }
  public set _advanceDays(value: number) {
    this.advanceDays = value;
  }

  public get _minDurationHr(): number {
    return this.minDurationHr;
  }
  public set _minDurationHr(value: number) {
    this.minDurationHr = value;
  }
}

export class DeliveryExceptionConfig {
  private exceptionValue: string;
  private status: string;
  private exceptionType: string;

  constructor() {
    this.exceptionValue = '5000';
    this.status = 'active';
    this.exceptionType = 'distance';
  }
  public get _exceptionValue(): string {
    return this.exceptionValue;
  }
  public set _exceptionValue(exceptionValue: string) {
    this.exceptionValue = exceptionValue;
  }
  public get _status(): string {
    return this.status;
  }
  public set _status(status: string) {
    this.status = status;
  }
  public get _exceptionType(): string {
    return this.exceptionType;
  }
  public set _exceptionType(exceptionType: string) {
    this.exceptionType = exceptionType;
  }
}

export class DeliveryTypes {
  private onDemand: Boolean;
  private scheduled: Boolean;

  constructor() {
    this.onDemand = false;
    this.scheduled = false;
  }

  public get _onDemand(): Boolean {
    return this.onDemand;
  }

  public set _onDemand(onDemand: Boolean) {
    this.onDemand = onDemand;
  }

  public get _scheduled(): Boolean {
    return this.scheduled;
  }

  public set _scheduled(scheduled: Boolean) {
    this.scheduled = scheduled;
  }
}

export class ShareConfig {
  private method: string; //['cartValueLimit', 'share', 'byDistance'],
  private unit: string; //  enum: ['amount', 'percent','perKm'],
  private ranges: RangeConfig[];
  private customer: number;
  private partner: number;

  constructor() {
    this.method = 'cartValueLimit';
    this.unit = 'amount';
    this.ranges = [new RangeConfig()];
    this.customer = 0;
    this.partner = 0;
  }

  public get _method(): string {
    return this.method;
  }
  public set _method(value: string) {
    this.method = value;
  }

  public get _unit(): string {
    return this.unit;
  }
  public set _unit(value: string) {
    this.unit = value;
  }

  public get _ranges(): RangeConfig[] {
    return this.ranges;
  }
  public set _ranges(value: RangeConfig[]) {
    this.ranges = value;
  }

  public get _customer(): number {
    return this.customer;
  }
  public set _customer(value: number) {
    this.customer = value;
  }
  public get _partner(): number {
    return this.partner;
  }
  public set _partner(value: number) {
    this.partner = value;
  }
}

export class RangeConfig {
  private to: number;
  private from: number;
  private price: number;

  constructor() {
    this.to = 0;
    this.from = 0;
    this.price = 0;
  }

  public get _to(): number {
    return this.to;
  }
  public set _to(value: number) {
    this.to = value;
  }

  public get _from(): number {
    return this.from;
  }
  public set _from(value: number) {
    this.from = value;
  }

  public get _price(): number {
    return this.price;
  }
  public set _price(value: number) {
    this.price = value;
  }
}

export class OrderConfig {
  private acceptanceMode: String;
  private minOrderAmount: Number;
  private packingCharges: PackingCharges;
  private paymentMethods: PaymentMethods;

  constructor() {
    this.packingCharges = new PackingCharges();
    this.paymentMethods = new PaymentMethods();
    this.acceptanceMode = 'manual';
    this.minOrderAmount = 0;
  }

  public get _acceptanceMode(): String {
    return this.acceptanceMode;
  }

  public set _acceptanceMode(acceptanceMode: String) {
    this.acceptanceMode = acceptanceMode;
  }

  public get _minOrderAmount(): Number {
    return this.minOrderAmount;
  }

  public set _minOrderAmount(minOrderAmount: Number) {
    this.minOrderAmount = minOrderAmount;
  }

  public get _packingCharges(): PackingCharges {
    return this.packingCharges;
  }

  public set _packingCharges(packingCharges: PackingCharges) {
    this.packingCharges = packingCharges;
  }

  public get _paymentMethods(): PaymentMethods {
    return this.paymentMethods;
  }

  public set _paymentMethods(paymentMethods: PaymentMethods) {
    this.paymentMethods = paymentMethods;
  }
}

export class PackingCharges {
  private chargesPer: string;
  private on: String;

  constructor() {
    this.chargesPer = 'quantity';
    this.on = 'item';
  }

  public get _chargesPer(): string {
    return this.chargesPer;
  }

  public set _chargesPer(chargesPer: string) {
    this.chargesPer = chargesPer;
  }

  public get _on(): String {
    return this.on;
  }

  public set _on(on: String) {
    this.on = on;
  }
}

export class PaymentMethods {
  private cod: boolean;
  private online: boolean;
  private wallet: boolean;

  constructor() {
    this.cod = false;
    this.online = true;
    this.wallet = false;
  }

  public get _cod(): boolean {
    return this.cod;
  }

  public set _cod(cod: boolean) {
    this.cod = cod;
  }

  public get _online(): boolean {
    return this.online;
  }

  public set _online(online: boolean) {
    this.online = online;
  }

  public get _wallet(): boolean {
    return this.wallet;
  }

  public set _Wallet(wallet: boolean) {
    this.wallet = wallet;
  }
}
