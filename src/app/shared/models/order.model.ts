/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
export class Order {
  private acceptanceWait: any[];
  private foodPreparation: any[];
  private foodReady: any[];
  private outForDelivery: any[];
  private pastOrders: any[];

  constructor() {
      this.acceptanceWait = [];
      this.foodPreparation = [];
      this.foodReady = [];
      this.outForDelivery = [];
      this.pastOrders = [];
  }

public get _outForDelivery(): any[] {
  return this.outForDelivery;
}

public get _pastOrders(): any[] {
  return this.pastOrders;
}

public set _outForDelivery(value: any[]) {
  this.outForDelivery = value;
}

public set _pastOrders(value: any[]) {
  this.pastOrders = value;
}

  public get _acceptanceWait(): any[] {
      return this.acceptanceWait;
  }

  public get _foodPreparation(): any[] {
      return this.foodPreparation;
  }

  public get _foodReady(): any[] {
      return this.foodReady;
  }

  public set _acceptanceWait(value: any[]) {
      this.acceptanceWait = value;
  }

  public set _foodPreparation(value: any[]) {
      this.foodPreparation = value;
  }

  public set _foodReady(value: any[]) {
      this.foodReady = value;
  }

}
