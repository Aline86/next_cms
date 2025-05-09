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
}
