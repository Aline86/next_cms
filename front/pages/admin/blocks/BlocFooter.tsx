import CssFooterPosition from "./backend_components/footer/css_bloc_position/CssFooterPosition";
import Footer from "../../../models/FooterData";
import FooterInput from "./backend_components/footer/footer_template/footer";
import FooterVizualization from "./front_end_components/footer/footer";
import BlockContainer from "./wrapper/BlockContainer";
import InputTypes from "../../../lib/InputTypes";
import ComponentTypes from "../../../lib/types";

interface BlocData {
  bloc: Footer;
  updateComponent: (
    event: InputTypes,
    field: string | undefined,
    input: string | undefined,
    index?: string | number | undefined,
    bloc?: ComponentTypes
  ) => Promise<void>;

  saveBloc: (bloc: Footer) => Promise<void>;
}

function BlocFooter({
  bloc,

  updateComponent,
  saveBloc,
}: BlocData) {
  return bloc !== undefined ? (
    <BlockContainer
      bloc={bloc}
      index={-1}
      drag={false}
      isOpen={false}
      component_visualization={
        <FooterVizualization
          input_bloc={bloc}
          isResponsive={false}
          full={false}
        />
      }
      css_position={
        <CssFooterPosition
          props={
            <FooterInput
              updateComponent={async (
                event: InputTypes,
                field: string | undefined,
                input: string | undefined,
                index?: string | number | undefined,
                bloc?: ComponentTypes
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
  ) : (
    <></>
  );
}
export default BlocFooter;
