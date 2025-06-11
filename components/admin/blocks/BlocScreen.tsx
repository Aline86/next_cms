import ScreenHome from "../../../models/Screen";
import CssScreenPosition from "./backend_components/screen/css_bloc_position/CssScreenPosition";
import ScreenInput from "./backend_components/screen/screen_template/screen_input";
import ScreenVizualisation from "./front_end_components/screen/screen";
import BlockContainer from "./wrapper/BlockContainer";

interface BlocData {
  bloc: ScreenHome;
  setDragBegin: React.Dispatch<React.SetStateAction<number>>;
  updateDragBloc: (index: number) => Promise<void>;
  handleDragOver: React.Dispatch<React.DragEvent<HTMLDivElement>>;
  openModal: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
  drag: boolean;
  toggle: boolean;
  index: number;

  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function BlocScreen({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,

  drag,
  setRefresh,
  refresh,
  openModal,
  toggle,
  index,
}: BlocData) {
  return bloc !== undefined ? (
    <BlockContainer
      bloc={bloc}
      setDragBegin={() => setDragBegin(index)}
      updateDragBloc={updateDragBloc}
      handleDragOver={handleDragOver}
      index={index}
      drag={drag}
      component_visualization={
        <ScreenVizualisation
          bloc={bloc}
          isResponsive={false}
          toggle={toggle}
          full={false}
        />
      }
      css_position={
        <CssScreenPosition
          props={<ScreenInput toggle={toggle} input_bloc={bloc} />}
          bloc={bloc}
          draggable={drag}
        />
      }
      isOpen={openModal}
      setRefresh={setRefresh}
      refresh={refresh}
    />
  ) : (
    <></>
  );
}
export default BlocScreen;
