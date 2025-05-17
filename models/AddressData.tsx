export default class Address {
  id: number;
  title: string;
  type: string;
  address: string;
  town: string;
  constructor(
    title: string = "",
    address: string = "",
    town: string = "",
    id: number = -1,
    type: string = "address"
  ) {
    this.id = id;
    this.title = title;
    this.address = address;
    this.town = town;
    this.type = type;
  }
  public async classToPlainObject() {
    const obj: Record<string, unknown> = await this.convert_to_object_answer();
    if (obj !== undefined) {
      return obj;
    }
    return this;
  }
  async convert_to_object_answer() {
    const obj: Record<string, unknown> = {};
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        obj[key] = this[key];
      }
    }
    return obj;
  }
}
