import RangeDataBloc from "./Range";
import StyleBloc from "./StyleBloc";

export default class BlocTextParams {
  key: string;
  text: string;
  type: string;
  data: object;
  inlineStyleRanges: StyleBloc[];
  entityRanges: RangeDataBloc[];

  constructor(key: string, text: string, type: string, data: object) {
    this.key = key;
    this.text = text;
    this.type = type;
    this.data = data;
    this.inlineStyleRanges = [];
    this.entityRanges = [];
  }

  setStyleBlock(objectStyleBlock: StyleBloc) {
    if (objectStyleBlock !== undefined) {
      this.inlineStyleRanges.push(
        new StyleBloc(
          objectStyleBlock.offset,
          objectStyleBlock.length,
          objectStyleBlock.style
        )
      );
    }
  }

  setRange(range: RangeDataBloc) {
    if (range !== undefined) {
      this.entityRanges.push(
        new RangeDataBloc(range.offset, range.length, range.key)
      );
    }
  }
}
