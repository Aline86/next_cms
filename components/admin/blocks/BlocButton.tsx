import BlockContainer from "./wrapper/BlockContainer";

import ButtonInput from "./backend_components/button/component";
import CssButtonPosition from "./backend_components/button/css_bloc_position/CssBlocPosition";
import Button from "../../../models/Button";
import ButtonVisualization from "./front_end_components/button/Button";

interface BlocData {
  bloc: Button;
  setDragBegin: React.Dispatch<React.SetStateAction<number>>;
  updateDragBloc: (index: number) => Promise<void>;
  handleDragOver: React.Dispatch<React.DragEvent<HTMLDivElement>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  drag: boolean;
  openModal: boolean;
  index: number;
  refresh: boolean;

  page_id: number;
  toggle: boolean;
}

function BlocButton({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  setRefresh,
  drag,
  openModal,
  page_id,
  index,
  refresh,
  toggle,
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
        <ButtonVisualization
          bloc={bloc}
          full={false}
          toggle={toggle}
          isResponsive={false}
        />
      }
      css_position={
        <CssButtonPosition
          props={<ButtonInput bloc={bloc} page_id={page_id} toggle={toggle} />}
          bloc={bloc}
          draggable={drag}
          setRefresh={setRefresh}
          refresh={refresh}
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
export default BlocButton;
