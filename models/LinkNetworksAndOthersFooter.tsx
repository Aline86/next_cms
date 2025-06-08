export default class LinkNetworksAndOthersFooter {
  id: number;
  title: string;
  type: string;
  background_url: string;
  name: string;
  image_url: string;
  bloc_number: number;
  constructor(
    title: string = "",
    background_url: string = "",
    name: string = "",
    image_url: string = "",
    id: number = -1,
    bloc_number = -1,
    type: string = "link_networks_an_others_footer"
  ) {
    this.id = id;
    this.bloc_number = bloc_number;
    this.title = title;
    this.type = type;
    this.background_url = background_url;
    this.name = name;
    this.image_url = image_url;
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
