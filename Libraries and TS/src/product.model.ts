export class Product {
  title: string;
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }

  getInformation() {
    return [this.title, `$${this.price}`];
  }
}
