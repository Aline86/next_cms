export default class OptionCss {
  position: string;
  width: number;
  height: number;
  cssParsed: this | undefined;
  constructor(
    cssParsed = undefined,
    position: string = "",
    width: number = 100,
    height: number = 100
  ) {
    if (cssParsed !== undefined) {
      this.position = cssParsed["position"];
      this.width = cssParsed["width"];
      this.height = cssParsed["height"];
    } else {
      this.position = position;
      this.width = width;
      this.height = height;
    }
  }
  public async classToPlainObject() {
    const obj: Record<string, unknown> = await this.convert_to_object_answer();
    if (obj !== undefined) {
      return obj;
    }
    return this;
  }
  public async convert_to_object_answer() {
    const obj: Record<string, unknown> = {};
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        obj[key] = this[key];
      }
    }
    return obj;
  }
}
