export class Net {
  private discountValue: number;

  constructor() {
    this.discountValue = null;
  }

  public get _discountValue(): number {
    return this.discountValue;
  }

  public set _discountValue(discountValue: number) {
    this.discountValue = discountValue;
  }
}
