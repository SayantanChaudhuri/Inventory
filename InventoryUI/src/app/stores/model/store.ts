export class Store {
  id?: number;
  pname: string;
  model: string;
  description: string;
  partNumber: string;
  category: string;
  cost: string;
  instock: string;
  sold: string;
  notes: string;

  public constructor(init?: Partial<Store>) {
    Object.assign(this, init);
}
}
