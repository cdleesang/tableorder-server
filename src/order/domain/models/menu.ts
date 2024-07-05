export class Menu {
  constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    public quantity: number,
    public readonly orderedAt: Date = new Date(),
  ) {}

  get totalPrice(): number {
    return this.quantity * this.price;
  }
}