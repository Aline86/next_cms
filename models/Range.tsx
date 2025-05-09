export default class RangeDataBloc {
  offset: number;
  length: number;
  key: string;

  constructor(offset: number, length: number, key: string) {
    this.offset = offset;
    this.length = length;
    this.key = key;
  }
}
