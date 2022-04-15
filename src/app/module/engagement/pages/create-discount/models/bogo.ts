

export class Bogo {
    private satisfies: Satisfies;
    private gets: Gets;

    constructor() {
        this.satisfies = new Satisfies();
        this.gets = new Gets();
    }
    public get _satisfies(): Satisfies {
        return this.satisfies;
    }

    public set _satisfies(satisfies: Satisfies) {
        this.satisfies = satisfies;
    }

    public get _gets(): Gets {
        return this.gets;
    }

    public set _gets(gets: Gets) {
        this.gets = gets;
    }

}


export class Satisfies {
    private items: string[];
    private categories: string[];
    private qty: number;
    private amount: number;
    private buysV: string;
    private itemSelectionV: string;

    constructor() {
        this.items = [];
        this.categories = [];
        this.qty = null;
        this.amount = null;
        this.buysV = 'min-item';
        this.itemSelectionV = 'items';

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

    public get _qty(): number {
        return this.qty;
    }

    public set _qty(qty: number) {
        this.qty = qty;
    }

    public get _amount(): number {
        return this.amount;
    }

    public set _amount(amount: number) {
        this.amount = amount;
    }

    public get _buysV(): string {
        return this.buysV;
    }

    public set _buysV(buysV: string) {
        this.buysV = buysV;
    }

    public get _itemSelectionV(): string {
        return this.itemSelectionV;
    }

    public set _itemSelectionV(itemSelectionV: string) {
        this.itemSelectionV = itemSelectionV;
    }

}

export class Gets {
    private qty: number;
    private withDiscount: number;
    private items: string[];
    private categories: string[];
    private perOrderTimes: number;
    private atDiscountedValueV: string;
    private maxPerOrderV: boolean;
    private itemSelectionV: string;

    constructor() {
        this.qty = null;
        this.withDiscount = null;
        this.items = [];
        this.categories = [];
        this.perOrderTimes = 1;
        this.atDiscountedValueV = 'free';
        this.maxPerOrderV = true;
        this.itemSelectionV = 'items';

    }

    public get _qty(): number {
        return this.qty;
    }

    public set _qty(qty: number) {
        this.qty = qty;
    }

    public get _withDiscount(): number {
        return this.withDiscount;
    }

    public set _withDiscount(withDiscount: number) {
        this.withDiscount = withDiscount;
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

    public get _perOrderTimes(): number {
        return this.perOrderTimes;
    }

    public set _perOrderTimes(perOrderTimes: number) {
        this.perOrderTimes = perOrderTimes;
    }

    public get _atDiscountedValueV(): string {
        return this.atDiscountedValueV;
    }

    public set _atDiscountedValueV(atDiscountedValueV: string) {
        this.atDiscountedValueV = atDiscountedValueV;
    }

    public get _maxPerOrderV(): boolean {
        return this.maxPerOrderV;
    }

    public set _maxPerOrderV(maxPerOrderV: boolean) {
        this.maxPerOrderV = maxPerOrderV;
    }

    public get _itemSelectionV(): string {
        return this.itemSelectionV;
    }

    public set _itemSelectionV(itemSelectionV: string) {
        this.itemSelectionV = itemSelectionV;
    }

}