import CssFooterPosition from "./backend_components/footer/css_bloc_position/CssFooterPosition";
import Footer from "../../../models/FooterData";
import FooterInput from "./backend_components/footer/footer_template/footer";
import FooterVizualization from "./front_end_components/footer/footer";
import BlockContainer from "./wrapper/BlockContainer";

interface BlocData {
  bloc: Footer;
  toggle: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
}

function BlocFooter({ bloc, toggle, setRefresh, refresh }: BlocData) {
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
          toggle={toggle}
        />
      }
      css_position={
        <CssFooterPosition
          props={
            <FooterInput
              input_bloc={bloc}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          }
        />
      }
      setRefresh={setRefresh}
      refresh={refresh}
    />
  ) : (
    <></>
  );
}
export default BlocFooter;
