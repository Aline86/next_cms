export default class LinkNetworksAndOthersHeader {
  id: number;
  title: string;
  type: string;
  bloc_number: number;
  background_url: string;
  name: string;
  image_url: string;

  constructor(
    bloc_number: number = -1,
    id: number = -1,
    title: string = "",
    background_url: string = "",
    name: string = "",
    image_url: string = "",
    type: string = "link_networks_an_others_header"
  ) {
    this.bloc_number = bloc_number;
    this.id = id;
    this.title = title;
    this.type = type;
    this.background_url = background_url;
    this.name = name;
    this.image_url = image_url;
  }
  async classToPlainObject() {
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
