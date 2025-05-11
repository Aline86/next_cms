import InputTypes from "./InputTypes";
import ComponentTypes from "./types";

export default interface ComponentBloc {
  update: (
    e: InputTypes,
    field: string | undefined,
    input?: string | undefined,
    index?: undefined | string | number
  ) => Promise<ComponentTypes>;
}
