import BlockContainer from "./wrapper/BlockContainer";
import GridVizualisation from "./front_end_components/grid/PictureGroup";
import PictureGroup from "../../../models/PictureGroup";
import CssPictureGroupPosition from "./backend_components/picture_group/css_bloc_position/CssBlocPosition";
import GridGroup from "./backend_components/picture_group/grid/component";
import { useEffect } from "react";

interface BlocData {
  bloc: PictureGroup;
  setDragBegin: React.Dispatch<number>;
  updateDragBloc: (index: number) => Promise<void>;
  handleDragOver: React.Dispatch<React.DragEvent<HTMLDivElement>>;
  openModal: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  drag: boolean;
  toggle: boolean;
  index: number;
  refresh: boolean;

  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function BlocGridGroup({
  bloc,
  setDragBegin,
  updateDragBloc,
  handleDragOver,
  openModal,
  setRefresh,
  drag,
  toggle,

  index,
  refresh,
  setToggle,
}: BlocData) {
  useEffect(() => {}, [bloc, toggle, refresh]);
  return bloc !== undefined ? (
    <BlockContainer
      bloc={bloc}
      setDragBegin={setDragBegin}
      updateDragBloc={async () => {
        if (updateDragBloc) {
          await updateDragBloc(index);
        }
      }}
      handleDragOver={handleDragOver}
      index={index}
      drag={drag}
      component_visualization={
        <GridVizualisation
          input_bloc={bloc}
          toggle={toggle}
          refresh={refresh}
          isResponsive={false}
        />
      }
      css_position={
        <CssPictureGroupPosition
          props={
            <GridGroup bloc={bloc} toggle={toggle} setToggle={setToggle} />
          }
          bloc={bloc}
          draggable={drag}
          toggle={toggle}
          refresh={refresh}
          setRefresh={setRefresh}
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
export default BlocGridGroup;
