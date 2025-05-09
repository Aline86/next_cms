import Header from "../../../models/Header";
import CssHeaderPosition from "./backend_components/header/css_bloc_position/CssHeaderPosition";
import HeaderInput from "./backend_components/header/header_template/header_input";
import HeaderVizualization from "./front_end_components/header/header";
import BlockContainer from "./wrapper/BlockContainer";
import InputTypes from "../../../lib/InputTypes";
import ComponentTypes from "../../../lib/types";

interface BlocData {
  bloc: Header;

  updateComponent: (
    event: InputTypes,
    field: string | undefined,
    input: string | undefined,
    index: string | number | undefined,
    bloc: ComponentTypes | undefined
  ) => Promise<void>;
  saveBloc: (bloc: Header) => Promise<void>;
  toggle: boolean;
}

function BlocHeader({ bloc, updateComponent, saveBloc, toggle }: BlocData) {
  return (
    <BlockContainer
      bloc={bloc}
      index={-1}
      drag={false}
      isOpen={false}
      component_visualization={
        <HeaderVizualization
          input_bloc={bloc}
          isResponsive={false}
          full={false}
          toggle={toggle}
        />
      }
      css_position={
        <CssHeaderPosition
          props={
            <HeaderInput
              updateComponent={async (
                event: InputTypes,
                field: string | undefined,
                input: string | undefined,
                index?: string | number | undefined,
                bloc?: ComponentTypes | undefined
              ): Promise<void> => {
                await updateComponent(event, field, input, index, bloc);
              }}
              input_bloc={bloc}
              saveBloc={saveBloc}
            />
          }
        />
      }
    />
  );
}
export default BlocHeader;
