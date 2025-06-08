import Header from "../../../models/Header";
import CssHeaderPosition from "./backend_components/header/css_bloc_position/CssHeaderPosition";
import HeaderInput from "./backend_components/header/header_template/header_input";
import HeaderVizualization from "./front_end_components/header/header";
import BlockContainer from "./wrapper/BlockContainer";

interface BlocData {
  bloc: Header;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function BlocHeader({ bloc, toggle, setToggle, setRefresh }: BlocData) {
  return (
    <BlockContainer
      bloc={bloc}
      index={-1}
      drag={false}
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
              input_bloc={bloc}
              setToggle={setToggle}
              toggle={toggle}
            />
          }
        />
      }
      setRefresh={setRefresh}
      refresh={false}
      isOpen={false}
    />
  );
}
export default BlocHeader;
