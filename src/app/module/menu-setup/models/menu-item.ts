export class MenuItem {
    private category: string;
    private containsEgg: boolean;
    private description: string;
    private finalPrice: number;
    private gst: number;
    private imageUrl: any;
    private isVeg: boolean;
    private itemId: string;
    private name: string;
    private opSettingType: string;
    private originalPrice: number;
    private outletId: string;
    private outletName: string;
    private portionSize: number;
    private price: number;
    private ribbon: string;
    private subCategory: string;
    private unit: string;
    private packingCharges: PackingCharges;
    private discountAdded: boolean;
    private packingChargesAdded: boolean;
    private operationalHours: any;
    private menuScheduled: boolean

    constructor() {
        this.category = '';
        this.containsEgg = false;
        this.description = '';
        this.finalPrice = null;
        this.gst = null;
        this.imageUrl = '';
        this.isVeg = false;
        this.itemId = '';
        this.name = '';
        this.opSettingType = 'outlet';
        this.originalPrice = null;
        this.outletId = '';
        this.outletName = '';
        this.portionSize = null;
        this.price = null;
        this.ribbon = '';
        this.subCategory = '';
        this.unit = '';
        this.packingCharges = new PackingCharges();
        this.discountAdded = false;
        this.packingChargesAdded = false;
        this.operationalHours = [];
        this.menuScheduled = false;
    }
    public get _category(): string {
        return this.category;
    }

    public set _category(category: string) {
        this.category = category;
    }

    public get _containsEgg(): boolean {
        return this.containsEgg;
    }

    public set _containsEgg(containsEgg: boolean) {
        this.containsEgg = containsEgg;
    }

    public get _description(): string {
        return this.description;
    }

    public set _description(description: string) {
        this.description = description;
    }

    public get _finalPrice(): number {
        return this.finalPrice;
    }

    public set _finalPrice(finalPrice: number) {
        this.finalPrice = finalPrice;
    }

    public get _gst(): number {
        return this.gst;
    }

    public set _gst(gst: number) {
        this.gst = gst;
    }

    public get _imageUrl(): any {
        return this.imageUrl;
    }

    public set _imageUrl(imageUrl: any) {
        this.imageUrl = imageUrl;
    }

    public get _isVeg(): boolean {
        return this.isVeg;
    }

    public set _isVeg(isVeg: boolean) {
        this.isVeg = isVeg;
    }

    public get _itemId(): string {
        return this.itemId;
    }

    public set _itemId(itemId: string
    ) {
        this.itemId = itemId;
    }

    public get _name(): string {
        return this.name;
    }

    public set _name(name: string) {
        this.name = name;
    }

    public get _opSettingType(): string {
        return this.opSettingType;
    }

    public set _opSettingType(opSettingType: string) {
        this.opSettingType = opSettingType;
    }

    public get _originalPrice(): number {
        return this.originalPrice;
    }

    public set _originalPrice(originalPrice: number) {
        this.originalPrice = originalPrice;
    }

    public get _outletId(): string {
        return this.outletId;
    }

    public set _outletId(outletId: string) {
        this.outletId = outletId;
    }

    public get _outletName(): string {
        return this.outletName;
    }

    public set _outletName(outletName: string) {
        this.outletName = outletName;
    }

    public get _portionSize(): number {
        return this.portionSize;
    }

    public set _portionSize(portionSize: number) {
        this.portionSize = portionSize;
    }

    public get _price(): number {
        return this.price;
    }

    public set _price(price: number) {
        this.price = price;
    }

    public get _ribbon(): string {
        return this.ribbon;
    }

    public set _ribbon(ribbon: string) {
        this.ribbon = ribbon;
    }

    public get _subCategory(): string {
        return this.subCategory;
    }

    public set _subCategory(subCategory: string) {
        this.subCategory = subCategory;
    }

    public get _unit(): string {
        return this.unit;
    }

    public set _unit(unit: string
    ) {
        this.unit = unit;
    }

    public get _packingCharges(): PackingCharges {
        return this.packingCharges;
    }

    public set _packingCharges(packingCharges: PackingCharges) {
        this.packingCharges = packingCharges;
    }

    public get _discountAdded(): boolean {
        return this.discountAdded;
    }

    public set _discountAdded(discountAdded: boolean) {
        this.discountAdded = discountAdded;
    }

    public get _packingChargesAdded(): boolean {
        return this.packingChargesAdded;
    }

    public set _packingChargesAdded(packingChargesAdded: boolean) {
        this.packingChargesAdded = packingChargesAdded;
    }

    public get _operationalHours(): any {
        return this.operationalHours;
    }

    public set _operationalHours(operationalHours: any) {
        this.operationalHours = operationalHours;
    }

    public get _menuScheduled(): boolean {
        return this.menuScheduled;
    }

    public set _menuScheduled(menuScheduled: boolean) {
        this.menuScheduled = menuScheduled;
    }


}

export class PackingCharges {
    private charge: number;
    private chargesPer: string;

    constructor() {
        this.charge = 0;
        this.chargesPer = '';
    }

    public get _charge(): number {
        return this.charge;
    }

    public set _charge(charge: number) {
        this.charge = charge;
    }

    public get _chargesPer(): string {
        return this.chargesPer;
    }

    public set _chargesPer(chargesPer: string) {
        this.chargesPer = chargesPer;
    }

}