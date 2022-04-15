export class Percentage {
  private discountValue: number;
  private maxDiscount: number;
  private maxDiscountOptedV: boolean;

  constructor() {
    this.discountValue = null;
    this.maxDiscount = null;
    this.maxDiscountOptedV = false;
  }

  public get _discountValue(): number {
    return this.discountValue;
  }

  public set _discountValue(discountValue: number) {
    this.discountValue = discountValue;
  }

  public get _maxDiscount(): number {
    return this.maxDiscount;
  }

  public set _maxDiscount(maxDiscount: number) {
    this.maxDiscount = maxDiscount;
  }

  public get _maxDiscountOptedV(): boolean {
    return this.maxDiscountOptedV;
  }

  public set _maxDiscountOptedV(maxDiscountOptedV: boolean) {
    this.maxDiscountOptedV = maxDiscountOptedV;
  }
}
