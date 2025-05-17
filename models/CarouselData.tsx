export default class CarouselData {
  id: number;
  carousel_id: number;
  card_number: number;
  title: string;
  type: string;
  href_url: string;
  image_url: string;
  text: string;
  background_color: string;
  text_color: string;

  constructor(
    id: number = -1,

    card_number: number,
    carousel_id: number,
    href_url: string = "",
    image_url: string = "",
    text: string = "",
    title: string = "",
    type: string = "",
    background_color: string = "#ffffff",
    text_color: string = "#000000"
  ) {
    this.card_number = card_number;
    this.id = id;
    this.image_url = image_url;
    this.text = text;
    this.href_url = href_url;
    this.carousel_id = carousel_id;
    this.title = title;
    this.type = type;
    this.background_color = background_color;
    this.text_color = text_color;
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
