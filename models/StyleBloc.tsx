export default class StyleBLoc {
  offset: number;
  length: number;
  style: string;

  constructor(offset: number, length: number, style: string) {
    this.offset = offset;
    this.length = length;
    this.style = style;
  }
}
