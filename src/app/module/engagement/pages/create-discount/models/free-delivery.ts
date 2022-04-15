export class FreeDelivery {
  private minAmount: number;
  private minAmountOptedV: boolean;

  constructor() {
    this.minAmount = 0;
    this.minAmountOptedV = false;
  }

  public get _minAmount(): number {
    return this.minAmount;
  }

  public set _minAmount(minAmount: number) {
    this.minAmount = minAmount;
  }

  public get _minAmountOptedV(): boolean {
    return this.minAmountOptedV;
  }

  public set _minAmountOptedV(minAmountOptedV: boolean) {
    this.minAmountOptedV = minAmountOptedV;
  }
}
